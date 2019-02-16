import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EventList from './EventList';
import EventForm from './EventForm';
import { YellowBox } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
]);


const RootStack = createStackNavigator(
  {
    List: {
      screen: EventList,
      navigationOptions: () => ({
        title: 'Your Events',
      })
    },
    Form: {
      screen: EventForm,
      navigationOptions: () => ({
        title: 'add an event'
      })
    }
  },
  {
    initialRouteName: 'List'
  }

);

const AppContainer = createAppContainer(RootStack);

export default AppContainer;

// export default createStackNavigator({
//   list:{
//     screen: EventList,
//     navigationOptions: () => ({
//       title: 'Your Events',
//     })
//   },
//   form: {
//     screen: EventForm,
//     navigationOptions: () => ({
//       title: 'add an event'
//     })
//   }
// });

