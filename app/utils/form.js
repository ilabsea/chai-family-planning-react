import { AsyncStorage, Alert } from 'react-native';
import XLSX from 'xlsx';
import { readFileAssets } from 'react-native-fs';
import realm from '../data/schema';
import Task from './task';

import environment from '../environments/environment';

const input = res => res;
const questionTypes = ['select_one', 'select_multiple', 'text', 'integer', 'decimal', 'date', 'note'];

export default class Form {

  static import(){
    console.log('*** Import ***');
    readFileAssets("forms/"+environment['form'], "ascii").then((res) => {
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
    })
    .then((res) => {
      Task.synCoreData();
    }).catch((err) => {
      Alert.alert("importFile Error", "Error " + err.message);
    });
  }

  static addVersion(data){
    version = 1 ;
    formVersion = this.isFormExist(data[1][0]);
    realm.write(() => {
      if(formVersion){
        version = formVersion.version + 1;
        formVersion.to_date = new Date();
      }
      realm.create('Version', {uuid: data[1][0], version: version, from_date: new Date()});
    });
  }

  static addQuestion(data){
    this.clearQuestion();

    var order = 0;
    for(r=0; r<data.length; r++){
      if(data[r][0] != undefined){
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
              required: (data[r][3] == 'yes' || data[r][3] == 'true'),
              relevant: data[r][4],
              media: data[r][5],
              order: order
            });
          });
          order = order + 1;
        }
      }
    }
  }

  static addQuestionOption(data){
    this.clearQuestionOption();
    for(r=1; r<data.length; r++){
      realm.write(() => {
        if(data[r][0] != undefined){
          realm.create('QuestionOption', {
            question_uuid: data[r][0],
            name: data[r][1],
            label: data[r][2],
            value: data[r][1],
            media: data[r][3]
          });
        }
      });
    }
    this.linkOptionsToQuestion();
  }

  static clearQuestion(){
    realm.write(() => {
      let data = realm.objects('Question');
      realm.delete(data);
    });
  }

  static clearQuestionOption(){
    realm.write(() => {
      let data = realm.objects('QuestionOption');
      realm.delete(data);
    });
  }

  static linkOptionsToQuestion(){
    questions = realm.objects('Question');
    for(var i=0; i<questions.length; i++){
      question = questions[i];
      if(question.type == 'select_one' || question.type == 'select_multiple'){
        realm.write(() => {
          question.options = this.relatedOptions(question.uuid);
        });
      }
    }
  }

  static relatedOptions(question_uuid){
    return realm.objects('QuestionOption').filtered('question_uuid="' + question_uuid + '"');
  }

  static isFormExist(formId){
    return realm.objects('Version').filtered('uuid="' + formId + '"').slice(-1)[0];
  }

}
