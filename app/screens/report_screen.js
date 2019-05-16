import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView
} from 'react-native';

import SurveyService from '../services/survey_service';

import { List, ListItem } from 'react-native-elements'
import Moment from 'moment';

const data = SurveyService.get();

export default class ReportScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: data
    }
  }

  render() {
    return (
      <View>
        <Text>Offline</Text>
        <ScrollView>
          <List>
            {
              this.state.data.map(item  => {
                const date = Moment(item.start_entried_at).format("llll");
                return(
                  <ListItem
                    key={`${item.start_entried_at}`}
                    title={`${date}`}
                  />
                )
              })
            }
          </List>
        </ScrollView>
      </View>

    )
  }

}
