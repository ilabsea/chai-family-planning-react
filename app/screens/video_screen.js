import React, { Component } from 'react';
import Video from 'react-native-video';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';


export default class VideoScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      // <Video source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}

      <Video source={require('../assets/videos/bunny.mp4')}
       rate={1.0}
       volume={1.0}
       muted={false}
       resizeMode={"cover"}
       // repeat
       onEnd={() => this.props.navigation.navigate("TabletInfo")}
       style={styles.backgroundVideo} />
    )
  }

}

var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
