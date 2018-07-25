import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import questionService from '../services/question.service';

class Question extends Component<Props>{
  constructor(props) {
    super(props);
  }

  _getQuestions() {
    questionService.getAll()
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('responseJson : ', responseJson)
      })
  }

  render() {
    return (
      <TouchableOpacity onPress={()=> this._getQuestions()}>
        <Text>Download</Text>
      </TouchableOpacity>
    )
  }
}

export default Question
