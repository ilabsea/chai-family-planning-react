import { StyleSheet } from 'react-native';
import {
  Dimensions
} from 'react-native';

export const text = {
  fontSize: 24
}

// const width = 1280 - 100;
const margin = 100;
let width = Dimensions.get('window').width;
width = width > 1000 ? (800 - margin) : (width - margin);

export default StyleSheet.create({
  'wrapper': {
    fontSize: text.fontSize,
    margin: 10,
    width: width + 25,
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
    right: 24,
    width: width,
    height: width*1.3929
  },
  'image9': {
    position: 'relative',
    width: width,
    height: width*0.8801
  },
  'Efficacy_Table_KH': {
    position: 'relative',
    width: width,
    height: width*1.0536
  },
  'COC_Guidelines': {
    position: 'relative',
    width: width,
    height: width*2.0416
  },
  'Condoms_Guidelines': {
    position: 'relative',
    width: width,
    height: width*1.8244
  },
  'Implant_Guidelines': {
    position: 'relative',
    width: width,
    height: width*1.8396
  },
  'Injection_Guidelines': {
    position: 'relative',
    width: width,
    height: width*2.2593
  },
  'IUD_Guidelines': {
    position: 'relative',
    width: width,
    height: width*2.2662
  },
  'POP_Guidelines': {
    position: 'relative',
    width: width,
    height: width*1.9126
  },
  'Sterilization_Guidelines': {
    position: 'relative',
    width: width,
    height: width*1.902
  },
  'Swipe_Right_KH': {
    position: 'relative',
    width: width,
    height: width*0.2886
  },
})
