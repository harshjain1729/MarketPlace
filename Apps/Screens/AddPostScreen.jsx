import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Image, ToastAndroid, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getFirestore, getDocs, collection } from "firebase/firestore";
import {app} from '../../firebaseConfig';
import { Formik } from 'formik';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { addDoc } from "firebase/firestore";
import { useUser } from '@clerk/clerk-expo';
import { ActivityIndicator} from 'react-native';

export default function AddPostScreen() {
  const [image, setImage] = useState(null);
  const db = getFirestore(app);
  const storage = getStorage();
  const {user} = useUser();
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    getCategoryList();
  },[])
  const getCategoryList = async()=>{
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db,'Category'));

    querySnapshot.forEach((doc)=>{
      // console.log("HI");
      console.log("Docs:",doc.data());
      setCategoryList(categoryList=>[...categoryList,doc.data()])
    })
  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmitMetod=async(value)=>{
    setLoading(true);

    const resp = await fetch(image);
    const blob = await resp.blob();
    const storageRef = ref(storage, 'communityPost/'+Date.now()+'.jpg');

    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    }).then((resp)=>{
      getDownloadURL(storageRef).then(async(downloadUrl)=>{
        console.log(downloadUrl)
        value.image = downloadUrl,
        value.userName = user.fullName,
        value.userEmail = user.primaryEmailAddress.emailAddress;
        value.userImage = user.imageUrl;
        const docRef = await addDoc(collection(db, "UserPost"), value);
        if(docRef.id){
          setLoading(false);
          Alert.alert("Successfully posted!");
        }
      })
    });

  }
  return (
    <KeyboardAvoidingView>
    <ScrollView className="p-10">
      <Text className = "text-[20px] font-bold">Add New Post</Text>
      <Text className = "text-[16px] text-grey-500 mb-10">Create new Post and Start Selling</Text>
      <Formik
        initialValues={{ title: '', desc: '', category: '', address: '', price: '', image: '',userName: '', userEmail:'', userImage:'', createdAt: Date.now() }}
        onSubmit={(value)=>onSubmitMetod(value)}
        validate={(values)=>{
          const errors = {}
          if(!values.title){
            console.log("Title is not given");
            ToastAndroid.show('Title must be there',ToastAndroid.SHORT);
            errors.name = "Title must be there";
          }
          return errors 
        }}>
        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue ,errors }) => (
          <View>
            <TouchableOpacity onPress={pickImage}>
              {image?
              <Image source={{uri:image}} style= {{width:100,height:100}}/>
            :
            <Image source={require('./../../assets/images/image.png')}
            style= {{width:100,height:100}}
            />}
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={values?.title}
              onChangeText={handleChange('title')}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={values?.desc}
              numberOfLines = {5}
              onChangeText={handleChange('desc')}
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              value={values?.price}
              keyboardType='number-pad'
              onChangeText={handleChange('price')}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={values?.address}
              onChangeText={handleChange('address')}
            />
            <View style = {{borderWidth:1,borderRadius:10,marginTop:5}}>
              <Picker
              selectedValue={values?.category}
              className = "border-2"
              onValueChange={itemvalue=>setFieldValue('category',itemvalue)}
              >
                {categoryList&&categoryList.map((item, index)=>(
                  <Picker.Item key={index} label={item?.Name} value={item?.Name} />
                ))}
              </Picker>
            </View>
            {/* <Button onPress={handleSubmit} title="Submit" className = "mt-7"/> */}
            <TouchableOpacity onPress={handleSubmit} 
            style = {{
              backgroundColor:loading?'#ccc':'#007BFF'
            }}
            disabled= {loading}
            className='p-4 bg-blue-500 rounded-full mt-5'>
              {loading?
              <ActivityIndicator size="small" color="#fff" animating={true}/>
              :
              <Text className = "text-center text-white text-[16px]">Submit</Text>
            }
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  input:{
    borderWidth:1,
    borderRadius:10,
    padding:10,
    paddingTop:15,
    marginTop:10,
    marginBottom:5,
    fontSize:16,
    paddingHorizontal:17,
    textAlignVertical:'top',
  }
})