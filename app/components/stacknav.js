
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, TouchableOpacity,
  Colors
} from 'react-native';

import { createStackNavigator } from  'react-navigation';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from "../screens/home_screen";
import AboutScreen from "../screens/about_screen";
import SurveyScreen from "../screens/survey_screen";

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
    })
  }
});

export default stackNav;
