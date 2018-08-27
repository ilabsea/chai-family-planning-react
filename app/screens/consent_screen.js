import React, { Component } from 'react';
import Video from 'react-native-video';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import styles from '../components/styles';

export default class ConsentScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={[styles.container]}>
        <Text style={styles.intro}>Display the consent text</Text>
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate("Survey")}>
            <Text style={styles.buttonText}> I agree </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.noButton]}
            onPress={() => navigate("Counseling")}>
            <Text style={[styles.buttonText, styles.noButtonText]}> No </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

}
