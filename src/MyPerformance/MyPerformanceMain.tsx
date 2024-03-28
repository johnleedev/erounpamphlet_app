import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, TouchableOpacity, LayoutAnimation, Platform, UIManager, Alert } from 'react-native';
import { Divider } from '../Components/Divider';
import { Title } from '../Components/Title';
import { Typography } from '../Components/Typography';
import Performance from './Performance';
import axios from 'axios';
import MainURL from "../../MainURL";
import { parse, parseISO, isBefore, isAfter } from 'date-fns';
import AsyncGetItem from '../AsyncGetItem';


function MyPerformanceMain(props : any) {

  // 스크롤뷰 리프레쉬
  const [refresh, setRefresh] = useState<boolean>(false);
  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 500);
  }, []);

  // 커스텀 탭 버튼
  const [currentTab, setCurrentTab] = useState(1);
 
  interface SelectMenuProps {
    tabNum : number;
    title: string;
  }
  
  const SelectMenu: React.FC<SelectMenuProps> = ({ tabNum, title}) => {
    
    return (
      <TouchableOpacity
        style={{width:100, padding: 10, alignItems:'center'}}
        onPress={() => setCurrentTab(tabNum)}
      >
        <Typography fontSize={14} color={currentTab === tabNum ? '#333' : '#8B8B8B'}>{title}</Typography>
        {
          currentTab === tabNum
          ? <View style={{width:70, height:2, backgroundColor:'#333', marginTop:10}}></View>
          : <View style={{width:70, height:2, backgroundColor:'#fff', marginTop:10}}></View>
        }
      </TouchableOpacity>
    )    
  };


  // 개인 연주회 데이터 --------------------------------------------------------------

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

  const [lastPerformanceList, setLastPerformanceList] = useState<PostProps[]>([]);
  const [expectedPerformanceList, setExpectedPerformanceList] = useState<PostProps[]>([]);
  const getUserFavorList = async() =>{
    const data = await AsyncGetItem();
    if (data) {
      try{
        const res = await axios.get(`${MainURL}/myperformance/getperformancelist/${data.userAccount}`);
        getPamphletData(res.data)
      }catch(err){
        console.log(err);
      }
    }
  }
 
  const getPamphletData = async( list : any) =>{
    try{
      const res = await axios.get(`${MainURL}/pamphlets/postsall`);
      const performanceData = res.data.filter((item:any) => list.includes(item.id.toString()));
      const currentDate = new Date();
      const dateLast = performanceData.filter((item:any) => isBefore(parse(item.dateOrigin, 'yyyy.MM.dd', new Date()), currentDate));
      const dateExpected = performanceData.filter((item:any) => isAfter(parse(item.dateOrigin, 'yyyy.MM.dd', new Date()), currentDate));
      dateLast.reverse();
      setLastPerformanceList(dateLast);
      setExpectedPerformanceList(dateExpected);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(()=>{
    getUserFavorList();
  }, [refresh]);


  return (
    <View style={styles.container}>
      <Title title='나의공연' enTitle='MyPerformance' />

      <View style={{paddingHorizontal:10, flexDirection: 'row', alignItems: 'center'}}>
        <SelectMenu tabNum={1} title='참석한공연'/>
        <SelectMenu tabNum={2} title='참석예정공연'/>
      </View>
      <Divider height={2} marginVertical={5}/>

      <ScrollView 
        style={{flex:1}}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      >
        {currentTab === 1 && <Performance refresh={refresh} setRefresh={setRefresh}
                                navigation={props.navigation} data={lastPerformanceList} sort={'last'}/>}
        {currentTab === 2 && <Performance refresh={refresh} setRefresh={setRefresh}
                                navigation={props.navigation} data={expectedPerformanceList} sort={'expected'}/>}
      </ScrollView>

     
    </View> 
   );
}
export default MyPerformanceMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding:20
  },
  searchInput: {
    flex: 1,
    height: 30,
    margin: 12,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5
  },
  noticeBox : {
    height: 270,
    paddingVertical: 20,
  },
  slide: {
    alignItems: 'center',
  },
  img: {
    height: 210,
    width: 320,
    resizeMode:'contain',
  },
  newPostButton: {
    width:50,
    height:50,
    borderRadius: 25,
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#000',
    padding: 12,
    alignItems: 'center',
    justifyContent:'center'
  },
  button: {
    borderWidth:1,
    borderColor: '#8C8C8C',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
});