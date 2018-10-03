import React , { Component } from 'react';
import { View, TextInput, Alert } from 'react-native';

export default class CustomNumericInput extends Component {

  handleInputChange = (text) => {
    const { input: { value, onChange } } = this.props;
    if(this.props.type == 'integer' && this._validateInteger(text)){
      return onChange(text);
    }

    if(this.props.type == 'decimal' && this._validateDecimal(text)){
      return onChange(text);
    }
  }

  handleOnEndEditing = () => {
    const { input: { value, onChange } } = this.props;
    if(this.props.type == 'decimal'){
      return onChange(`${parseFloat(value)}`);
    }
  }

  render(){
    const { input, ...inputProps } = this.props;
    return (
      <View style={{paddingLeft: 10}}>
        <TextInput
          {...inputProps}
          onChangeText={this.handleInputChange}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          value={input.value}
          keyboardType='numeric'
          autoFocus={true}
          type={input.type}
          onEndEditing={this.handleOnEndEditing}
        />
      </View>
    );
  }

  _validateInteger(text){
    return (/^\d+$/.test(text));
  }

  _validateDecimal(text){
    return (/^[1-9]\d*(\.\d*)?$/.test(text));
  }
}

CustomNumericInput.defaultProps = {
  type: 'integer'
}
