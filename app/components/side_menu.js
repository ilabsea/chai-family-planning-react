import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './styles';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View, TouchableOpacity, Image} from 'react-native';
import { StackNavigator } from 'react-navigation';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import SurveyService from '../services/survey_service';

class SideMenu extends Component {

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  constructor(props){
    super(props);
    this.state = {
      numOfOffLineRecords: SurveyService.count(),
    }
  }

  render () {
    const numOfOffLineRecords = SurveyService.count();
    return (
      <View style={styles.container}>
        <ScrollView>
          <View alignItems='center' style={styles.header}>
            <Image source={{uri: 'asset:/family.png'}} style={{width: 80, height: 80}} />
            <Text style={styles.menuBrand}>Family Planning</Text>
          </View>

          <View>
            <TouchableOpacity onPress={this.navigateToScreen('Home')}>
              <View style={styles.row}>
                <AwesomeIcon name='home' size={20} style={styles.icon} />
                <Text style={styles.menuItem} >Home</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.navigateToScreen('Survey')}>
              <View style={styles.row}>
                <AwesomeIcon name='database' size={20} style={styles.icon} />
                <Text style={styles.menuItem} >Survey {numOfOffLineRecords > 0 ? `(${numOfOffLineRecords})`: ''}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.navigateToScreen('About')}>
              <View style={styles.row}>
                <AwesomeIcon name='list' size={20} style={styles.icon} />
                <Text style={styles.menuItem}>About</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;
