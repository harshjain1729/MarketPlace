import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { query, collection, getFirestore, where, getDocs } from 'firebase/firestore'
import { app } from '../../firebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import LatestItemList from '../Components/HomeScreen/LatestItemList';

export default function MyProducts() {
  const db = getFirestore(app);
  const {user} = useUser();
  const[productList, setProductsList] = React.useState([])
  useEffect (()=>{
    user&&getUserPost();
  },[user])
  const getUserPost= async()=>{
    setProductsList([]);
    const q = query(collection(db, 'UserPost'),where('userEmail', '==',user?.primaryEmailAddress?.emailAddress));
    const snapshot = await getDocs(q);
    snapshot.forEach(doc=>{
      // console.log(doc.data());
      setProductsList(productList=>[...productList,doc.data()]);
    })
  }
  return (
    <View>
      <LatestItemList latestItemList={productList} 
      userProduct = {true}
      />
    </View>
  )
}