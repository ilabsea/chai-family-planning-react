import React from "react";
import {
  View,
  Text,
  BackHandler,
  TouchableOpacity
} from "react-native";
import styles from './styles';

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
          onPress={() => { BackHandler.exitApp() }}>
          <Text style={[styles.buttonText, styles.noButtonText]}> Exit App </Text>
        </TouchableOpacity>
      </View>

      {// <CustomPopupDialog onRef={ref => (this.popup = ref)}
      //   onNavigation={this.props.navigation}
      //   onSave={() => { BackHandler.exitApp() }}
      //   dialogType = {this.state.dialogType}
      // />
    }
    </View>
);

export default ThankYou;
