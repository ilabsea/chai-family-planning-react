import React, { Component } from 'react';
import Video from 'react-native-video';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  BackHandler
} from 'react-native';
import styles from '../components/styles';

export default class ConsentScreen extends Component {
  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);
    this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
  }

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  onBackButtonPressAndroid = () => {
    this.props.navigation.navigate('Video');
    return true;
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
