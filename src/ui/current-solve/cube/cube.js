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

class Cube {
  width: number;
  height: number;
  renderer: WebGLRenderer;
  scene: Scene;
  camera: PerspectiveCamera;
  cube: Object3D;
  isRotating: boolean;
  pivot: Object3D;
  activeGroup: Object3D[];

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

    this.cube = new Object3D();

    buildCubePositions(sides).forEach((position, i) => {
      this.cube.add(buildBox(position, cubeColorsAt(i, front(CUBE_COLORS))))
    });

    // rotate cube a little
    // this.cube.rotation.y = Math.PI / 4;

    this.scene = new Scene();
    this.scene.add(this.cube);

    // rotation stuff, see
    // https://github.com/jwhitfieldseed/rubik-js/blob/master/rubik.js#L261
    this.pivot = new Object3D();
    this.isRotating = false;
    this.activeGroup = [];

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

    // const LEFT_INDICES = range(0, 9);
    // LEFT_INDICES.forEach((i) => {
    //   this.activeGroup.push(this.cube.children[i]);
    // });

    // const RIGHT_INDICES = range(18,27);
    // RIGHT_INDICES.forEach((i) => {
    //   this.activeGroup.push(this.cube.children[i]);
    // });

    // const BACK_INDICES = range(0, 27, 3);
    // BACK_INDICES.forEach((i) => {
    //   this.activeGroup.push(this.cube.children[i]);
    // });

    // const FRONT_INDICES = range(2, 27, 3);
    // FRONT_INDICES.forEach((i) => {
    //   this.activeGroup.push(this.cube.children[i]);
    // });

    // const UP_INDICES = range(0, 3).concat(range(9, 12)).concat(range(18, 21));
    // UP_INDICES.forEach((i) => {
    //   this.activeGroup.push(this.cube.children[i]);
    // });

    const BACK_INDICES = range(6,9).concat(range(15, 18)).concat(range(24,27));
    BACK_INDICES.forEach((i) => {
      this.activeGroup.push(this.cube.children[i]);
    });

    setTimeout(() => {
      console.log("ROTATING")
      this.isRotating = true;

      this.pivot.rotation.set(0,0,0);
      this.pivot.updateMatrixWorld();

      this.activeGroup.forEach((active) => {
        SceneUtils.attach(active, this.scene, this.pivot);
      });

      this.scene.add(this.pivot);
    }, 1000)

    setTimeout(() => {
      // console.log("STOP ROTATING")
      // this.isRotating = false;

      // this.pivot.updateMatrixWorld();
      // this.activeGroup.forEach((active) => {
      //   SceneUtils.detach(active, this.pivot, this.scene);
      // });
      // this.scene.remove(this.pivot);
    }, 3000)
  }

  animate = () => {
    const {
      renderer,
      scene,
      camera,
      cube,
    } = this;

    // LEFT / RIGHT
    // this.pivot.rotation.x += 0.01;

    // FRONT / BACK
    // this.pivot.rotation.z += 0.01;

    // UP / DOWN
    this.pivot.rotation.y += 0.01;
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  getDomElement = () => (
    this.renderer.domElement
  );
}

export default Cube;