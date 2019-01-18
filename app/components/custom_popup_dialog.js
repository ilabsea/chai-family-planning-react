import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard
} from 'react-native';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import styles from '../components/styles';
import { withNavigation } from 'react-navigation';
import PopupDialog, {
  DialogTitle,
  DialogButton,
  ScaleAnimation,
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

  goToNextScreen = () => {
    this.props.onSave();
    this.props.onNavigation.navigate('Thank');
  }

  render() {
    return (
      <PopupDialog
        ref={(popupDialog) => {
          this.scaleAnimationDialog = popupDialog;
        }}
        dialogAnimation={scaleAnimation}
        dialogStyle={this.props.dialogType == 'confirm' ? styles.confirmBox : styles.warningBox}
        actions={this.dialogButtons()}>

        {this.props.dialogType == 'confirm' &&
          <View style={[styles.container, {margin: 30}]}>
            <Text style={styles.headerPopup}>Exit Survey</Text>
            <IconButton name='save' title='Save Changes' onPress={this.props.onSave}/>
            <View style={{height: 10}}/>
            <IconButton name='trash' title='Ignore Changes' onPress={this.ignoreChanges}/>
          </View>
        }

        {this.props.dialogType == 'warning' &&
          <View style={[styles.container, {margin: 30}]}>
            <Text style={{fontSize: 24, lineHeight: 40}}>Do you want to exit? You will not be able to resume this session. </Text>
          </View>
        }

        {this.props.dialogType == 'confirm-end' &&
          <View style={[styles.container, {margin: 30 }]}>
            <Text style={{fontSize: 24, lineHeight: 40}}>This concludes the counseling session. Would you like to exit? </Text>
          </View>
        }

        {this.props.dialogType == 'confirm-exit' &&
          <View style={[styles.container, {margin: 30}]}>
            <Text style={{fontSize: 24, lineHeight: 40}}>Are you sure you want to exit? </Text>
          </View>
        }

      </PopupDialog>
    )
  }

  dialogButtons(){
    if(this.props.dialogType == 'confirm'){
      return(
        [          <DialogButton
                    text="CANCEL"
                    align="right"
                    textStyle={styles.dialogButtonText}
                    onPress={() => {
                      this.scaleAnimationDialog.dismiss();
                    }}
                    key='cancel-button'/>]
      )
    }

    if(this.props.dialogType == 'warning' || this.props.dialogType == 'confirm-end'){
      return(
        [
          <DialogButton
            text="Yes"
            textStyle={styles.dialogButtonText}
            onPress={this.goToNextScreen}
            buttonStyle={styles.dialogButton}
            key='button-1'/>,

            <DialogButton
              text="No"
              align="right"
              textStyle={styles.dialogButtonText}
              buttonStyle={[styles.dialogButton, {right: 0}]}
              onPress={() => {
                this.scaleAnimationDialog.dismiss();
              }}
              key='button-2'/>
        ]
      )
    }

    if(this.props.dialogType == 'confirm-exit'){
      return(
        [
          <DialogButton
            text="Yes"
            textStyle={styles.dialogButtonText}
            onPress={this.props.onSave}
            buttonStyle={styles.dialogButton}
            key='button-1'/>,

            <DialogButton
              text="No"
              align="right"
              textStyle={styles.dialogButtonText}
              buttonStyle={[styles.dialogButton, {right: 0}]}
              onPress={() => {
                this.scaleAnimationDialog.dismiss();
              }}
              key='button-2'/>
        ]
      )
    }

  }
}

CustomPopupDialog.defaultProps = {
  dialogType: 'confirm'
}

export default CustomPopupDialog;
