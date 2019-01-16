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

  render() {
    return (
      <View key={'end'} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{flex:1 ,justifyContent: 'center'}}>
          <Text style={styles.thankMessage}>Thank you !</Text>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={[styles.button, {alignSelf: 'flex-start'}]}
            onPress={() => this.props.navigation.navigate("Video", {replay: true})}>
            <Text style={styles.buttonText}> Start New Session </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button,{alignSelf: 'flex-start'}]}
            onPress={() => { this.popup.showScaleAnimationDialog() }}>
            <Text style={[styles.buttonText, styles.noButtonText]}> Exit App </Text>
          </TouchableOpacity>
        </View>

        <CustomPopupDialog onRef={ref => (this.popup = ref)}
          onNavigation={this.props.navigation}
          onSave={() => { BackHandler.exitApp() }}
          dialogType = {this.state.dialogType}
        />
      </View>
    )
  }

}
