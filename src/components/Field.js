import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square';

class Field extends React.Component {

  render() {
    const { field, animating, speed } = this.props;

    return (
      <div className="field">
        {
          field.map((row, i) => {
            return (
              <div className="row" key={ 'row' + i }>
                { row.map((el, j) => (
                  <Square
                    filled={ !!el }
                    animating={ animating && animating[i] }
                    key={ 'cell' + j }
                    speed={ speed }
                  />
                )) }
              </div>
            )
          })
        }
      </div>
    );
  }
}

Field.propTypes = {
  field: PropTypes.array.isRequired,
  animating: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  speed: PropTypes.number,
};

export default Field;