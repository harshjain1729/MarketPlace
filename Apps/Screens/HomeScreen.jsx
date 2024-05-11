import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/HomeScreen/header';
import Slider from '../Components/HomeScreen/Slider';
import Categories from '../Components/HomeScreen/Categories' 
import { getFirestore } from "firebase/firestore";
import {app} from '../../firebaseConfig';
import { getDocs, collection } from "firebase/firestore";
import LatestItemList from '../Components/HomeScreen/LatestItemList';

export default function HomeScreen() {
  const db = getFirestore(app);
  const [sliderList, setSliderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [latestItemList, setLatestItemList] = useState([]);
  useEffect(()=>{
    getSliders();
    getCategoryList();
    getLatestItemList();
  },[])

  const getSliders=async()=>{
    setSliderList([])
    const querySnapshot = await getDocs(collection(db, "Slider"));
    querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    setSliderList(sliderList=>[...sliderList,doc.data()])
});
  }
  
  const getCategoryList = async()=>{
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db,'Category'));

    querySnapshot.forEach((doc)=>{
      // console.log("HI");
      console.log("Docs:",doc.data());
      setCategoryList(categoryList=>[...categoryList,doc.data()])
    })
  }

  const getLatestItemList = async()=>{
    setLatestItemList([]);
    const querySnapshot1 = await getDocs(collection(db,'UserPost'));

    querySnapshot1.forEach((doc)=>{
      // console.log("HI");
      console.log("Docs:",doc.data());
      setLatestItemList(latestItemList=>[...latestItemList,doc.data()])
    })
  }

  return (
    <ScrollView className = "py-12 px-6">
      <Header/>
      <Slider sliderList = {sliderList}/>
      <Categories categoryList = {categoryList}/>
      <LatestItemList latestItemList = {latestItemList}
      heading={'Latest Items'}/>
    </ScrollView>
  )
}