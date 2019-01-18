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
  Image,
} from 'react-native';

import environment from '../environments/environment';

import Form from '../utils/form';
import { version } from '../../package.json';
import styles from '../components/styles';
import { withNavigationFocus } from 'react-navigation'

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import VideoPlayer from 'react-native-video-player';
import Orientation from 'react-native-orientation';
import Icon from 'react-native-vector-icons/Ionicons';

const VIMEO_ID = '179859217';

export default class VideoScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showLayer: false,
      loading: true
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
    this.showLayer();
    this.props.navigation.navigate('TabletInfo');
  }

  updateLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    this.setState({width, height});
    this.setState({loading: false});
  }

  resumePlayeHandler = () => {
    this.player.resume();
    this.hideLayer();
  }

  playPressHandler = () => {
    this.setState({showLayer: !this.state.showLayer});
  }

  hideLayer = () => {
    this.setState({showLayer: false});
  }

  showLayer = () => {
    this.setState({showLayer: true});
  }

  render() {
    const layerContent = (
      <TouchableOpacity onPress={this.resumePlayeHandler} style={componentStyles.layer}>
        <View style={[componentStyles.innerLayer, componentStyles.layer]}></View>

        <View style={componentStyles.iconContainer}>
          <Icon size={32} name='md-play' color='#fff' style={{marginLeft: 5}} />
        </View>
      </TouchableOpacity>
    );

    let opacityStyle = this.state.loading ? {opacity: 0} : {opacity: 1};

    return (
      <View style={styles.container}>
        { this.state.loading &&
          <View style={styles.loadingContainer}>
            <Image source={require('../assets/images/loading.gif')} />
          </View>
        }

        <View style={[styles.container, componentStyles.container, opacityStyle]} onLayout={this.updateLayout}>
          { this.state.showLayer && layerContent }
          <VideoPlayer
            video={{ uri: environment['video'] }}
            videoWidth={this.state.width}
            videoHeight={this.state.height}
            ref={r => this.player = r}
            resizeMode="stretch"
            hideControlsOnStart={true}
            pauseOnPress={true}
            onPlayPress={this.playPressHandler}
            style={{backgroundColor: 'grey'}}
          />
        </View>

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
    this.showLayer();
    this.props.navigation.openDrawer();
  }
  componentWillMount() {
    this.props.navigation.setParams({handleNav: this.handleNav});
  }
}

const componentStyles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  innerLayer: {
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
  },
  layer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  loadingContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 70,
    right: 0,
    left: 0,
    zIndex: 1001
  }
});
