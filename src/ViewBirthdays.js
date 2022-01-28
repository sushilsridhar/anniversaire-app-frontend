/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { FlatList, Button, Platform, StyleSheet, Text, View} from 'react-native';
import { List, ListItem, Header, SearchBar } from 'react-native-elements';
import { resourceURL } from './constants';

export default class ViewBirthdays extends Component<Props> {

state = { birthdays: [] };

  componentDidMount() {
    this.fetchAllBirthdays();
  }

  fetchAllBirthdays = () => {
    fetch(resourceURL, {
        headers: {
            'Authorization': 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=',
            'Accept':       'application/json'
        }
    })
    .then(response => {
      console.log(response);
        if (response.ok) {
            return response;
        } else {
           var error = new Error('Error ' + response.status + ': ' + response.statusText);
           error.response = response;
           throw error;
        }
      })
    .then(response => response.json())
      .then(birthdays => this.setState({
          birthdays
      }))
      .catch(error => console.log(error)) 
  }

  static navigationOptions = {
    //header: null,
    headerTitle : "All Birthdays"
  }

  renderHeader = () => {
    return <Text></Text>
  }


  render() {
    return (
      <List> 
        <FlatList 
          data={this.state.birthdays}
          ListHeaderComponent={this.renderHeader}
          renderItem = {({item}) => (
              <ListItem 
                title = {`${item.firstName} ${item.lastName}`}
                subtitle = {item.companyName}
                rightTitle = "edit"
                avatar = 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'
                roundAvatar
                onPress= {() => this.props.navigation.navigate('EditBirthday',
                                          { birthday : item ,
                                            callBack : this.fetchAllBirthdays }) }
              />
            )
          }
          KeyExtractor = { item => item.id}
        />
      </List> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 40
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    padding: 20
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
