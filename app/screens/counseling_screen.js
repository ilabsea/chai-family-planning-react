import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import styles from '../components/styles';

export default class CounselingScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.mainScreen}>
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center'}]}>
          <Text style={[styles.intro , { textAlign: 'center'} ]}>Please give her birth spacing counseling without using app</Text>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={[styles.button, {width: '100%', marginRight: 0}]}
            onPress={() => navigate("Video")}>
            <Text style={styles.buttonText}> Ok </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

}
