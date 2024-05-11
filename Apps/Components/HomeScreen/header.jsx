import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo';
import { FontAwesome } from '@expo/vector-icons';


export default function header() {
    const {user} = useUser();
  return (
    <View>
        <View className = "flex flex-row items-center gap-4">
        <Image source={{uri:user?.imageUrl}}
        className = "rounded-full w-12 h-12"
        />
        <View>
            <Text className = "text-[14px]">Welcome</Text>
            <Text className = "text-[18px] font-bold">{user?.fullName}</Text>
        </View>
        </View>

        <View className = "p-3 px-5 flex flex-row items-center bg-blue-50 rounded-full mt-3 border-[2px] border-blue-200">
        <FontAwesome name="search" size={24} color="grey"/>
            <TextInput placeholder = 'Search' className = "ml-2 text-[18px]" onChangeText={(value)=>console.log(value)}/>
        </View>
    </View>
  )
}