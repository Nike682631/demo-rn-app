import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotificationsScreen from '../screens/NotificationsScreen';
import PhotoScreen from '../screens/PhotoScreen';
import TextScreen from '../screens/TextScreen';
import CalculatorScreen from '../screens/CalculatorScreen'
import Icon from 'react-native-vector-icons/AntDesign'
const Tab = createBottomTabNavigator();

const AppStack = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Notifications" component={NotificationsScreen}
          options={{
            tabBarLabel: 'Notifications',
            tabBarIcon: () => (
              <Icon name="bells" size={25} color="#666" />
            ),
          }} />
        <Tab.Screen name="Photos" component={PhotoScreen}
          options={{
            tabBarLabel: 'Photos',
            tabBarIcon: () => (
              <Icon name="picture" size={25} color="#666" />
            ),
          }} />
        <Tab.Screen name="Text" component={TextScreen}
          options={{
            tabBarLabel: 'edit',
            tabBarIcon: () => (
              <Icon name="bells" size={25} color="#666" />
            ),
          }} />
        <Tab.Screen name="Calculator" component={CalculatorScreen}
          options={{
            tabBarLabel: 'Calculator',
            tabBarIcon: () => (
              <Icon name="calculator" size={25} color="#666" />
            ),
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default AppStack
