import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Alert
} from 'react-native';

import QuestionForm from './question_form';
import { Provider } from 'react-redux';
import store from '../redux/store';
import styles from '../components/styles';
import MyPopupDialog from '../components/my_popup_dialog';

export default class SurveyScreen extends Component {

  constructor(props) {
    super(props);
  }

  showScaleAnimationDialog = () => {
    this.popup.showScaleAnimationDialog();
  }

  componentDidMount(){
     this.props.navigation.setParams({'showScaleAnimationDialog': this.showScaleAnimationDialog})
  }

  render() {
    return (
      <View style={styles.container}>
        <Provider store={store}>
          <QuestionForm ref='survey'
            onSubmit={(values) => Alert.alert('Submitted!', JSON.stringify(values))}
          />
        </Provider>
        <MyPopupDialog onRef={ref => (this.popup = ref)} onNavigation={this.props.navigation}/>
      </View>
    )
  }
}
