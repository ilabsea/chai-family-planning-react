import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Question from './app/questions/question';

export default class App extends Component<Props> {
  render() {
    return <Question />;
  }
}
