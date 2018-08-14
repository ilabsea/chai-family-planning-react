import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Alert,
  Button,
  ScrollView,
  Animated,
  Easing
} from 'react-native';

import Swiper from 'react-native-swiper';
import { FormLabel } from 'react-native-elements';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector, getFormValues } from 'redux-form';

import realm from '../data/schema';
import styles from '../components/styles';

import QuestionService from '../services/question_service';
import CustomTextInput from '../components/custom_text_input';
import CustomRadioButtonGroup from '../components/custom_radio_button_group';
import CustomCheckboxGroup from '../components/custom_checkbox_group';
import SkipLogic from '../utils/skip_logic';
import Expression from '../utils/expression';



import submit from './submit';

const questions = QuestionService.get();

class QuestionForm extends Component {
  showingQuestions = [];

  constructor(props) {
    super(props);
    this.state = {
      questions: questions.filter((question) => { return !question.relevant }),
      scrollable: true,
      currentIndex: 0,
      fadeIn: new Animated.Value(0),
      fadeOut: new Animated.Value(1),
    }
    this.showingQuestions = this.state.questions;
  }

  render() {
    return (
      <Swiper showsPagination={false}
              loop={false}
              index = {this.state.currentIndex}
              onIndexChanged={(index) => {this.handleIndexChange(index)}}
      >
        { this.state.questions.map((obj, index) => {
          return (
              <ScrollView key={index} style={styles.form}>
                <View style={styles.fieldWrapper}>
                  { obj.required && <Text style={styles.required}>*</Text> }
                  <Text style={styles.fieldName}>{obj.label}</Text>
                </View>
                {this._renderQuestionField(obj)}
                <Animated.View style={{backgroundColor: '#c9c5c5',
                  padding: 10, alignItems: 'center',
                  borderRadius: 10, opacity: this.state.fadeIn}}>
                  <Text>Sorry this response is required</Text>
                </Animated.View>
              </ScrollView>

          )

        })}

      </Swiper>
    );
  }

  handleOnChange(question, value){
    this.props.formValues[question.name] = value;
    this._processSkipLogic(question);
  }

  handleIndexChange(index){
    this.setState({currentIndex: index});
  }

  handleFieldError(){
    this.state.fadeIn.setValue(0)
    Animated.timing(
      this.state.fadeIn,
      {
        toValue: 1,
        duration: 100,
      }
    ).start(() =>
      {
        this.state.fadeIn.setValue(1)
        Animated.timing(
           this.state.fadeIn,
           {
             toValue: 0,
             duration: 3000,
           }
        ).start();
      }
    );
  }

  _processSkipLogic(currentQuestion){
    for(var i=0; i<questions.length; i++){
      question = questions[i];
      if(question.relevant){
        expressions = Expression.parse(question.relevant);
        logic = new SkipLogic(this.props.formValues, expressions);
        index = this._isQuestionExist(question.name);
        if(logic.validate()){
          if(index == null){
            this.showingQuestions = this._addQuestion(question);
          }
        }else{
          if(index) this.showingQuestions = this._removeQuestion(index);
        }
      }
    }

    this.setState({questions: this.showingQuestions});
  }

  _renderQuestionField(question){
    switch(question.type){
      case 'text':{
        return(
          <Field name = { question.name }
                 component = { CustomTextInput }
                 style = { styles.textInput }
                 onChange = {(value) => {this.handleOnChange(question, value)}}
          />
        );
      }
      case 'select_one':{
        return(
          <Field name = { question.name }
                 items={ question.options }
                 component={ CustomRadioButtonGroup }
                 onChange = {(value) => {this.handleOnChange(question, value)}}
          />
        );
      }
      case 'select_multiple':{
        return(
          <Field name = { question.name }
                 component = { CustomCheckboxGroup }
                 items = { question.options }
                 onChange = {(value) => {this.handleOnChange(question, value)}}
          />
        )
      }
    }

  }

  _addQuestion(question){
    this.showingQuestions.push(question);
    this.showingQuestions.sort((a,b) => {return a.order - b.order} );
    return this.showingQuestions;
  }

  _removeQuestion(index) {
    this._clearFormValue(index);
    this.showingQuestions = this.showingQuestions.filter((q, i) => {return (i != index)});
    return this.showingQuestions;
  }

  _clearFormValue(index){
    this.props.change(this.showingQuestions[index].name, '');
    if(this.showingQuestions[index].type == 'select_multiple'){
      this.props.formValues[this.showingQuestions[index].name] = [];
    }else{
      this.props.formValues[this.showingQuestions[index].name] = '';
    }
  }

  _isQuestionExist(name){
    for (var i = 0; i < this.showingQuestions.length; i++) {
      if(this.showingQuestions[i].name == name){
        return i;
      }
    }
    return null;
  }
}

QuestionForm = reduxForm({
  form: 'survey'
})(QuestionForm);

const selector = formValueSelector('survey');

QuestionForm = connect(
  state => {
    const formValues = getFormValues('survey')(state) || {};
    return {
      formValues,
    }
  }
)(QuestionForm);

export default QuestionForm;
