import React from 'react';

import components from '../components';
import DraggableToolbarIcon from './DraggableToolbarIcon';

export default class Toolbar extends React.Component {
  render() {
    const { dropToolbarIcon, height, width } = this.props;

    return (
      <div
        style={{
          display: 'flex',
          height: 50,
          width,
          justifyContent: 'center',
          marginTop: 10
        }}
      >
        <div style={{ display: 'flex' }}>
          {Object.keys(components).map(itemType => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <DraggableToolbarIcon
                key={itemType}
                dropToolbarIcon={dropToolbarIcon}
                height={height}
                Item={components[itemType]}
                width={1.618 * height}
              />
              <div>{itemType}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
