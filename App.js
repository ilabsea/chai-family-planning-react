import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Home from './app/screens/home';
import Question from './app/questions/question';

export default class App extends Component<Props> {
  render() {
    return <Home />;
  }
}
