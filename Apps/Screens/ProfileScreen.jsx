import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import diary from './../../assets/images/diary.png';
import logout from './../../assets/images/logout.png';
import explore from './../../assets/images/explore.png';
import { useNavigation } from '@react-navigation/native';



export default function ProfileScreen() {
  const {user} = useUser();
  const navigation = useNavigation();
  const { isLoaded,signOut } = useAuth();
  const menuList = [
    {
      id:1,
      name:'My Products',
      icon:diary,
      path:'my-product'
    },
    {
      id:2,
      name:'Explore',
      icon:explore,
      path:'explore'
    },
    {
      id:3,
      name:'Logout',
      icon:logout
    }
  ]
  const onMenuPress = (item)=>{
    if(item.name=='Logout'){
      signOut();
      return;
    }
    item?.path?navigation.navigate(item.path):null;
  }
  return (
    <View>
      {/* <Text>{user?.fullName}</Text> */}
      <View className = "items-center mt-20">
      <Image source = {{uri:user?.imageUrl}}
      className = "w-[100px] h-[100px] rounded-full" />
      <Text className = "font-bold text-[25px] mt-2">{user?.fullName}</Text>
      <Text className = "text-[16px] mt-1 text-gray-500">{user?.primaryEmailAddress?.emailAddress}</Text>
      </View>
      <FlatList
      data = {menuList}
      numColumns={2}
      style = {{marginTop:20}}
      renderItem = {({item, index})=>(
        <TouchableOpacity 
        onPress={()=>onMenuPress(item)}
        className = "flex-1 p-5 border-[1px] items-center m-4 rounded-lg border-blue-400 bg-blue-50">
          <Image source={item?.icon}
          className = "w-[50px] h-[50px]"/>
          <Text>
            {item.name}
          </Text>
        </TouchableOpacity> 
      )}
      />
    </View>
  )
}