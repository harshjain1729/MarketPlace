import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useRoute } from '@react-navigation/native';
import { collection, getDocs, getFirestore, query ,where} from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import LatestItemList from '../Components/HomeScreen/LatestItemList';

export default function ItemList() {
  const {params} = useRoute();
  const db = getFirestore(app);
  const [itemList, SetItemList] = useState([]);
  useEffect(()=>{
    console.log(params.category)
    params&&getItemListByCategory();
  },[params])

  const getItemListByCategory = async () => {
    SetItemList([]);
    const q = query(collection(db, 'UserPost'), where('category', '==', params.category));
    const snapShot = await getDocs(q);
    snapShot.forEach((doc) => {
      console.log("docs", doc.data());
      SetItemList((itemList) => [...itemList, doc.data()]);
    });
  };
  
  return (
    <View className = "p-2">
      {itemList.length>0?<LatestItemList latestItemList={itemList}
      heading = {'Explore Our Products'}/>
      :<Text className = "p-3 text-[15px] text-gray-400 justify-center text-center">No Post Found</Text>}
    </View>
  )
}