/** @format */

import {AppRegistry, Dimensions} from 'react-native';
import {name as appName} from './app.json';

import React, { Component } from 'react';
import BackgroundJob from 'react-native-background-job';

import SideMenu from './app/components/side_menu'
import stackNav from './app/components/stacknav';
import SurveyService from './app/services/survey_service';

import {
  createDrawerNavigator,
} from 'react-navigation';

const drawernav = createDrawerNavigator(
  {
    Item1: { screen: stackNav}
  },
  {
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get('window').width - 150,
  }
);

BackgroundJob.register({
  jobKey: 'PushData',
  job: () => SurveyService.synOfflineData()
});

AppRegistry.registerComponent(appName, () => drawernav);
