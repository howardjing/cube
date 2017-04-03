// @flow
import React, { Component } from 'react';
import RenderedCube from './cube';

const Cube = class extends Component {
  cube: RenderedCube = new RenderedCube({
    width: 400,
    height: 400,
    sides: 3,
  });
  el: ?Node
  animationId: ?number

  cacheEl = (el: Node) => {
    this.el = el;
  }

  componentWillUnmount() {
    if (this.animationId) {
      window.cancelAnimationFrame(this.animationId);
    }
  }

  animate = (time: number) => {
    this.cube.animate(time);
    this.animationId = window.requestAnimationFrame(this.animate);
  }

  componentDidMount() {
    const {
      el,
      cube,
    } = this;
    if (!el) { return; }


    el.appendChild(cube.getDomElement());
    this.animate(performance.now());
  }

  render() {
    return (
      <div
        ref={this.cacheEl}
      />
    );
  }
};

export default Cube;