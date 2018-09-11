import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Button,
  Alert,
  TouchableHighlight
} from 'react-native';

import Form from '../utils/form';
import { version } from '../../package.json';

export default class HomeScreen extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    AsyncStorage.getItem('VERSION', (err, value) => {
      if(value != version){
        Form.import();
        AsyncStorage.setItem('VERSION', version);
      }
    });
  }

  render() {
    return (
      <View>
        <Text>Home</Text>
        <Button onPress={() => this.props.navigation.navigate("Video")} title="Survey" />
      </View>
    )
  }

}
