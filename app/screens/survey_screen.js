import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Button,
  Alert
} from 'react-native';

import QuestionForm from './question_form';
import { Provider } from 'react-redux';
import store from '../redux/store';

export default class SurveyScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <QuestionForm ref='survey'
          onSubmit={(values) => Alert.alert('Submitted!', JSON.stringify(values))}
        />

      </Provider>
    )
  }

}
