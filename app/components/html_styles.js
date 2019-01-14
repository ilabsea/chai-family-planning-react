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
    width: Dimensions.get('window').width - 50,
  },
  'title': {
    fontSize: 40,
    marginBottom: 10,
    marginLeft: -25,
    marginTop: 0
  },
  'indent': {
    paddingLeft: 30
  }
})
