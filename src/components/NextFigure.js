import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Square from './Square';
import {addFiguteToField, createEmptyField} from "../utils/utils";

class NextFigure extends React.Component {

  render() {
    const { nextFigure } = this.props;
    const next = JSON.parse(JSON.stringify(nextFigure));
    if (next && next.matrix) {
      next.coordinates.x = 3 - next.matrix[0].length === 0 ? 0 : 1;
      next.coordinates.y = next.matrix.length === 2 ? 1 : 0;
    }
    const field = createEmptyField(3, 4);
    let handledField;

    if (next) {
      handledField = addFiguteToField(next, field);
    } else {
      handledField = field;
    }

    return (
      <div className="next-figure">
        {
          handledField.map((row, i) => {
            return (
              <div className="row" key={ 'row' + i }>
                { row.map((el, j) => (
                  <Square
                    filled={ !!el }
                    key={ 'cell' + j }
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

NextFigure.propTypes = {
  nextFigure: PropTypes.object,
};

const mapStateToProps = (state) => ({
  nextFigure: state.nextFigure,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NextFigure);