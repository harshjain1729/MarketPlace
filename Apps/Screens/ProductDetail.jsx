import { View, Text, Image, ScrollView, TouchableOpacity, Linking, Share, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import { collection, deleteDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../firebaseConfig';

export default function ProductDetail({navigation}) {
    const {params} = useRoute();
    const db = getFirestore(app);
    // const navigation = useNavigation();
    const[product, setProduct] = useState([]);
    const {user} = useUser();
    const nav = useNavigation();
    useEffect(()=>{
        console.log(params)
        params&&setProduct(params.product);
        shareButton();
    },[params, navigation]);

    const shareButton = () => {
        navigation.setOptions({
            headerRight: () => (
                    <Entypo name="share" size={24} 
                    onPress={()=>shareProduct()}
                    color="white" 
                style= {{marginRight:15}}/>
                
            ),
        });
    }
    const shareProduct=async()=>{
        // console.log("Share Clicked!!")
        const content = {
            message: product?.title+"\n"+product?.desc,

        }
        Share.share(content).then(resp=>{
            console.log(content)
        },(error)=>{
            console.log(error)
        }
        )
    }
    const deleteUserPost = ()=>{
      Alert.alert('Do you want to delete the post?','Do you really want to delete this post?', [
        {
          text:'Yes',
          onPress:()=>{
          deleteFromFirestore()
          }
        },
        {
          text:'cancel',
          onPress:()=> console.log('cancel pressed'),
          style:'cancel'
        }
      ])
    }
    const deleteFromFirestore = async()=>{
      console.log('deleted')
      const q = query(collection(db,'UserPost'),where('title','==',product.title));
      const snapShot = await getDocs(q);
      snapShot.forEach(doc=>{
        deleteDoc(doc.ref).then(resp=>{
          console.log("Deleted the Doc");
          nav.goBack();
        })
      })
    }
    const sendEmailMessage = ()=>{
        const subject = 'Regarding ' + product.title;
        const body = "Hi " + product.userName+"\n\nI am interested in your product."
        Linking.openURL('mailto:'+product.userEmail +"?subject="+subject+"&body="+body)
    }
  return (
    <ScrollView className>
      <Image source={{uri:product.image}}
      className = "h-[350px] w-full"
      />
      <View className = "p-3">
        <Text className = "text-[24px] font-bold">{product?.title}</Text>
        < View className = "items-baseline"><Text className = "p-1 px-2 rounded-full mt-1 bg-blue-200 text-blue-500">{product?.category}</Text>
        </View>
        <Text className = "mt-3 text-[20px] font-bold">Description</Text>
        <Text className = "text-[16px] text-gray-500">{product?.desc}</Text>
      </View>
      <View className = "p-2 flex flex-row items-center gap-3 bg-blue-100 border-gray-400 mt-3">
        <Image source={{uri:product.userImage}}
        className = "w-12 h-12 rounded-full"/>
        <View >
            <Text className = "font-bold text-[18px]">{product.userName}</Text>
            <Text className = "text-gray-500">{product.userEmail}</Text>
        </View>
      </View>
      {user?.primaryEmailAddress?.emailAddress==product.userEmail?
      <TouchableOpacity
      onPress={()=>deleteUserPost()} 
      className = "z-40 bg-red-500  p-4 m-5 rounded-full">
        <Text className = "text-center text-white">Delete Post</Text>
      </TouchableOpacity>
      :
      <TouchableOpacity
      onPress={()=>sendEmailMessage()} 
      className = "z-40 bg-blue-500  p-4 m-5 rounded-full">
        <Text className = "text-center text-white">Send Message</Text>
      </TouchableOpacity>
      }
    </ScrollView>
  )
}