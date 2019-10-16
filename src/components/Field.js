import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import { addFiguteToField } from "../utils/utils";

class Field extends React.Component {

  render() {
    const { field, figure, animating, speed } = this.props;
    let handledField;

    if (figure) {
      handledField = addFiguteToField(figure, field);
    } else {
      handledField = field;
    }

    return (
      <div className="field">
        {
          handledField.map((row, i) => {
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
  figure: PropTypes.object,
  animating: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  speed: PropTypes.number,
};

export default Field;