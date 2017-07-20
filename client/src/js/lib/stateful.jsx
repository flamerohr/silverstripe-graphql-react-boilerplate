import React, { Component } from 'react';

const stateful = mapInitialState => (StatelessComponent) => {
  class statefulWrapper extends Component {
    constructor(props) {
      super(props);
      this.state = (typeof mapInitialState === 'function')
        ? mapInitialState(props)
        : {};

      this.setState = this.setState.bind(this);
    }

    render() {
      const { state, props, setState } = this;

      return (
        <StatelessComponent
          {...props}
          {...state}
          setState={setState}
        />
      );
    }
  }

  const componentName = StatelessComponent.displayName || StatelessComponent.name || 'Component';
  statefulWrapper.displayName = `Stateful[${componentName}]`;

  return statefulWrapper;
};

export default stateful;
