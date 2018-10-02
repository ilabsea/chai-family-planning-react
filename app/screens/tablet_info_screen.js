import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import styles from '../components/styles';

import SplashScreen from 'react-native-splash-screen'

export default class TabletInfoScreen extends Component {

  constructor(props) {
    super(props);
  }
  componentDidMount(){
    // SplashScreen.hide();
  }
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={styles.intro}>Please hand the tablet to provider</Text>
        <View style={[styles.container, {justifyContent: 'flex-end'}]}>
          <TouchableOpacity
            style={[ styles.button, { width: '100%', marginRight: 0 } ]}
            onPress={() => navigate("Consent")}>
            <Text style={styles.buttonText}> Next </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

}
