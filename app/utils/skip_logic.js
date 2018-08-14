import { Alert } from 'react-native';
export default class SkipLogic {
  formValues: [];
  expressions: [];

  constructor(formValues, expressions) {
    this.formValues = formValues;
    this.expressions = expressions;
  }

  validate(){
    switch(this.expressions['type']){
      case 'or': {
        return this._validateOrExpression();
      }
      case 'and': {
        return this._validateAndExpression();
      }
      default: {
        return this._validateSingleExpression();
      }
    }
  }

  _getFieldValue(fieldName){
    return this.formValues[fieldName];
  }

  _validateSingleExpression(){
    exp = this.expressions['expressions'][0];
    fieldValue = this._getFieldValue(exp.leftOperand);
    if(fieldValue){
      exp.replaceLeftOperandByFormValue(fieldValue);
      return exp.validate();
    }
    return false;
  }

  _validateOrExpression(){
    var valid = false;
    for(var i=0; i<this.expressions['expressions'].length; i++){
      if(valid) return valid ;
      exp = this.expressions['expressions'][i];
      fieldValue = this._getFieldValue(exp.leftOperand);
      if(fieldValue){
        exp.replaceLeftOperandByFormValue(fieldValue);
        valid = valid || exp.validate();
      }else{
        valid = false;
      }

    }
    return valid;
  }

  _validateAndExpression(){
    var valid = true;
    for(var i=0; i<this.expressions['expressions'].length; i++){
      if(!valid) return valid ;
      exp = this.expressions['expressions'][i];
      fieldValue = this._getFieldValue(exp.leftOperand);
      if(fieldValue){
        exp.replaceLeftOperandByFormValue(fieldValue);
        valid = valid && exp.validate();
      }else{
        return false;
      }
    }
    return valid;
  }
}
