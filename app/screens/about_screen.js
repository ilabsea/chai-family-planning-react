import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView
} from 'react-native';

import DeviceInfo from 'react-native-device-info';
import styles from '../components/styles';

export default class AboutScreen extends Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <Text style={styles.aboutText}>
            Choices is a mobile application which supports individual family planning, and it provides educational and clinical services to help individuals maintain their reproductive health, and to prevent unintended pregnancy. The application has a special emphasis on serving low-income women, men, and teens.
          </Text>

          <Text style={styles.aboutText}>
            Choices mobile application is initiated and funded by The The Clinton Health Access Initiative, Inc. (CHAI).
          </Text>

          <Text style={styles.aboutText}>
            The Clinton Health Access Initiative, Inc. (CHAI) was founded in 2002 with a transformational goal: help save the lives of millions of people living with HIV/AIDS in the developing world by dramatically scaling up antiretroviral treatment.
          </Text>

          <Text style={styles.aboutText}>
            Choices is developed by InSTEDD Innovation Lab Southeast Asia.
          </Text>

          <View style={{flexDirection: 'row', justifyContent: 'flex-end', padding: 24}}>
            <Text style={[styles.aboutText, {paddingHorizontal: 0}]}>Version: </Text>
            <Text style={[styles.aboutText, {paddingHorizontal: 0}]}>{DeviceInfo.getVersion()}</Text>
          </View>

        </ScrollView>
      </View>
    )
  }

}
