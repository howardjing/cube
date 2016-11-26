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
} from 'three';

/**
 * returns positions for each piece in a cube
 */
const buildCubePositions = (sides: number): Array<Vector3> => {
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

// standard cube, white up, green facing
const buildColors = () => {
  return [
    // right
    // red
    0xff0000,
    0xff0000,

    // left
    // orange
    0xff8000,
    0xff8000,

    // top
    // white
    0xffffff,
    0xffffff,

    // bottom
    // yellow
    0xffff00,
    0xffff00,

    // front
    // green
    0x00ff00,
    0x00ff00,

    // back
    // blue
    0x0000ff,
    0x0000ff,
  ];
}

const buildBox = (position: Vector3, colors: Array<number>): Mesh => {
  const geometry = new BoxGeometry(1,1,1);

  const n = Math.min(colors.length, geometry.faces.length);
  for (let i=0; i<n; i++) {
    const face = geometry.faces[i];
    const color = colors[i];

    face.color.setHex(color);
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

    buildCubePositions(sides).forEach((position) => {
      this.cube.add(buildBox(position, buildColors()))
    });

    this.scene = new Scene();
    this.scene.add(this.cube);
  }

  animate = () => {
    const {
      renderer,
      scene,
      camera,
      cube,
    } = this;

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  getDomElement = () => (
    this.renderer.domElement
  );
}

export default Cube;