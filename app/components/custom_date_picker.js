import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import { Button } from 'react-native-elements';

export default class CustomDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      value: ''
    };
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    const { input: { value, onChange } } = this.props
    this.setState({value: Moment(date).format("ll")});
    this._hideDateTimePicker();
    onChange(this.state.value);
  };

  render () {
    return (
      <View style={{ flex: 1}}>
        <Button title="Select Date" onPress={this._showDateTimePicker}></Button>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
        <View style={{height: 10}}/>
        <Text style={{fontSize: 18, paddingLeft: 15, color: 'black'}}>{`${this.state.value}`}</Text>
      </View>
    );
  }

}
