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
  centerItems: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  intro: {
    fontSize: 22,
    color: 'black',
    margin: 2
  },
  buttonView: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.skyBlue,
    marginTop: 20,
    padding: 10,
    width: '40%',
    height: 50,
    marginRight: 10
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
  }

});
