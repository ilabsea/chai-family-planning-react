import React, { Component } from 'react'
import { TouchableOpacity, View, Text, Alert } from 'react-native'
import { CheckBox } from 'react-native-elements';
import ImageScalable from 'react-native-scalable-image';

class CustomCheckboxGroup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      const { items, input:{ value, onChange, handleChange } } = this.props;
      return (
          <View>
              { items.map( item => {
                const isChecked = (value.indexOf(item.value) !== -1);

                return(
                  <CustomCheckBox key={item.label} {...item}
                    onChange={(event) => {
                                let newValue;
                                if(value.length == 0){
                                  newValue = [] ;
                                }else{
                                  newValue = [...value];
                                }

                                if(value.length == 0 || value.indexOf(item.value) == -1){
                                  newValue.push(item.value);
                                }else{
                                  newValue.splice(value.indexOf(item.value), 1);
                                }

                                if (handleChange) {
                                  handleChange(event);
                                }
                               return onChange(newValue);
                           }}
                    checked={isChecked}
                 />
                )
              })}
          </View>
      )
  }
}

class CustomCheckBox extends Component {
  render() {
      const { checked, label, name, media } = this.props;
      return(
        <TouchableOpacity key={name} onPress={this.handlePress}>
          <View>
            <CheckBox title={label}
                      checked={checked}
                      onPress={this.handlePress}
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

export default CustomCheckboxGroup;
