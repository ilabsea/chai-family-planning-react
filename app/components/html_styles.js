import { StyleSheet } from 'react-native';
import {
  Dimensions
} from 'react-native';

export const text = {
  fontSize: 24
}

const width = Dimensions.get('window').width-100;

export default StyleSheet.create({
  'wrapper': {
    fontSize: text.fontSize,
    margin: 10,
    width: Dimensions.get('window').width - 75,
    lineHeight: 35
  },
  'indent': {
    paddingLeft: 30
  },
  'circleUl': {
    fontSize: text.fontSize,
    marginBottom: -10
  },
  'squareUl': {
    fontSize: text.fontSize,
    marginBottom: -10
  },
  'addMarginTop': {
    marginTop: 10
  },
  'image8': {
    position: 'relative',
    right: 24,
    width: width,
    height: width*1.393
  },
  'image9': {
    width: width,
    height: width*0.603
  },
})
