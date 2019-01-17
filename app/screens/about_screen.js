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
            Choice is a mobile application that allow counsellor to learn and understand about family planning.
          </Text>

          <Text style={styles.aboutText}>
            Choice mobile application is created by The The Clinton Health Access Initiative, Inc. (CHAI). It is technical supported by InSTEDD iLabSEA.
          </Text>

          <Text style={[styles.aboutText, {flex: 1}]}>
            The Clinton Health Access Initiative, Inc. (CHAI) was founded in 2002 with a transformational goal: help save the lives of millions of people living with HIV/AIDS in the developing world by dramatically scaling up antiretroviral treatment.
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
