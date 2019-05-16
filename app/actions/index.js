
export const ADD_SURVEY = 'ADD_SURVEY';

import realm from '../data/schema';
import SurveyService from '../services/survey_service';

// Add Quote - CREATE (C)
export function addSurvey(survey){
    return (dispatch) => {
      survey = {value: [ {code: 'name', value: 'Tester'},
                {code: 'gender', value: 'female'},
                {code: 'birth_spacing', value: 'pill'},
                {code: 'hometown', value: 'kandal'}
              ],
        version: '123',
        start_entried_at: new Date()
      };
      SurveyService.save(survey, () => {
        dispatch({type: ADD_SURVEY, survey: survey});
      });
    };
}
