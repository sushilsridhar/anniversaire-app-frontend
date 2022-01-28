/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { DatePickerIOS, Alert, TextInput, Button, Platform, StyleSheet, Text, View} from 'react-native';
import { List, ListItem, Header, SearchBar } from 'react-native-elements';
import { resourceURL } from './constants';
import EditButton from './EditButton';
import { StackActions, NavigationActions } from 'react-navigation';

export default class EditBirthday extends Component<Props> {

state = { chosenDate: new Date(this.props.navigation.state.params.birthday.birthday),
          firstName: this.props.navigation.state.params.birthday.firstName,
          lastName: this.props.navigation.state.params.birthday.lastName,
          companyName: this.props.navigation.state.params.birthday.companyName,
          id: this.props.navigation.state.params.birthday.id,

            isDisabled: false,
            isEditable: false,
            responseMessage: null,
            disableDeleteButton:false,
            enableUpdateButton:false
  };

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

  enableEdit = () => {
    this.setState({
      isEditable: true,
      disableDeleteButton: true,
      enableUpdateButton: true
    });
  }

  onPressDelete = () => {
     Alert.alert(
        'Do you want to delete this birthday?',
        'You cannot undo this action',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => this.deleteBirthday()},
        ],
        { cancelable: false }
      )
  }

  deleteBirthday = () => {
    console.log("delete called");
    this.setState({
      isDisabled: true,
      disableDeleteButton: true
    });

    var id = this.state.id

    fetch(resourceURL+'/'+id, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Basic dXNlcm5hbWU6cGFzc3dvcmQ='
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
          isDisabled: false,
          disableDeleteButton: false
      }))
  }

  updateBirthday = () => {
    this.setState({
      isDisabled: true,
      isEditable: false
    });

    const payload = {
        id: this.state.id,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        birthday: this.state.chosenDate.toISOString().split("T")[0],
        companyName: this.state.companyName
    };

    fetch(resourceURL, {
        method: 'PUT',
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
          enableUpdateButton: false,
          disableDeleteButton: false
      }))
     .then(() => {
        this.props.navigation.state.params.callBack();
     })
      .catch(error =>
          this.setState({
          responseMessage: "Oops. Please try again later!",
          isDisabled: false,
          enableUpdateButton: false,
          disableDeleteButton: false
      })) 
  }

  onPressCancel = () => {
    //this.props.navigation.setParams({ name: 'Lucy' })
      this.props.navigation.goBack();
  }

  render() {
    return (
    
     <View style={styles.container}>
        <TextInput style={styles.welcome} onChangeText={this.setFirstName} autoFocus={true} value={this.state.firstName} editable={this.state.isEditable} placeholder="Enter First Name"/>
        <TextInput style={styles.welcome} onChangeText={this.setLastName} value={this.state.lastName} editable={this.state.isEditable} placeholder="Enter Last Name"/>
        <TextInput style={styles.welcome} onChangeText={this.setCompanyName} value={this.state.companyName} editable={this.state.isEditable} placeholder="Enter Company Name"/>
        <DatePickerIOS date={this.state.chosenDate} onDateChange={this.setBirthday} mode="date"/>

        <EditButton 
          onPressEdit={this.enableEdit} 
          isDisabled={this.state.isDisabled} 
          enableUpdateButton = {this.state.enableUpdateButton} 
          onPressUpdate = {this.updateBirthday}
          onPressCancel = {this.onPressCancel} />
        <Button
          onPress={this.onPressDelete}
          title="Delete"
          disabled={this.state.disableDeleteButton}
        />

        <Text style={styles.welcome}>{this.state.responseMessage}</Text>
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
