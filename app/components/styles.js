export const colors = {
  red: "#FF0000",
  skyBlue: "#1976d2"
}

export const text = {
  fontSize: 18
}

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  header:{
    backgroundColor: colors.skyBlue,
    fontSize: 24,
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
    paddingHorizontal: 10,
  },
  icon: {
    width: 32,
    color: 'rgba(0,0,0,0.54)'
  },
  form: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  fieldWrapper: {
    flexDirection: 'row',
    paddingBottom: 10
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
    fontSize: 24,
    color: 'white'
  },
  textInput: {
    borderColor: 'black',
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
    backgroundColor: colors.skyBlue,
    width: '40%',
    height: 50,
    alignSelf: 'flex-end',
    padding: 10,
    margin: 10
  },
  noButton: {
    backgroundColor: 'white',
    borderColor: colors.skyBlue,
    borderWidth: 2
  },
  buttonText: {
    color: 'white',
    fontSize: text.fontSize,
    fontWeight: 'bold'
  },
  noButtonText:{
    color: colors.skyBlue,
  },
  headerPopup: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 20,

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
    fontSize: 18
  },
  thankMessage:{
    fontSize: 22,
    color: 'black',
    paddingBottom: 20
  }
});
