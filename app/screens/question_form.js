import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  NetInfo,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
  BackHandler
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { withNavigation } from 'react-navigation';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector, getFormValues } from 'redux-form';
import ImageScalable from 'react-native-scalable-image';
import HTML from 'react-native-render-html';
import { readFileAssets } from 'react-native-fs';

import styles from '../components/styles';
import classesStyles from '../components/html_styles';
import * as ListPrefixes from '../components/list_prefixes';
import ThankYou from '../components/thank_you';

import QuestionService from '../services/question_service';
import SurveyService from '../services/survey_service';
import CustomTextInput from '../components/custom_text_input';
import CustomRadioButtonGroup from '../components/custom_radio_button_group';
import CustomCheckboxGroup from '../components/custom_checkbox_group';
import CustomNumericInput from '../components/custom_numeric_input';
import CustomDatePicker from '../components/custom_date_picker';
import SkipLogic from '../utils/skip_logic';
import Expression from '../utils/expression';

import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

const IMAGES_MAX_WIDTH = Dimensions.get('window').width - 48;
const ListPrefixUl = ListPrefixes.UL;
const questions = QuestionService.get();

class QuestionForm extends Component {
  showingQuestions = [];
  handleQuestionViewRef = ref => this.questionView = ref;
  handleScrollViewRef = ref => this.scrollView = ref;

  constructor(props) {
    super(props);

    this.state = {
      questions: questions.filter((question) => { return !question.relevant }),
      fadeIn: new Animated.Value(0),
      fadeOut: new Animated.Value(1),
      zIndex: 0,
      startEntriedAt: new Date(),
      currentIndex: 0,
      isOnline: true,
    }
    this.showingQuestions = this.state.questions;
    this._updateToolbarTitle();
  }

  componentWillMount(){
    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({isOnline: isConnected});
    })
  }

  componentDidMount(){
    this.setState({startEntriedAt: new Date(), classesStyles: classesStyles});
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = isConnected => {
    this.setState({isOnline: isConnected});
  };

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
      <GestureRecognizer
        onSwipeRight={(state) => this._moveBackHandler(state)}
        config={config}
        style={{flex: 1}}
        >
        {this._renderQuestion()}
      </GestureRecognizer>
    );
  }

  restart = () => {
    this.props.navigation.navigate("Video")
  }

  _renderQuestion(){
    if(this.state.currentIndex == this.state.questions.length){
      return(
        <ThankYou
          onRestart={this.restart}
          navigation={this.props.navigation}
          onSave={() => { BackHandler.exitApp() }}
          dialogType='confirm-exit'
        />
      )
    }else{
      question = this.state.questions[this.state.currentIndex];
      let html = question.label.replace(/<title[^]*>[^]*<\/title>/ig, '');

      return(
        <Animatable.View style={{flex: 1, backgroundColor: 'transparent'}} ref={this.handleQuestionViewRef}>
          <ScrollView style={styles.form} keyboardShouldPersistTaps='always' ref={this.handleScrollViewRef}>
            <View>
              <HTML
                html={html}
                classesStyles={this.state.classesStyles}
                imagesMaxWidth= {IMAGES_MAX_WIDTH}
                listsPrefixesRenderers={ListPrefixUl}
              />
            </View>

            {this._renderQuestionField(question)}
          </ScrollView>

          { (question.type != 'select_one' || !question.required) &&
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity
                style={[styles.button, {flex: 1}]}
                onPress={() => this._moveNextHandler({})}>
                <Text style={[styles.buttonText]}> Next </Text>
              </TouchableOpacity>
            </View>
          }
        </Animatable.View>
      )
    }
  }

  _removeHtmlTag(html) {
    if (!html) { return ''; }

    return html.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, "").trim();
  }

  _updateToolbarTitle = () =>{
    let currentQuestion = this.state.questions[this.state.currentIndex];
    let title = !!currentQuestion && currentQuestion.label.match(/<title[^]*>[^]*<\/title>/ig);
    title = !!title ? this._removeHtmlTag(title[0]) : 'Survey';
    this.props.updateToolbarTitle(title);
  }

  _moveNextHandler(gestureState) {
    valid = this._validate(question);
    if(valid){
      if(question.order >= questions.length - 2 && !this.state.questions[this.state.currentIndex + 1] ) {
        this.props.notifyForm('confirm-end');
      } else if ((this.state.currentIndex + 1) == this.state.questions.length){
        this.props.notifyForm('warning');
      } else {
        this.scrollView.scrollTo({x: 0, y: 0, animated: false});
        this.questionView.slideInRight(150);
        this.setState({currentIndex: (this.state.currentIndex+1)}, this._updateToolbarTitle)
      }
    }else{
      ToastAndroid.showWithGravity('Sorry this response is required', ToastAndroid.SHORT, ToastAndroid.CENTER)
    }
  }

  _moveBackHandler(gestureState) {
    if(this.state.currentIndex == 0) return;
    this.scrollView.scrollTo({x: 0, y: 0, animated: false});
    this.questionView.slideInLeft(150);
    this.setState({currentIndex: this.state.currentIndex -1}, this._updateToolbarTitle);
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
                 onChange = {(value) => {this._handleOnChange(question, value)}}
          />
        );
      }
      case 'integer':{
        return(
          <Field name = { question.name }
                 component = { CustomNumericInput }
                 style = { styles.textInput }
                 onChange = {(value) => {this._handleOnChange(question, value)}}
          />
        );
      }
      case 'decimal':{
        return(
          <Field name = { question.name }
                 component = { CustomNumericInput }
                 style = { styles.textInput }
                 type={'decimal'}
                 onChange = {(value) => {this._handleOnChange(question, value)}}
          />
        );
      }
      case 'date':{
        return(
          <Field name = { question.name }
                 component = { CustomDatePicker }
                 onChange = {(value) => {this._handleOnChange(question, value)}}
          />
        );
      }
      case 'select_one':{
        return(
          <Field name = { question.name }
                 items={ question.options }
                 component={ CustomRadioButtonGroup }
                 onChange = {(value) => {
                   this._handleOnChange(question, value);
                   this._moveNextHandler({});
                 }}
          />
        );
      }
      case 'select_multiple':{
        return(
          <Field name = { question.name }
                 component = { CustomCheckboxGroup }
                 items = { question.options }
                 onChange = {(value) => {this._handleOnChange(question, value)}}
          />
        )
      }
      case 'note':{
        return(
          <View>
              <ImageScalable source={{ uri: 'asset:/images/'+question.media }} width={Dimensions.get('window').width-50} />
          </View>
        )
      }

    }

  }

  _handleOnChange(question, value){
    this.props.formValues[question.name] = value;
    this._processSkipLogic(question);

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
