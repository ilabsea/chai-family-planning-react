import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { createStackNavigator } from  'react-navigation';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Icon} from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AboutScreen from "../screens/about_screen";
import SurveyScreen from "../screens/survey_screen";
import VideoScreen from "../screens/video_screen";
import TabletInfoScreen from "../screens/tablet_info_screen";
import ConsentScreen from "../screens/consent_screen";
import CounselingScreen from "../screens/counseling_screen";
import ReportScreen from "../screens/report_screen";
import ThankScreen from "../screens/thank_screen";

const stackNav = createStackNavigator(
  {
    Video: {
      screen: VideoScreen,
      navigationOptions: ({navigation}) => ({
        title: "Family Planning"
      })
    },
    About : {
      screen: AboutScreen,
      navigationOptions: ({navigation}) => ({
        title: "About",
      })
    },
    Survey: {
      screen: SurveyScreen,
      navigationOptions: ({navigation}) => ({
        title: navigation.getParam('title'),
        headerLeft: (<TouchableOpacity onPress={navigation.getParam('showScaleAnimationDialog') } style={{paddingLeft: 20}}>
              <Icon name="arrow-back" color='white'/>
            </TouchableOpacity>)
      })
    },
    Counseling: {
      screen: CounselingScreen,
      navigationOptions: ({navigation}) => ({
        title: "Counseling"
      })
    },
    TabletInfo: {
      screen: TabletInfoScreen,
      navigationOptions: ({navigation}) => ({
        title: "Tablet Info",
      })
    },
    Consent: {
      screen: ConsentScreen,
      navigationOptions: ({navigation}) => ({
        title: "Consent"
      })
    },
    Report: {
      screen: ReportScreen,
      navigationOptions: ({navigation}) => ({
        title: "Data"
      })
    },
    Thank: {
      screen: ThankScreen,
      navigationOptions: ({navigation}) => ({
        title: "Survey",
        headerLeft: (<TouchableOpacity onPress={() => navigation.navigate("Video") } style={{paddingLeft: 20}}>
              <Icon name="arrow-back" color='white'/>
            </TouchableOpacity>)
      })
    },
  },
  {
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#1976d2',
      },
    }
  });

export default stackNav;
