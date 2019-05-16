import React from 'react';
import {
View
} from 'react-native';

const BaseFontSize = 24;

export const UL = {
  ul: (_htmlAttribs, _children, _convertedCSSStyles, passProps) => {
    const ulStyle = {
      fontSize: BaseFontSize,
      marginRight: 10,
      width: BaseFontSize / 2.8,
      height: BaseFontSize / 2.8,
      marginTop: 18,
      backgroundColor: 'black',
      borderRadius: BaseFontSize / 2.8,
    }

    if(_htmlAttribs.class == 'circleUl'){
      ulStyle.backgroundColor = 'white',
      ulStyle.borderWidth = 1
    }else if(_htmlAttribs.class == 'squareUl'){
      ulStyle.borderRadius = 0
    }

    return <View style={ulStyle}/>
  }
}
