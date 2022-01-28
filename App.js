/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StackNavigator } from 'react-navigation';

import BirthdaysToday from './src/BirthdaysToday';
import AddBirthdays from './src/AddBirthdays';
import ViewBirthdays from './src/ViewBirthdays';
import EditBirthday from './src/EditBirthday';

export default class App extends Component<Props> {

  render() {
    return (
      <AppStackNavigator/>
    );
  }
}

const AppStackNavigator = new StackNavigator({
  BirthdaysToday: {screen: BirthdaysToday},
  AddBirthdays: {screen: AddBirthdays },
  ViewBirthdays: {screen : ViewBirthdays},
  EditBirthday: {screen : EditBirthday}
})
