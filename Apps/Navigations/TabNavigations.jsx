import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import ExploreScreen  from '../Screens/ExploreScreen';
import AddPostScreen from '../Screens/AddPostScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import HomeScreenStackNav from './HomeScreenStackNav';
import ExploreScreenStackNav from './ExploreScreenStackNav';
import ProfileScreenStackNav from './ProfileScreenStackNav';

const Tab = createBottomTabNavigator();
export default function TabNvigations() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown:false
    }}>
      <Tab.Screen name="Home-tab" component = {HomeScreenStackNav} 
      options={
        {
          tabBarLabel:({color})=>(
            <Text style = {{color:color, fontSize:12, marginBottom:3}}>Home</Text>
          ),
          tabBarIcon:({color, size}) =>(
            <FontAwesome name="home" size={size} color={color} />
          ),
        }
      }></Tab.Screen>
      <Tab.Screen name="Explore" component = {ExploreScreenStackNav}
      options={
        {
          tabBarLabel:({color})=>(
            <Text style = {{color:color, fontSize:12, marginBottom:3}}>Explore</Text>
          ),
          tabBarIcon:({color, size}) =>(
            <FontAwesome name="search" size={size} color={color} />
          ),
        }
      }></Tab.Screen>
      <Tab.Screen name="AddPost" component = {AddPostScreen}
      options={
        {
          tabBarLabel:({color})=>(
            <Text style = {{color:color, fontSize:12, marginBottom:3}}>Post</Text>
          ),
          tabBarIcon:({color, size}) =>(
            <FontAwesome name="camera" size={size} color={color} />
          ),
        }
      }></Tab.Screen>
      <Tab.Screen name="Profile" component = {ProfileScreenStackNav}
      options={
        {
          tabBarLabel:({color})=>(
            <Text style = {{color:color, fontSize:12, marginBottom:3}}>Profile</Text>
          ),
          tabBarIcon:({color, size}) =>(
            <Ionicons name="person-circle" size={size} color={color} />
          ),
        }
      }></Tab.Screen>
    </Tab.Navigator> 
  )
}