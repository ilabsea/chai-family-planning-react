import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

export default class AboutScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>About</Text>

        <Button onPress={() => this.props.navigation.navigate("Home")} title="Home" />
      </View>
    )
  }

}
