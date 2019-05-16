import React from 'react';
import { View, TextInput } from 'react-native';

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
        autoFocus={true}
      />
    </View>
  );
}
