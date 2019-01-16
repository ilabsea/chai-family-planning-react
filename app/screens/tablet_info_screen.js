import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import styles from '../components/styles';

export default class TabletInfoScreen extends Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.mainScreen}>
        <View style={[styles.container, { justifyContent: 'center'}]}>
          <Text style={styles.intro}>Please hand the tablet to provider</Text>
        </View>
        <View style={styles.buttonView}>
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
