import { View, Text } from 'react-native'
import React, { useEffect ,useState} from 'react'
import { collection,getDocs,getFirestore,query,orderBy } from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import LatestItemList from '../Components/HomeScreen/LatestItemList';

export default function ExploreScreen() {
  const db = getFirestore(app);
  const [productList, SetProductList] = useState([]);
  useEffect(()=>{
    getAllProducts();
  },[])
  
  // Get all the documents in the "posts" collection.
  const getAllProducts=async()=>{
    SetProductList([]);
    const q = query(collection(db,'UserPost'))
    const snapshot = await getDocs(q)
    snapshot.forEach((doc)=>{
      // console.log(doc.data());
      SetProductList(productList=>[...productList, doc.data()]);
    })
  }
  return (
    <View className = "p-5 py-8">
      <Text className = "text-[30px] font-bold">Explore More</Text>
      <LatestItemList latestItemList={productList}/>
    </View>
  )
}