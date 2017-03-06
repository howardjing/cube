// @flow
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Mesh,
  BoxGeometry,
  MeshBasicMaterial,
  FaceColors,
  Object3D,
  Vector3,
  SceneUtils,
} from 'three';

import BezierEasing from 'bezier-easing';

import type { Move } from '../../../store/scramble';

const ease = BezierEasing(0.25, 0.1, 0.25, 1) // ease function

const delay = (millis: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), millis);
  });
};

/**
 * returns positions for each piece in a cube
 */
const buildCubePositions = (sides: number): Vector3[] => {
  const pieces = [];

  /**
   * with even number of pieces, the middle piece
   * should start at -0.5.
   *
   * with odd numbe rof pieces, the middle piece
   * should start at 0.
   */
  const offset = sides % 2 === 0 ?
    (sides / 2) - 0.5 :
    Math.floor(sides / 2);

  for (let i=0; i<sides; i++) {
    for (let j=0; j<sides; j++) {
      for (let k=0; k<sides; k++) {
        pieces.push(
          new Vector3(
            i - offset,
            j - offset,
            k - offset
          )
        );
      }
    }
  }

  return pieces;
}

const gray = 0x999999;
const red = 0xff0000;
const orange = 0xff8000;
const white = 0xffffff;
const yellow = 0xffff00;
const green = 0x00ff00;
const blue = 0x0000ff;

const TURN_DURATION = 500;
const NINETY_DEGREES = Math.PI / 2;
const INCREMENT = 1 / (30 * Math.PI);

type CubeColor = number[];

const buildCubeColor = ({
  right = gray,
  left = gray,
  up = gray,
  down = gray,
  front = gray,
  back = gray,
}: {
  right?: number,
  left?: number,
  up?: number,
  down?: number,
  front?: number,
  back?: number,
} = {}): CubeColor => {
  return [
    right,
    right,

    left,
    left,

    up,
    up,

    down,
    down,

    front,
    front,

    back,
    back,
  ]
};

const filler = buildCubeColor();

// standard cube, white up, green facing
const CUBE_COLORS = [
  // far bottom left corner
  buildCubeColor({
    down: yellow,
    left: orange,
    back: blue,
  }),

  // middle bottom left edge
  buildCubeColor({
    down: yellow,
    left: orange,
  }),

  // near bottom left corner
  buildCubeColor({
    down: yellow,
    left: orange,
    front: green,
  }),

  // far middle left edge
  buildCubeColor({
    left: orange,
    back: blue,
  }),

  // left center
  buildCubeColor({
    left: orange,
  }),

  // near middle left edge
  buildCubeColor({
    left: orange,
    front: green,
  }),

  // far top left corner
  buildCubeColor({
    up: white,
    left: orange,
    back: blue,
  }),

  // middle top left edge
  buildCubeColor({
    up: white,
    left: orange,
  }),

  // near top left corner
  buildCubeColor({
    up: white,
    left: orange,
    front: green,
  }),

  // far bottom edge
  buildCubeColor({
    down: yellow,
    back: blue,
  }),

  // bottom middle center
  buildCubeColor({
    down: yellow,
  }),

  // near bottom edge
  buildCubeColor({
    down: yellow,
    front: green,
  }),

  // far center
  buildCubeColor({
    back: blue,
  }),

  // core
  filler,

  // near center
  buildCubeColor({
    front: green
  }),

  // far top edge
  buildCubeColor({
    up: white,
    back: blue,
  }),

  // top center
  buildCubeColor({
    up: white,
  }),

  // near top edge
  buildCubeColor({
    up: white,
    front: green,
  }),

  // far bottom right corner
  buildCubeColor({
    down: yellow,
    right: red,
    back: blue,
  }),

  // bottom right edge
  buildCubeColor({
    down: yellow,
    right: red,
  }),

  // near bottom right corner
  buildCubeColor({
    down: yellow,
    right: red,
    front: green,
  }),

  // far right edge
  buildCubeColor({
    right: red,
    back: blue,
  }),

  // right center
  buildCubeColor({
    right: red,
  }),

  // near right edge
  buildCubeColor({
    right: red,
    front: green,
  }),

  // far top right corner
  buildCubeColor({
    up: white,
    right: red,
    back: blue,
  }),

  // top right edge
  buildCubeColor({
    up: white,
    right: red,
  }),

  // near top right corner
  buildCubeColor({
    up: white,
    right: red,
    front: green,
  }),
];

