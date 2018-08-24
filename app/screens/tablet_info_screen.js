import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import styles from '../components/styles';

export default class TabletInfoScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={[styles.container, styles.centerItems]}>
        <Text style={styles.intro}>Please hand the tablet to provider</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate("Consent")}>
          <Text style={styles.buttonText}> Next </Text>
        </TouchableOpacity>
      </View>
    )
  }

}
