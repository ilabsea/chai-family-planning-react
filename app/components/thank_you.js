import React from "react";
import {
  View,
  Text,
  BackHandler,
  TouchableOpacity
} from "react-native";
import styles from './styles';
import CustomPopupDialog from './custom_popup_dialog';


const ThankYou = props => (
    <View key={'end'} style={styles.mainScreen}>
      <View style={[styles.container, { justifyContent: 'center'}]}>
        <Text style={styles.thankMessage}>Thank you !</Text>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={[styles.button, {alignSelf: 'flex-start'}]}
          onPress={ props.onRestart }>
          <Text style={styles.buttonText}> Start New Session </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button,{alignSelf: 'flex-start'}]}
          onPress={() => { this.popup.showScaleAnimationDialog() }}>
          <Text style={[styles.buttonText, styles.noButtonText]}> Exit App </Text>
        </TouchableOpacity>
      </View>
      <CustomPopupDialog onRef={ref => (this.popup = ref)}
        onNavigation={props.navigation}
        onSave={() => { BackHandler.exitApp() }}
        dialogType = {props.dialogType}
      />
    </View>
);

export default ThankYou;
