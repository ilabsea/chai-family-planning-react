import React from 'react';
import { View, TextInput } from 'react-native';
import { FormInput } from 'react-native-elements';

export default function CustomTextInput(props) {
  const { input, ...inputProps } = props;

  return (
    <View style={{paddingLeft: 10}}>
      <TextInput
        {...inputProps}
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={input.value}
      />
    </View>
  );
}
