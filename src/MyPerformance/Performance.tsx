import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { Typography } from '../Components/Typography';
import MainImageURL from '../../MainImageURL';
import axios from 'axios';
import MainURL from "../../MainURL";
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncGetItem from '../AsyncGetItem';

export default function Performance (props: any) {

  const [settingView, setSettingView] = useState<boolean>(false);
  const [selectedDeleteBoolean, setSelectedDeleteBoolean] = useState(Array(props.data.length).fill(false));  
  const [selectedDeleteList, setSelectedDeleteList] = useState<string[]>([]);
  const [selectedDeleteAll, setSelectedDeleteAll] = useState<boolean>(false);

  const selectDelete = (index : any) => {
    const updatedSelections = [...selectedDeleteBoolean];
    updatedSelections[index] = !updatedSelections[index];
    setSelectedDeleteBoolean(updatedSelections);
    
    const selectedDeleteCopy = 
      props.data
        .filter((_:any, i:any) => updatedSelections[i])
        .map((item:any) => (JSON.stringify(item.id)));
      setSelectedDeleteList(selectedDeleteCopy);
  };
  

  // 선택 매물 삭제하기
  const performanceDelete = async () => {
    const data = await AsyncGetItem();
    axios
      .post(`${MainURL}/myperformance/performancedelete`, {
        userAccount : data?.userAccount,
        selectedDeleteList : selectedDeleteList
      })
      .then((res) => {
        if (res.data) {
          Alert.alert('삭제되었습니다.');
          setSelectedDeleteBoolean(Array(props.data.length).fill(false));
          props.setRefresh(!props.refresh);
        }        
      })
      .catch(() => {
        console.log('실패함')
      })
  };

  // 매물 전체선택
  const selectAllPerformanceList = () => {
    if (selectedDeleteAll) {
      setSelectedDeleteAll(false)
      setSelectedDeleteBoolean(Array(props.data.length).fill(false));
      setSelectedDeleteList([]);
    } else {
      setSelectedDeleteAll(true)
      setSelectedDeleteBoolean(Array(props.data.length).fill(true));
      const selectedDeleteAll =  props.data.map((item:any) => (JSON.stringify(item.id)));
      setSelectedDeleteList(selectedDeleteAll);
    }
  };

   // 편집취소
  const settingCancel = () => {
    setSettingView(false)
    setSelectedDeleteBoolean(Array(props.data.length).fill(false));
    setSelectedDeleteList([]);
  };

  return (
    <ScrollView style={styles.container}>
       {
        settingView
        ?
        <View style={[styles.section, {flexDirection:'row', justifyContent:'space-between', alignItems:'center'}]}>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity
              style={{marginRight:10}}
              onPress={selectAllPerformanceList}
            >
              <View style={{padding:3, borderWidth:1,  borderRadius:5}}>
                <Typography fontSize={14} fontWeightIdx={1}>전체선택</Typography>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={performanceDelete}
            >
              <View style={{padding:3, borderWidth:1,  borderRadius:5}}>
                <Typography fontSize={14} fontWeightIdx={1}>선택삭제</Typography>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={settingCancel}
          >
            <View style={{padding:3, borderWidth:1,  borderRadius:5, borderColor:'#E5625D'}}>
              <Typography fontSize={14} fontWeightIdx={1} color='#E5625D'>편집취소</Typography>
            </View>
          </TouchableOpacity>
        </View>
        :
        <View style={[styles.section, {flexDirection:'row', justifyContent:'space-between', alignItems:'center'}]}>
          <Typography>전체 <Typography color='#E5625D'>{props.data.length}</Typography>건</Typography>
          <TouchableOpacity
            onPress={()=>{setSettingView(true)}}
          >
            <View style={{padding:3, borderWidth:1,  borderRadius:5}}>
              <Typography fontSize={14} fontWeightIdx={1}>편집</Typography>
            </View>
          </TouchableOpacity>
        </View>
      }
      {
        props.data.length > 0
        ?
        <View style={[styles.section]}>
          {
            props.data?.map((item:any, index:any)=>{
              const isSelected = selectedDeleteBoolean[index];
              return (
                <TouchableOpacity 
                  key={index}
                  style={{flexDirection:'row', height:150, marginBottom:10}}
                  onPress={()=>{
                    props.navigation.navigate("Navi_Pamphlet", {screen:"Detail", params: { data : item }});
                  }}
                >
                  <View style={{width:'30%', height:150, marginRight:5}}>
                    <Image 
                      source={{uri: `${MainImageURL}/images/pamphlet_default/${item.imageName}`}}
                      style={{width: '100%', height: '100%', resizeMode: 'contain'}}
                    />
                  </View>
                  <View style={{width:'60%', padding:10}}>
                    <Typography fontSize={14} color='#555'>{item.location}</Typography>
                    <Typography>{item.sort}</Typography>
                    <Typography>{item.title}</Typography>
                    <Typography fontSize={12} color='#555'>{item.date}</Typography>
                    <Typography fontSize={12} color='#555'>{item.time}</Typography>
                    <Typography fontSize={12} color='#555'>{item.place}</Typography>
                  </View>
                  {
                    settingView 
                    &&
                    <TouchableOpacity
                      style={{width:'10%', justifyContent:'center'}}
                      onPress={()=>{
                        selectDelete(index);
                      }}
                    >
                      <View style={{padding:5, backgroundColor:'#fff'}}>
                        <AntDesign name={isSelected ? 'checkcircle' : 'checkcircleo'} size={18} color={isSelected ? '#E5625D' : '#BDBDBD'}/>
                      </View>
                    </TouchableOpacity>
                  }
                </TouchableOpacity>
              )
            }) 
          }
        </View>
        :
        <View style={[styles.section, {flexDirection:'row', justifyContent:'center'}]}>
          { props.sort === 'last' && <Typography>참석한 연주회가 없습니다</Typography> }
          { props.sort === 'expected' && <Typography>참석 예정 연주회가 없습니다</Typography> }
        </View>
      }
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

