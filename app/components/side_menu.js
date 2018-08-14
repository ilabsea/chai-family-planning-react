import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './styles';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View, TouchableOpacity, Image} from 'react-native';
import { StackNavigator } from 'react-navigation';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

class SideMenu extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render () {
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

            <TouchableOpacity onPress={this.navigateToScreen('QuestionForm')}>
              <View style={styles.row}>
                <AwesomeIcon name='database' size={20} style={styles.icon} />
                <Text style={styles.menuItem} >Data</Text>
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
        <View style={styles.footerContainer}>
          <Text>This is my fixed footer</Text>
        </View>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;
