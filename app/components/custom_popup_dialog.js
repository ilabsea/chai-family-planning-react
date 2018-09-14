import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import styles from '../components/styles';
import { withNavigation } from 'react-navigation';
import PopupDialog, {
  DialogTitle,
  DialogButton,
  ScaleAnimation
} from 'react-native-popup-dialog';


const scaleAnimation = new ScaleAnimation();
const IconButton = props => (
  <AwesomeIcon.Button
    name={props.name} size={30} solid
    backgroundColor="white" color="black" onPress={props.onPress}>
    <Text style={{color: 'black', fontSize: 22}}>
      {props.title}
    </Text>
  </AwesomeIcon.Button>
);


class CustomPopupDialog extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  showScaleAnimationDialog = () => {
    this.scaleAnimationDialog.show();
  }

  ignoreChanges = () => {
    this.props.onNavigation.navigate('Video');
  }

  render() {
    return (
      <PopupDialog
        ref={(popupDialog) => {
          this.scaleAnimationDialog = popupDialog;
        }}
        dialogAnimation={scaleAnimation}
        dialogStyle={{width: "90%", height: "35%"}}
        actions={[
          <DialogButton
            text="CANCEL"
            align="right"
            textStyle={{color: '#1976d2'}}
            onPress={() => {
              this.scaleAnimationDialog.dismiss();
            }}
            key='cancel-button'/>,]}>
        <View style={[styles.container, {margin: 30}]}>
          <Text style={styles.headerPopup}>Exit Survey</Text>
          <IconButton name='save' title='Save Changes' onPress={this.props.onSave}/>
          <View style={{height: 10}}/>
          <IconButton name='trash' title='Ignore Changes' onPress={this.ignoreChanges}/>
        </View>
      </PopupDialog>
    )
  }
}

export default CustomPopupDialog;