const duplicateColors = (colors: CubeColor[]): CubeColor[] => {
  return colors.map(color => color.slice(0));
};

const front = (colors: CubeColor[]): CubeColor[] => {
  return duplicateColors(colors);
}

const cubeColorsAt = (index: number, colors: CubeColor[] = CUBE_COLORS): CubeColor => {
  return colors[index] || filler;
}

const buildColors = () => buildCubeColor({
  up: white,
  down: yellow,
  left: orange,
  right: red,
  front: green,
  back: blue,
});

const buildBox = (position: Vector3, color: CubeColor): Mesh => {
  const geometry = new BoxGeometry(1,1,1);

  const n = Math.min(color.length, geometry.faces.length);
  for (let i=0; i<n; i++) {
    const face = geometry.faces[i];
    const faceColor = color[i];

    face.color.setHex(faceColor);
  }

  const material = new MeshBasicMaterial({
    color: 0xffffff,
    vertexColors: FaceColors,
  });

  const mesh = new Mesh(geometry, material);
  mesh.position.x = position.x;
  mesh.position.y = position.y;
  mesh.position.z = position.z;
  return mesh;
}

/**
 * returns [start, end) in increments of increment
 *
 * start must be less than end; increment must be greater than 0
 */
const range = (start: number, limit: number, increment: number = 1): number[] => {
  const xs = [];
  for (let i=start; i < limit; i += increment) {
    xs.push(i);
  }

  return xs;
}

const LEFT_INDICES = range(0, 9);
const RIGHT_INDICES = range(18,27);
const BACK_INDICES = range(0, 27, 3);
const FRONT_INDICES = range(2, 27, 3);
const UP_INDICES = range(6,9).concat(range(15, 18)).concat(range(24,27));
const DOWN_INDICES = range(0, 3).concat(range(9, 12)).concat(range(18, 21));

class Cube {
  width: number;
  height: number;
  renderer: WebGLRenderer;
  scene: Scene;
  camera: PerspectiveCamera;
  // parent cube that holds children cubes
  cubeContainer: Object3D;
  cubes: Object3D[];
  turnStart: ?number;
  pivot: Object3D;
  animateTurn: (percent: number) => void;
  finishAnimatingTurn: () => void;

  /**
   * width in pixels
   * height in pixels
   */
  constructor({
    width,
    height,
    sides = 3,
  }: {
    width: number,
    height: number,
    sides: number,
  }) {
    this.width = width;
    this.height = height;
    this.renderer = new WebGLRenderer();
    this.renderer.setSize(width, height);

    this.camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 10;

    this.cubeContainer = new Object3D();
    this.cubes = buildCubePositions(sides).map((position, i) =>
      // TODO: don't remember the meaning behind name `front`...
      // why not just do `cubeColorsAt(i)`?
      buildBox(position, cubeColorsAt(i, front(CUBE_COLORS)))
    );

    this.cubes.forEach((cube) => {
      this.cubeContainer.add(cube)
    });

    this.scene = new Scene();
    this.scene.add(this.cubeContainer);

    // rotation stuff, see
    // https://github.com/jwhitfieldseed/rubik-js/blob/master/rubik.js#L261
    this.pivot = new Object3D();
    this.animateTurn = () => {};
    this.finishAnimatingTurn = () => {};

    setTimeout(() => {
      this
        .turn('R')
        .then(() => delay(250))
        .then(() => this.turn('U'))
        .then(() => delay(250))
        .then(() => this.turn('L'))
        .then(() => delay(250))
        .then(() => this.turn('B'))
        .then(() => delay(250))
        .then(() => this.turn('D'))
        .then(() => delay(250))
        .then(() => this.turn('F'))
    }, 1000);
  }

