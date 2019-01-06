// @flow
import React, { Component } from 'react';
import type { Route } from '../../../domains/routes';
import Routes from '../../../domains/routes';

type Props = {
  to: Route,
  routes: Routes,
  target?: string,
  children: React.Element<*>,
};

function isModifiedEvent(event: MouseEvent) {
  return (
    !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
  );
}

class Link extends Component {
  props: Props;

  // https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/modules/Link.js
  handleClick = (event: MouseEvent) => {
    const {
      target,
      to,
      routes,
    } = this.props;

    if (
      !event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore right clicks
      !target && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
    ) {
      event.preventDefault();
      routes.changeRoute(to)
    }
  }

  render() {
    const {
      routes,
      to,
      children,
    } = this.props;

    return (
      <a
        onClick={this.handleClick}
        href={routes.getPath(to)}
      >
        {children}
      </a>
    )
  }
}

export default Link;
