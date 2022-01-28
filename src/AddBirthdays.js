/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { DatePickerIOS, TextInput, Button, Platform, StyleSheet, Text, View} from 'react-native';
import { resourceURL } from './constants';
import { StackActions, NavigationActions } from 'react-navigation';


export default class AddBirthdays extends Component<Props> {
  
  state = { chosenDate: new Date(),
            firstName: null,
            lastName: null,
            companyName: null,
            isDisabled: false,
            responseMessage: null };

  setBirthday = (birthday) => { 
    this.setState({
      chosenDate: birthday
    });
  }

  setFirstName = (name) => {
    this.setState({
      firstName: name
    });
  }

  setLastName = (name) => {
    this.setState({
      lastName: name
    });
  }

  setCompanyName = (name) => {
    this.setState({
      companyName: name
    });
  }

  addBirthdayToServer = () => {

    this.setState({
        isDisabled: true,
    });

    const payload = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        birthday: this.state.chosenDate.toISOString().split("T")[0],
        companyName: this.state.companyName
    };
    console.log(new Date());
    var b = this.state.chosenDate.toISOString().split("T")[0]
    console.log(b);

    fetch(resourceURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
          'Authorization': 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=',
          'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log(response);
        if (response.ok) {
            return response._bodyText;
        } else {
           var error = new Error('Error ' + response.status + ': ' + response.statusText);
           error.response = response;
           throw error;
        }
      })
     .then(respMessage => this.setState({
          responseMessage: respMessage,
          isDisabled: false,
          firstName: null,
          lastName: null,
          companyName: null,
          chosenDate: new Date()

      }))
     .then(() => {
          this.props.navigation.state.params.callBack();
     })
      .catch(error =>
          this.setState({
          responseMessage: "Oops. Please try again later!",
          isDisabled: false
      })) 
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.welcome} onChangeText={this.setFirstName} value={this.state.firstName} placeholder="Enter First Name"/>
        <TextInput style={styles.welcome} onChangeText={this.setLastName} value={this.state.lastName} placeholder="Enter Last Name"/>
        <TextInput style={styles.welcome} onChangeText={this.setCompanyName} value={this.state.companyName} placeholder="Enter Company Name"/>
        <DatePickerIOS date={this.state.chosenDate} onDateChange={this.setBirthday} mode="date"/>
        <Button
          onPress={this.addBirthdayToServer}
          title="Add Birthday"
          disabled={this.state.isDisabled}
        />
        <Text style={styles.welcome}>{this.state.responseMessage}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
