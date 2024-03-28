import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { SubTitle } from '../Components/SubTitle';
import { Typography } from '../Components/Typography';
import MainImageURL from '../../MainImageURL';
import axios from 'axios';
import MainURL from "../../MainURL";
import Loading from '../Components/Loading';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncGetItem from '../AsyncGetItem';
import Clipboard from '@react-native-clipboard/clipboard';

export default function Detail(props:any) {

  interface PostProps {
    id: number;
    sort : string;
    title : string;
    location: string;
    date: string;
    time : string;
    place : string;
    address : string;
    superViser: string;
    suppoter : string;
    ticket: string;
    ticketReserve : string;
    quiry: string;
    imageName : string;
  }

  const [postData, setPostData] = useState<PostProps>();
  const fetchPosts = () => {
    axios.get(`${MainURL}/pamphlets/posts/${props.route.params.data.id}`).then((res) => {
      setPostData(res.data[0]);
      getPerformancelist(res.data[0].id)
    }).catch((error) => {
      console.error('게시물을 불러오는 중 오류 발생:', error);
    });
  };
  
 
  // favorList 데이터 가져오기
  const [isCheckFavor, setIsCheckFavor] = useState<boolean | null>(null);
  const getPerformancelist = async (id:number) => {
    const data = await AsyncGetItem();
    if (data) {
      axios
      .get(`${MainURL}/myperformance/getperformancelist/${data.userAccount}`)
      .then((res) => {
        if (res.data.find((e : any) => e === JSON.stringify(id))) {
          setIsCheckFavor(true);
        } else {
          setIsCheckFavor(false);
        }
      })
      .catch(() => {
        console.log('실패함')
      })
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);


  // myPerformance 입력&취소 토글
  const myPerformanceToggle = async () => {
    const data = await AsyncGetItem();
    if (data) {
      axios
      .post(`${MainURL}/myperformance/performancetoggle`, {
        userAccount : data.userAccount,
        pamphletID : postData?.id
      })
      .then((res) => {
        if (res.data) {
          setIsCheckFavor(!isCheckFavor);
        }        
      })
      .catch(() => {
        console.log('실패함')
      })
    }
  };

  // 링크 복사 함수
  const handleInviteEvent = async () => {
    Clipboard.setString('https://www.erounpamphlet')
    Alert.alert('이로운팜플렛 홈 링크가 복사되었습니다.')
  }  

  return (
    postData === undefined || isCheckFavor === null
    ?  (
    <View style={{flex:1, width:'100%', height:'100%'}}>
      <Loading /> 
    </View>
    ) : (
  
    <View style={styles.container}>

      <View style={styles.section}>
        <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity 
            style={{}}
            onPress={()=>{
              props.navigation.goBack();
            }}
            >
            <AntDesign name="left" size={30} color="#000" />
          </TouchableOpacity>
          <View style={{ flex: 1, paddingHorizontal: 15 }}>
            
          </View>
          <View style={{width: 110, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <TouchableOpacity 
              style={{}}
              onPress={()=>{
                props.navigation.navigate('LocationMap', {
                  place : postData.place,  address :  postData.address
                })
              }}
            >
              <Entypo name="location-pin" size={30} color="#03C75A" />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={handleInviteEvent}
              style={{}}>
              <Ionicons name="share-social-sharp" size={24} color="#8B8B8B" />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={myPerformanceToggle}
            >
              <AntDesign name="star" size={30} color={isCheckFavor ? "#FFDC23" : "#DFDFDF"} />
            </TouchableOpacity> 
          </View>
        </View>
      </View>
      
      <ScrollView style={{flex:1}}>

        {/* button box */}
        <View style={styles.section}>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonbox}
              onPress={()=>{
                props.navigation.navigate('Profile', {pamphletID : postData.id})
              }}
            >
              <Typography>프로필</Typography>
            </TouchableOpacity>
             <TouchableOpacity
              style={styles.buttonbox}
              onPress={()=>{
                props.navigation.navigate('Program', {pamphletID : postData.id})
              }}
            >
              <Typography>연주순서</Typography>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* 연주회 정보 */}
        <View style={styles.section}>
          <Typography>{postData.title}</Typography>
          <Typography fontSize={14} color='#555'>지역: {postData.location}</Typography>
          <Typography fontSize={12} color='#555'>날짜: {postData.date}</Typography>
          <Typography fontSize={12} color='#555'>시간: {postData.time}</Typography>
          <Typography fontSize={12} color='#555'>장소: {postData.place}</Typography>
          <Typography fontSize={12} color='#555'>주관/주최: {postData.superViser}</Typography>
          <Typography fontSize={12} color='#555'>후원: {postData.suppoter}</Typography>
          <Typography fontSize={12} color='#555'>티켓: {postData.ticket}</Typography>
          <Typography fontSize={12} color='#555'>티켓예매: {postData.ticketReserve}</Typography>
          <Typography fontSize={12} color='#555'>문의: {postData.quiry}</Typography>
        </View>

        {/* main poster */}
        <View style={styles.section}>
          <View style={{height:500}}>
           <Image style={styles.image} source={{uri: `${MainImageURL}/images/pamphlet_default/${postData.imageName}`}}/>
           
          </View>
        </View>

      </ScrollView>
      
    </View>
    )
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
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent:'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode:'cover'
  },
  buttonContainer: {
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between',
  },
  buttonbox: {
    width:'48%',
    height: 50,
    borderWidth:1,
    borderColor:'#BDBDBD',
    borderRadius: 5,
    alignItems:'center',
    justifyContent:'center'
  }
})