import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  Animated,
  NetInfo,
} from 'react-native';
import { withNavigation } from 'react-navigation';

import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector, getFormValues } from 'redux-form';
import Swiper from '../node_modules/react-native-swiper';
import ImageScalable from 'react-native-scalable-image';

import styles from '../components/styles';

import QuestionService from '../services/question_service';
import SurveyService from '../services/survey_service';

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
      fadeIn: new Animated.Value(0),
      fadeOut: new Animated.Value(1),
      startEntriedAt: new Date(),
      currentIndex: 0,
      isOnline: true,
      scrollEnabled: true,
    }
    this.showingQuestions = this.state.questions;
  }

  componentWillMount(){
    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({isOnline: isConnected});
    })
  }

  componentDidMount(){
    this.setState({startEntriedAt: new Date()});
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = isConnected => {
    this.setState({isOnline: isConnected});
  };

  handleIndexChange(newIndex, oldIndex){
    if(newIndex == this.state.questions.length){
      survey = {value: JSON.stringify(this.props.formValues), start_entried_at: this.state.startEntriedAt}
      SurveyService.save(survey, this.state.isOnline);
      this.setState({scrollEnabled: false});
      this.props.notifyEndForm();
    }else if(newIndex < oldIndex){
      this.setState({currentIndex: newIndex});
    }else{
      let question = this.state.questions[newIndex-1];
      valid = this._validate(question);
      if(valid){
        this.setState({currentIndex: newIndex});
      }else{
        this.setState({currentIndex: newIndex-1});
        this.handleFieldError();
        this.refs.scrollView.scrollBy(0);
      }
    }

  }


  render() {
    let swiperItems = this.state.questions.map((obj, index) => {
      return (
        <View key={index} style={{flex: 1, backgroundColor: 'transparent'}}>
          <View style={{alignItems: 'center'}}>
              <ImageScalable style={{position: 'absolute'}} source={{ uri: 'asset:/images/'+obj.media }} />
          </View>
          <ScrollView style={styles.form}>
            <View style={styles.fieldWrapper}>
              { obj.required && <Text style={styles.required}>*</Text> }
              <Text style={styles.fieldName}>{obj.label}</Text>
            </View>
            {this._renderQuestionField(obj)}
          </ScrollView>
          <Animated.View style={[styles.errorMessageContainer, {opacity: this.state.fadeIn}]}>
            <Text style={styles.errorMessage}>Sorry this response is required</Text>
          </Animated.View>
        </View>
      )
    });

    swiperItems.push(
      <View key={'end'} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.thankMessage}>Thank you !</Text>
        <Button title="Watch Video Again" onPress={() => this.props.navigation.navigate("Video")}></Button>
      </View>
    );

    return (
      <Swiper showsPagination={false}
              loop={false}
              scrollEnabled={this.state.scrollEnabled}
              ref="scrollView"
              keyboardDismissMode='on-drag'
              index={this.state.currentIndex}
              onIndexChanged={(newIndex, oldIndex) => {this.handleIndexChange(newIndex, oldIndex)}}>
        {swiperItems}
      </Swiper>
    );
  }

  handleOnChange(question, value){
    this.props.formValues[question.name] = value;
    this._processSkipLogic(question);
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

  _validate(question){
    if(question.required){
      if(question.type == 'select_multiple'){
        return (this.props.formValues[question.name] && this.props.formValues[question.name].length > 0);
      }else{
        return this.props.formValues[question.name] ? true : false;
      }
    }
    return true;
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
})(withNavigation(QuestionForm));

QuestionForm = connect(
  state => {
    const formValues = getFormValues('survey')(state) || {};
    return {
      formValues,
    }
  }
)(QuestionForm);

export default QuestionForm;
