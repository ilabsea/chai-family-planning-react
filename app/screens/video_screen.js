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

import SplashScreen from 'react-native-splash-screen';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import VideoPlayer from 'react-native-video-player';

const VIMEO_ID = '179859217';

export default class VideoScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      video: { width: undefined, height: undefined, duration: undefined },
    };
  }

  componentWillMount() {
    SplashScreen.hide();
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
  }

  handleNextButtonPress(){
    this.player.pause();
    this.props.navigation.navigate('TabletInfo');
  }

  render() {
    return (
      <View style={styles.container}>
        <VideoPlayer
          video={{ uri: environment['video'] }}
          videoWidth={Dimensions.get('window').width}
          videoHeight={Dimensions.get('window').height-140}
          duration={this.state.video.duration}
          ref={r => this.player = r}
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
