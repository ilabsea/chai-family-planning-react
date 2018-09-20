import React, { Component } from 'react';
import Video from 'react-native-video';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';

import Form from '../utils/form';
import { version } from '../../package.json';
import styles from '../components/styles';

import SplashScreen from 'react-native-splash-screen'

export default class VideoScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      paused: false
    }
  }

  componentDidMount(){
    SplashScreen.hide();

    var that = this;
    this.props.navigation.addListener('willBlur', (event) => {
      that.setState({paused: true});
    });
    AsyncStorage.getItem('VERSION', (err, value) => {
      if(value != version){
        Form.import();
        AsyncStorage.setItem('VERSION', version);
      }
    });
  }

  handleOnVideoEnd(){
    this.player.seek(0);
    this.props.navigation.navigate("TabletInfo");
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.fullScreen}
          onPress={() => this.setState({ paused: !this.state.paused })} >
          <Video
           ref={(ref) => { this.player = ref }}
           source={{uri:'family'}}
           rate={1.0}
           paused={this.state.paused}
           resizeMode={"cover"}
           onEnd={() => this.handleOnVideoEnd() }
           style={styles.backgroundVideo} />
        </TouchableOpacity>
      </View>
    )
  }
}
