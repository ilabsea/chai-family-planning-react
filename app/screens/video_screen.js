import React, { Component } from 'react';
import Video from 'react-native-video';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity,
  Alert,
  Button,
  BackHandler,
  Dimensions
} from 'react-native';

import environment from '../environments/environment';

import Form from '../utils/form';
import { version } from '../../package.json';
import styles from '../components/styles';
import { withNavigationFocus } from 'react-navigation'

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import VideoPlayer from 'react-native-video-player';
import Orientation from 'react-native-orientation';

const VIMEO_ID = '179859217';
const dimensions = Dimensions.get('window');

export default class VideoScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      video: { width: dimensions.width, height: dimensions.height, duration: undefined },
    };
  }

  componentDidMount(){
    var that = this;
    this.subs = [
      this.props.navigation.addListener('willBlur', (event) => {
        that.setState({paused: true});
        Orientation.lockToPortrait();
      }),

      this.props.navigation.addListener("willFocus", () => {
        Orientation.lockToLandscape();
      })
    ]

    AsyncStorage.getItem('VERSION', (err, value) => {
      if(value != version){
        Form.import();
        AsyncStorage.setItem('VERSION', version);
      }
    });
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

  handleOnVideoEnd(){
    this.player.seek(0);
  }

  handleNextButtonPress(){
    this.player.pause();
    this.props.navigation.navigate('TabletInfo');
  }

  updateLayout = () => {
    const {width, height} = Dimensions.get('window');
    this.setState({width, height});
  }

  render() {
    return (
      <View style={styles.container} onLayout={this.updateLayout}>
        <VideoPlayer
          video={{ uri: environment['video'] }}
          videoWidth={parseInt(this.state.width, 10)}
          videoHeight={parseInt(this.state.height, 10) - 130}
          duration={this.state.video.duration}
          ref={r => this.player = r}
          resizeMode="stretch"
          style={{backgroundColor: 'grey'}}
        />
        <TouchableOpacity
          style={[ styles.button, { width: '100%', margin: 0} ]}
          onPress={() => this.handleNextButtonPress() }>
          <Text style={styles.buttonText}> Next </Text>
        </TouchableOpacity>

      </View>
    )
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    headerLeft:(<TouchableOpacity onPress={() => { navigation.state.params.handleNav() }}>
                  <AwesomeIcon name='bars' size={28} style={{color: 'white', paddingLeft: 10}} />
                </TouchableOpacity>
    )
  })

  handleNav = () => {
    this.player.pause();
    this.props.navigation.openDrawer();
  }
  componentWillMount() {
    this.props.navigation.setParams({handleNav: this.handleNav});
  }
}
