import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Colors
} from 'react-native';

import { createStackNavigator } from  'react-navigation';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from "../screens/home_screen";
import AboutScreen from "../screens/about_screen";
import SurveyScreen from "../screens/survey_screen";
import VideoScreen from "../screens/video_screen";
import TabletInfoScreen from "../screens/tablet_info_screen";
import ConsentScreen from "../screens/consent_screen";
import CounselingScreen from "../screens/counseling_screen";

const stackNav = createStackNavigator({
  Home : {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({
      title: "Home",
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#1976d2',
      },
      headerLeft:(<TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <AwesomeIcon name='bars' size={28} style={{color: 'white', paddingLeft: 10}} />
                  </TouchableOpacity>
      ),
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
      title: "Survey",
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#1976d2',
      },
      headerLeft: (<TouchableOpacity onPress={ navigation.getParam('showScaleAnimationDialog') } style={{paddingLeft: 20}}>
                    <Image source={require('../assets/images/arrow-left.png')} style={{ width: 20}} />
                  </TouchableOpacity>)
    })
  },
  Video: {
    screen: VideoScreen,
    navigationOptions: ({navigation}) => ({
      title: "Video",
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#1976d2',
      },
    })
  },
  Counseling: {
    screen: CounselingScreen,
    navigationOptions: ({navigation}) => ({
      title: "Counseling",
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#1976d2',
      },
    })
  },
  TabletInfo: {
    screen: TabletInfoScreen,
    navigationOptions: ({navigation}) => ({
      title: "Tablet Info",
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#1976d2',
      },
    })
  },
  Consent: {
    screen: ConsentScreen,
    navigationOptions: ({navigation}) => ({
      title: "Consent",
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#1976d2',
      },
    })
  },
    })
  }
});

export default stackNav;
