import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import home from '../screens/home';
import meeting from '../screens/meeting';
import file from '../screens/file';
import profile from '../screens/profile';

const HomeStack = createStackNavigator({
  Home: home,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  ),
};

const MeetingStack = createStackNavigator({
  Meeting: meeting,
});

MeetingStack.navigationOptions = {
  tabBarLabel: 'Meeting',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'}
    />
  ),
};

const FileStack = createStackNavigator({
  File : file,
});

FileStack.navigationOptions = {
  tabBarLabel: 'File',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-folder' : 'ios-folder-open'}
    />
  ),
};

const ProfileStack = createStackNavigator({
  Profile : profile,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'md-person' : 'md-person'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  MeetingStack,
  FileStack,
  ProfileStack
});
