import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function PostItem({item}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity className = "flex-1 m-2 p-2 rounded-lg border-[1px] border-slate-300"
    onPress={() => navigation.push('product-detail', {
      product:item
    })}>
          <Image source = {{uri:item.image}}
          className = "w-full h-[120px] rounded-lg"
          />
          <Text className = "text-[13px] font-bold mt-2" >{item.title}</Text>
          <Text className = "text-[17px] font-bold text-blue-500">₹ {item.price}</Text>
          <Text className = "text-blue-500 bg-blue-200 p-2 rounded-full px-3 m-1 text-[10px] w-[89px] text-center">{item.category}</Text>
        </TouchableOpacity>
  )
}