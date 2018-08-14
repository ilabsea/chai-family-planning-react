export const colors = {
  red: "#FF0000",
}

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  header:{
    backgroundColor: '#1976d2',
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
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10
  },
  required: {
    color: 'red',
    fontSize: 18,
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
  }
});
