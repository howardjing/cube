// @flow
import React, { Component } from 'react';
import React3 from 'react-three-renderer';
import {
  Color,
  Euler,
  Vector3,
} from 'three';

type Piece = {
  position: Vector3,
  colors: Color[],
};

const buildPieces = (sides: number = 3): Piece[] => {
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
        pieces.push({
          position: new Vector3(
            i - offset,
            j - offset,
            k - offset
          ),
          colors: []
        });
      }
    }
  }
  return pieces;
}

const base = [];
const NUM_SIDES = 3;
for (let i=0; i<NUM_SIDES; i++) {
  base.push([]);
  for (let j=0; j<NUM_SIDES; j++) {
    base[i].push([]);
    for (let k=0; k<NUM_SIDES; k++) {
      base[i][j].push(0);
    }
  }
}
const cameraPosition = new Vector3(0, 0, 10);
const Cube = class extends Component {
  state = {
    cubeRotation: new Euler(),
    pieces: buildPieces(),
  };

  handleAnimate = () => {
    const { x, y } = this.state.cubeRotation;
    this.setState({
      cubeRotation: new Euler(
        x + 0.01,
        y + 0.01,
        0
      )
    });
  }

  render() {
    const width = 300;
    const height = 300;
    const {
      cubeRotation,
      pieces,
    } = this.state;
    return (
      <React3
        mainCamera="camera"
        width={width}
        height={height}
        onAnimate={this.handleAnimate}
      >
        <scene>
          <perspectiveCamera
            name="camera"
            fov={75}
            aspect={width / height}
            near={0.1}
            far={10000}
            position={cameraPosition}
          />
          <object3D rotation={cubeRotation}>
            {pieces.map((piece, i) => (
              <mesh
                key={i}
                position={piece.position}
              >
                <boxGeometry
                  width={1}
                  height={1}
                  depth={1}
                />
                <meshBasicMaterial />
              </mesh>
            ))}
          </object3D>
        </scene>
      </React3>
    );
  }
};

export default Cube;