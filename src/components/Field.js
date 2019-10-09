import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Square from './Square';
import {addFiguteToField} from "../utils/utils";

class Field extends React.Component {

  render() {
    const { field, figure } = this.props;
    let handledField;

    if (figure) {
      handledField = addFiguteToField(figure, field);
    } else {
      handledField = field;
    }

    return (
      <div className="field">
        {
          handledField.map((row) => {
            return (
              <div className="row">
                { row.map((el) => <Square filled={ !!el }/>) }
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
};

const mapStateToProps = (state) => ({
  field: state.field,
  figure: state.figure,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Field);