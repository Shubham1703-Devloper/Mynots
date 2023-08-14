import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Dashbord from '../Screens/Dashbord';
import AddItem_EditItem from '../Screens/AddItem_EditItem';
import Profile from '../Screens/Profile';
import Download from '../Screens/Download';
const Stack = createStackNavigator();
const Auth = Props => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashbord">
        <Stack.Screen
          name="Dashbord"
          component={Dashbord}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddItem_EditItem"
          component={AddItem_EditItem}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: true}}
        />

        <Stack.Screen
          name="Download"
          component={Download}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Auth;
