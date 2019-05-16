import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  NetInfo,
  BackHandler,
  Keyboard,
  Alert
} from 'react-native';

import QuestionForm from './question_form';
import { Provider } from 'react-redux';
import store from '../redux/store';
import styles from '../components/styles';
import CustomPopupDialog from '../components/custom_popup_dialog';
import SurveyService from '../services/survey_service';

export default class SurveyScreen extends Component {
  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);
    this.state = {
      isOnline: true,
      startEntriedAt: new Date(),
      editing: true,
      dialogType: 'confirm'
    }
    this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
  }

  showScaleAnimationDialog = () => {
    this._handleBack();
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  handleConnectivityChange = isConnected => {
    this.setState({isOnline: isConnected});
  }

  componentDidMount(){
    this.setState({startEntriedAt: new Date()});
    this.props.navigation.setParams({showScaleAnimationDialog: this.showScaleAnimationDialog});
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
  }

  updateToolbarTitle = (title) => {
    this.props.navigation.setParams({title: title});
  }

  onBackButtonPressAndroid = () => {
    this._handleBack();
    return true;
  }

  saveForm(){
    formValues = this.refs.survey.selector.props.formValues;
    survey = {value: JSON.stringify(formValues), start_entried_at: this.state.startEntriedAt}
    SurveyService.save(survey, this.state.isOnline);
    this.props.navigation.navigate("Video");
  }

  notifyForm(dialogType){
    Keyboard.dismiss();
    this.setState({dialogType: dialogType});
    this.popup.showScaleAnimationDialog();
  }

  render() {
    return (
      <View style={styles.container}>
        <Provider store={store}>
          <QuestionForm ref='survey'
            notifyForm={(dialogType) => {this.notifyForm(dialogType)}}
            notifyDuringForm={() => {this.notifyDuringForm()}}
            updateToolbarTitle={this.updateToolbarTitle}
          />
        </Provider>
        <CustomPopupDialog onRef={ref => (this.popup = ref)}
          onNavigation={this.props.navigation}
          onSave={() => {this.saveForm()}}
          dialogType = {this.state.dialogType}
        />
      </View>

    )
  }

  _handleBack(){
    Keyboard.dismiss();
    formValues = this.refs.survey.selector.props.formValues;
    this.setState({dialogType: 'confirm'});
    this.popup.showScaleAnimationDialog();
  }
}
