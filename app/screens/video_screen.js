import React, { Component } from 'react';
import Video from 'react-native-video';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity,
  Alert,
  BackHandler
} from 'react-native';

import environment from '../environments/environment';

import Form from '../utils/form';
import { version } from '../../package.json';
import styles from '../components/styles';
import { withNavigationFocus } from 'react-navigation'

import SplashScreen from 'react-native-splash-screen';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class VideoScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      paused: false
    }
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
           source={{uri: environment['video']}}
           rate={1.0}
           paused={this.state.paused}
           resizeMode={"cover"}
           onEnd={() => this.handleOnVideoEnd() }
           style={styles.backgroundVideo}
           disableFocus={true}
            />
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
    this.setState({paused: true});
    this.props.navigation.openDrawer();
  }
  componentWillMount() {
    this.props.navigation.setParams({handleNav: this.handleNav});
  }
}
