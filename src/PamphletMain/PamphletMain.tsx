import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { Typography } from '../Components/Typography';
import axios from 'axios';
import MainURL from "../../MainURL";
import MainImageURL from '../../MainImageURL';
import Feather from 'react-native-vector-icons/Feather';

export default function PamphletMain(props:any) {


  interface PostProps {
    id: number;
    location: string;
    sort : string;
    title : string;
    date: string;
    time : string;
    place : string;
    imageName : string;
  }

  // 게시판 글 가져오기
  const [postlist, setPostlist] = useState<PostProps[]>([]);
  const fetchPosts = () => {
    axios.get(`${MainURL}/pamphlets/postsall`).then((res) => {
      let copy: any = [...res.data];
      copy.reverse();
      setPostlist(copy);
    });
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);


  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <View style={[styles.flexBox]}>
          <Image style={styles.logo} source={require('../images/icon.png')} resizeMode='cover'/>
          {/* <TouchableOpacity 
            style={[styles.flexBox]}
            onPress={()=>{Alert.alert('click')}}
          >
            <Typography fontSize={14} fontWeightIdx={1} color='#3D3D3D'>전체</Typography>
            <MaterialIcons style={{marginTop:1}}name="keyboard-arrow-down" size={19} color="#333333" />
          </TouchableOpacity> */}
        </View>
        <TouchableOpacity 
          onPress={()=>{
            Alert.alert('click')
              // props.navigation.navigate("SearchMain");
            }}
        >
          <Feather name="search" size={22} color="#333333" />
        </TouchableOpacity>
      </View>
      
      <View style={[styles.section, {flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between'}]}>
      {
        postlist.map((item:any, index:any)=>{
          return (
            <TouchableOpacity 
              key={index}
              style={{width:"48%", paddingBottom:5, marginBottom:10}} 
              onPress={()=>{
                props.navigation.navigate("Navi_Pamphlet", {screen:"Detail", params: { data : item }});
              }}
            >
              <View style={{width:'100%', height:250, marginBottom:10}}>
                <Image 
                  source={{uri: `${MainImageURL}/images/pamphlet_default/${item.imageName}`}}
                  style={{width: '100%', height: '100%', resizeMode: 'contain'}}
                />
              </View>
              <Typography fontSize={14} color='#555'>{item.location}</Typography>
              <Typography>{item.sort}</Typography>
              <Typography>{item.title}</Typography>
              <Typography fontSize={12} color='#555'>{item.date}</Typography>
              <Typography fontSize={12} color='#555'>{item.time}</Typography>
              <Typography fontSize={12} color='#555'>{item.place}</Typography>
            </TouchableOpacity>
          )
        }) 
      }
      </View>

      
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding:20
  },
  header:{
    paddingVertical:18,
    paddingHorizontal: 24,
    display:'flex',
    alignItems:'flex-start',
    justifyContent:'space-between',
    flexDirection:'row',
    backgroundColor:'#fff',
   },
  logo:{
    width:30,
    height:25,
  },
  flexBox: {
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
})