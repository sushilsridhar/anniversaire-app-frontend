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


export default class BirthdaysToday extends Component<Props> {

state = { birthdays: [] };

  componentDidMount() {
    this.fetchBirthdaysToday();
  }

  fetchBirthdaysToday = () => {
    fetch(resourceURL+'/today',  {
        headers: {
            'Authorization': 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=',
            'Accept':       'application/json'
        }
    })
      .then(response => {
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
    header: null
  }

  renderHeader = () => {
    return <Text style={styles.welcome}>Bon anniversaire</Text>
  }

  renderFooter = () => {
    return(
         <View style={styles.container}>
            <Button
                 onPress={this.fetchBirthdaysToday}
                 title="View Today's Birthday"
            />
            <Button
               onPress={() => this.props.navigation.navigate('ViewBirthdays')}
               title="View All Birthdays"
            />
            <Button
               onPress={() => this.props.navigation.navigate('AddBirthdays', { callBack : this.fetchBirthdaysToday })}
               title="Add New Birthday"
            />
         </View>
    ); 
  }

  render() {
    return (
      <List> 
        <FlatList 
          data={this.state.birthdays}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          renderItem = {({item}) => (
              <ListItem 
                title = {`${item.firstName} ${item.lastName}`}
                subtitle = {item.companyName}
                rightTitle = {`${item.age}th Birthday`}  
                avatar = 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
                roundAvatar
              />
            )}
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
