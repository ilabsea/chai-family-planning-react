import React, { Component } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { CheckBox } from 'react-native-elements';
import ImageScalable from 'react-native-scalable-image';

class CustomRadioButtonGroup extends Component {
    render() {
        const { items, input:{ value, onChange } } = this.props;
        return (
            <View>
                { items.map( item => {
                  return(
                    <Radio key={item.label} {...item}
                      onChange={onChange}
                      checked={item.value === value}
                    />
                  )
                })}
            </View>
        )
    }
}

class Radio extends Component {
  render() {
      const { checked, label, name, media } = this.props;
      return(
        <TouchableOpacity key={name} onPress={this.handlePress}>
          <View>
            <CheckBox title={label} onPress={this.handlePress}
              checkedIcon='dot-circle-o' uncheckedIcon='circle-o'
              checked={checked}
             />
             { media &&
               <View style={{alignItems:'center'}}>
                 <ImageScalable source={{uri: 'asset:/images/'+media}} />
               </View>
             }
          </View>
        </TouchableOpacity>
      )
  }

    handlePress = () => this.props.onChange(this.props.value)
}

export default CustomRadioButtonGroup;
