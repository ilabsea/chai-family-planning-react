import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Button
} from 'react-native';

import Form from '../utils/form';

export default class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstLaunch: true
		};
  }

  componentDidMount() {
    AsyncStorage.getItem('FIRST_LUNCH', (err, value) => {
      this.setState({firstLaunch: JSON.parse(value)});
      if(this.state.firstLaunch || this.state.firstLaunch == null){
        Form.import();
      }
    });
  }

  render() {
    return (
      <View>
        <Text>Home</Text>
        <Button onPress={() => this.props.navigation.navigate("Survey")} title="Survey" />
      </View>
    )
  }

}
