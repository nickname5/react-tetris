import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Square from './Square';
import {addFiguteToField} from "../utils/utils";

class Field extends React.Component {

  render() {
    const { field, figure, animating } = this.props;
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
                { row.map((el, j) => <Square filled={ !!el } animating={ animating && animating[i] } key={ 'cell' + j }/>) }
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
};

const mapStateToProps = (state) => ({
  field: state.field,
  figure: state.figure,
  animating: state.animating
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Field);