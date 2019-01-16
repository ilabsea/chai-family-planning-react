export const colors = {
  red: "#FF0000",
  skyBlue: "#1976d2"
}

export const text = {
  fontSize: 24
}

import { StyleSheet } from 'react-native';

import { Dimensions } from "react-native";

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header:{
    backgroundColor: colors.skyBlue,
    fontSize: 36,
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: 'white'
  },
  navItemStyle: {
    padding: 10
  },
  navSectionStyle: {
    backgroundColor: 'lightgrey'
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  row: {
    flexDirection: 'row',
    height: 48,
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  icon: {
    width: 32,
    color: 'rgba(0,0,0,0.54)'
  },
  form: {
    flex: 1,
    paddingHorizontal: 20
  },
  fieldWrapper: {
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 30,
    position: 'absolute',
    left: 10
  },
  fieldName: {
    fontSize: text.fontSize,
    fontWeight: 'bold',
    paddingLeft: 10
  },
  required: {
    color: 'red',
    fontSize: text.fontSize,
    fontWeight: 'bold'
  },
  menuItem: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold'
  },
  menuBrand: {
    fontSize: text.fontSize,
    color: 'white'
  },
  textInput: {
    borderColor: 'black',
    fontSize: text.fontSize,
    borderBottomWidth: 1
  },
  intro: {
    fontSize: 22,
    color: 'black',
    textAlign: 'center',
    marginTop: 20
  },
  buttonView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.skyBlue,
    width: '40%',
    height: 70,
    alignSelf: 'flex-end',
    padding: 10,
    margin: 10
  },
  buttonText: {
    color: 'white',
    fontSize: text.fontSize,
    fontWeight: 'bold'
  },
  headerPopup: {
    fontSize: text.fontSize,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  viewPager: {
    flex: 1
  },
  errorMessageContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0
  },
  errorMessage:{
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    color: 'white',
    fontSize: text.fontSize
  },
  thankMessage:{
    fontSize: 50,
    color: 'black',
  },
  aboutText: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: 'black',
    textAlign: 'justify',
    fontSize: text.fontSize
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  main: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'hsla(0, 0%, 0%, 1)',
  },
  pane: {
    borderTopColor: 'transparent',
  },
  warningBox: {
    width: Math.min(height, width) * 0.5,
    height: Math.max(height, width) * 0.1,
    position: 'absolute',
    top: '30%'
  },
  confirmBox: {
    width: Math.min(height, width) * 0.6,
    height: Math.max(height, width) * 0.2,
    position: 'absolute',
    top: '20%'
  }


})
