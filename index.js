/** @format */

import {AppRegistry, Dimensions} from 'react-native';
import {name as appName} from './app.json';

import React, { Component } from 'react';
import SideMenu from './app/components/side_menu'
import stackNav from './app/components/stacknav';

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

AppRegistry.registerComponent(appName, () => drawernav);
