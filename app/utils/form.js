import { AsyncStorage } from 'react-native';
import XLSX from 'xlsx';
import { readFileAssets } from 'react-native-fs';
import realm from '../data/schema';

const input = res => res;
const questionTypes = ['select_one', 'select_multiple', 'text'];

export default class Form {

  static import(){
    readFileAssets("form.xls", "ascii").then((res) => {
      const wb = XLSX.read(input(res), {type:'binary'});
      for(let i=0; i< wb.SheetNames.length; i++){
        var wsname = wb.SheetNames[i];
        var ws = wb.Sheets[wsname];
        var data = XLSX.utils.sheet_to_json(ws, {header:1});
        switch (wsname) {
          case 'settings':{
            this.addVersion(data);
            break;
          }
          case 'survey':{
            this.addQuestion(data);
            break;
          }
          case 'choices':{
            this.addQuestionOption(data);
            break;
          }
        }
      }
      AsyncStorage.setItem('FIRST_LUNCH', JSON.stringify(false));
    }).catch((err) => {
      console.log('error');
      Alert.alert("importFile Error", "Error " + err.message);
    });
  }

  static addVersion(data){
    version = 1 ;
    formVersion = this.isFormExist(data[1][0]);
    if(formVersion){
      version = formVersion.version + 1;
      realm.write(() => {
        formVersion.to_date = Date.now();
        realm.create('Version', {id: data[1][0], version: version, from_date: Date.now()});
      });
    }else{
      realm.write(() => {
        realm.create('Version', {id: data[1][0], version: version, from_date: Date.now()});
      });
    }
  }

  static addQuestion(data){
    for(r=0; r<data.length; r++){
      questionType = data[r][0].split(' ');
      uuid = questionType.length > 1 ? questionType[1] : '';
      type = questionType[0];
      if(questionTypes.includes(type)){
        realm.write(() => {
          realm.create('Question', {
            uuid: uuid,
            type: type,
            name: data[r][1],
            label: data[r][2],
            required: (data[r][3] == 'true'),
            relevant: data[r][4]
          });
        });
      }
    }
  }

  static addQuestionOption(data){
    for(r=1; r<data.length; r++){
      realm.write(() => {
        realm.create('QuestionOption', {
          question_uuid: data[r][0],
          name: data[r][1],
          label: data[r][2],
          media: data[r][3]
        });
      });
    }
  }

  static isFormExist(formId){
    return realm.objects('Version').filtered('id="' + formId + '"').slice(-1)[0];
  }

}
