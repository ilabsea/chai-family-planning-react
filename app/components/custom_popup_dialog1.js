import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

import Dialog, { DialogButton, DialogContent, DialogTitle } from 'react-native-popup-dialog';

const const CONTENTS = [
  { saveChangeDialog: saveChange },
  { endDialog: }
];

class CustomPopupDialog extends Component {

  constructor(props) {
    super(props);
  }

  actions(){
    if(this.props.dialogType == 'saveChange'){
      return(
        [          <DialogButton
                    text="CANCEL"
                    align="right"
                    textStyle={{color: '#1976d2'}}
                    onPress={() => {
                      this.scaleAnimationDialog.dismiss();
                    }}
                    key='cancel-button'/>]
      )
    }

    if(this.props.dialogType == 'warning'){
      return(
        [
          <DialogButton
            text="Yes"
            textStyle={{color: '#1976d2'}}
            onPress={this.ignoreChanges}
            buttonStyle={{right: '20%', bottom: 0, position: 'absolute'}}
            key='button-1'/>,

            <DialogButton
              text="No"
              align="right"
              textStyle={{color: '#1976d2'}}
              buttonStyle={{bottom: 0, position: 'absolute'}}
              onPress={() => {
                this.scaleAnimationDialog.dismiss();
              }}
              key='button-2'/>
        ]
      )
    }

    if(this.props.dialogType == 'confirm-end'){
      return(
        [
          <DialogButton
            text="Yes"
            textStyle={{color: '#1976d2'}}
            onPress={this.goToNextScreen}
            buttonStyle={{right: '20%', bottom: 0, position: 'absolute'}}
            key='button-1'/>,

            <DialogButton
              text="No"
              align="right"
              textStyle={{color: '#1976d2'}}
              buttonStyle={{bottom: 0, position: 'absolute'}}
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
            textStyle={{color: '#1976d2'}}
            onPress={this.props.onSave}
            buttonStyle={{right: '20%', bottom: 0, position: 'absolute'}}
            key='button-1'/>,

            <DialogButton
              text="No"
              align="right"
              textStyle={{color: '#1976d2'}}
              buttonStyle={{bottom: 0, position: 'absolute'}}
              onPress={() => {
                this.scaleAnimationDialog.dismiss();
              }}
              key='button-2'/>
        ]
      )
    }
  }

  dialogContent(){
    return (
      <DialogContent style={{backgroundColor: '#F7F7F8',}}>
        <View style={{alignItems: 'center'}}>
          <IconButton name='save' title='Save Changes' />
          <View style={{height: 10}}/>
          <IconButton name='trash' title='Ignore Changes' />
        </View>
      </DialogContent>
    )
  }

  render(){
    return (
      <Dialog
        visible={this.props.visible}
        dialogTitle={
                <DialogTitle
                  title={this.props.title}
                  style={{
                    backgroundColor: '#F7F7F8',
                  }}
                  hasTitleBar={false}
                  align="left"
                />
              }

        actions={this.actions()}>
        {this.dialogContent}
      </Dialog>
    )
  }
}

CustomPopupDialog.defaultProps = {
  dialogType: 'confirm',
  width: {0.5}
  rounded: false
}

export default CustomPopupDialog;
