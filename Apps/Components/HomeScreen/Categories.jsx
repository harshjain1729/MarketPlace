import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function Categories({categoryList}) {
  console.log(categoryList);
  const navigation= useNavigation();
  return (
    <View className = "mt-3">
      <Text className = "font-bold text-[20px]">Categories</Text>
      <FlatList
      data = {categoryList}
      numColumns={3}
      renderItem={({item, index})=>(
        <TouchableOpacity onPress={()=>navigation.navigate('itemList', {
          category:item.Name
        })} className = "flex-1 item-center justify-center p-2 border-[1px] border-gray-300 m-1 h-[80px] rounded-lg bg-blue-50">
          <Image source = {{uri:item.icon}}
          className = "w-[40px] h-[40px]"
          />
          <Text className = "text-[12px] mt-1 justify-center">{item.Name}</Text>
        </TouchableOpacity>
      )}
      />
    </View>
  )
}