  turn = (move: Move): Promise<void> => {
    this.pivot = new Object3D();
    let activeCubes = [];
    let animateTurn = () => {};
    if (move.startsWith('F')) {
      activeCubes = FRONT_INDICES;
      animateTurn = (percent: number): void => {
        this.pivot.rotation.z = -NINETY_DEGREES * percent;
      }
    } else if (move.startsWith('B')) {
      activeCubes = BACK_INDICES;
      animateTurn = (percent: number): void => {
        this.pivot.rotation.z = NINETY_DEGREES * percent;
      }
    } else if (move.startsWith('U')) {
      activeCubes = UP_INDICES;
      animateTurn = (percent: number): void => {
        this.pivot.rotation.y = -NINETY_DEGREES * percent;
      }
    } else if (move.startsWith('D')) {
      activeCubes = DOWN_INDICES;
      animateTurn = (percent: number): void => {
        this.pivot.rotation.y = NINETY_DEGREES * percent;
      }
    } else if (move.startsWith('L')) {
      activeCubes = LEFT_INDICES;
      animateTurn = (percent: number): void => {
        this.pivot.rotation.x = NINETY_DEGREES * percent;
      }
    } else if (move.startsWith('R')) {
      activeCubes = RIGHT_INDICES;
      animateTurn = (percent: number): void => {
        this.pivot.rotation.x = -NINETY_DEGREES * percent;
      }
    } else {
      throw new Error(`Unsupported move: ${move}`);
    }

    const activeGroup = activeCubes.map((i) =>
      this.cubes[i]
    );

    this.animateTurn = animateTurn;
    this.turnStart = performance.now();

    activeGroup.forEach((active) => {
      SceneUtils.attach(active, this.scene, this.pivot);
    });

    this.pivot.rotation.set(0,0,0);
    this.pivot.updateMatrixWorld();
    this.scene.add(this.pivot);

    return new Promise((resolve) => {
      this.finishAnimatingTurn = resolve;
    }).then(() => {
      this.pivot.updateMatrixWorld();
      this.scene.remove(this.pivot);
      this.turnStart = null;
      activeGroup.forEach((active) => {
        active.updateMatrixWorld();
        SceneUtils.detach(active, this.pivot, this.scene);
        this.cubeContainer.add(active);

        // reorder cube with the updated position
      if (move.startsWith('F')) {
        this.cycle(2,8,26,20);
        this.cycle(5,16,23,11);
      } else if (move.startsWith('B')) {
        this.cycle(0,18,24,6)
        this.cycle(3,9,21,15)
      } else if (move.startsWith('U')) {
        this.cycle(6,24,26,8);
        this.cycle(7,15,25,17);
      } else if (move.startsWith('D')) {
        this.cycle(0,2,20,18);
        this.cycle(1,11,19,9);
      } else if (move.startsWith('L')) {
        this.cycle(0,6,8,2);
        this.cycle(1,3,7,5)
      } else if (move.startsWith('R')) {
        this.cycle(18,20,26,24);
        this.cycle(19,23,25,21);
      } else {
        throw new Error(`Unsupported move: ${move}`);
      }
      });
    })
  }

  /**
   * cycle cubes after a turn.
   *
   * a -> b
   * b -> c
   * c -> d
   * d -> a
   */
  cycle = (i: number, j: number, k: number, l: number): void => {
    const cubes = this.cubes;
    const a = cubes[i];
    const b = cubes[j];
    const c = cubes[k];
    const d = cubes[l];

    cubes[j] = a;
    cubes[k] = b;
    cubes[l] = c;
    cubes[i] = d;
  }


  animate = (time: number) => {
    const {
      renderer,
      scene,
      camera,
      // cube,
    } = this;


    if (this.turnStart) {
      const elapsedTime = time - this.turnStart;
      const percentComplete = ease(elapsedTime / TURN_DURATION);
      this.animateTurn(percentComplete);

      if (elapsedTime >= TURN_DURATION) {
        this.finishAnimatingTurn();
      }
    }

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  getDomElement = () => (
    this.renderer.domElement
  );
}

export default Cube;