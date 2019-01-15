import { StyleSheet } from 'react-native';
import {
  Dimensions
} from 'react-native';

export const text = {
  fontSize: 24
}

export default StyleSheet.create({
  'wrapper': {
    fontSize: text.fontSize,
    margin: 10,
    width: Dimensions.get('window').width - 70,
    lineHeight: 35
  },
  'title': {
    fontSize: 40,
    marginBottom: 10,
    marginLeft: 15,
    marginTop: 15,
  },
  'indent': {
    paddingLeft: 30
  },
  'circleUl': {
    fontSize: text.fontSize,
  },
  'squareUl': {
    fontSize: text.fontSize,
  },
})
