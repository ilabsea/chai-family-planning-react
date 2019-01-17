import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  BackHandler
} from 'react-native';

import styles from '../components/styles';
import CustomPopupDialog from '../components/custom_popup_dialog';
import ThankYou from '../components/thank_you';


export default class ThankScreen extends Component {
  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);
    this.state = {
      dialogType: 'confirm-exit',
    }
    this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  componentDidMount(){
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
  }

  onBackButtonPressAndroid = () => {
    this.props.navigation.navigate("Video")
    return true;
  }

  restart = () => {
    this.props.navigation.navigate("Video", {replay: true})
  }

  render() {
    return (
      <ThankYou
        onRestart={this.restart}
        navigation={this.props.navigation}
        onSave={() => { BackHandler.exitApp() }}
        dialogType='confirm-exit'
      />
    )
  }

}
