import { Alert } from 'react-native';
export default class Expression {
  leftOperand: string;
  operator: string;
  rightOperand: string;

  constructor(leftOperand, operator, rightOperand) {
    this.leftOperand = leftOperand;
    this.operator = operator;
    this.rightOperand = rightOperand;
  }

  validate(){
    if(this.operator == 'selected'){
      values = this.leftOperand.split(',');
      return values.includes(this.rightOperand);
    }
    return eval(`"${this.leftOperand}" ${this.operator} "${this.rightOperand}"`);
  }

  replaceLeftOperandByFormValue(value){
    if(this.operator == 'selected'){
      this.leftOperand = value.join(',');
    }else{
      this.leftOperand = value;
    }
    return this;
  }

  static toObject(rawExpr){
    result = rawExpr.match(/\$\{(\w+)\}/);
    leftOperand = result ? result[1] : '';

    result = rawExpr.match(/[‘|'|"](\w+)[’|'|"]/);
    rightOperand = result ? result[1] : '';

    result = rawExpr.match(/(\>\=|\<\=|\!\=|[\+\-\*\>\<\=\|]|div|or|and|mod|selected)/);
    operator = result ? result[1] : '';

    if(operator == "="){
      operator = "==";
    }
    return new Expression(leftOperand, operator, rightOperand);
  }

  static parse(exprStr){
    expType = this.isBooleanExpression(exprStr);
    expressions = [];
    if(expType == 'and' || expType == 'or'){
      expressions = this.parseToBooleanExpression(exprStr, expType).split(BOOL_OPERATOR[expType]);
      console.log('parse expressions : ', expressions)
    }else{
      expressions = [exprStr];
    }
    return {
              type: expType,
              expressions: expressions.map((rawExpr) => { return(Expression.toObject(rawExpr)) })
           }

  }

  static parseToBooleanExpression(exprStr, operatorName){
    return exprStr.replace(new RegExp(operatorName, 'gi'), BOOL_OPERATOR[operatorName]);
  }

  static isBooleanExpression(exprStr){
    if(new RegExp("or").test(exprStr)){
      return 'or';
    }else if(new RegExp("and").test(exprStr)){
      return 'and';
    }
    return '';
  }
}

const BOOL_OPERATOR = {or: '||', and: '&&'};
