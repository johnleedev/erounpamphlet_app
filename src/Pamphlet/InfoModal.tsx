import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Typography } from '../Components/Typography';


export default function InfoModal (props : any) {

  // 커스텀 탭 버튼
 const [currentTab, setCurrentTab] = useState(1);
 
 interface SelectMenuProps {
   tabNum : number;
   title: string;
 }
 
 const SelectMenu: React.FC<SelectMenuProps> = ({ tabNum, title}) => {
   return (
     <TouchableOpacity
       style={{width:100, alignItems:'center', marginBottom:10, paddingTop:7}}
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


  return (
    <View style={{ width: '100%', position: 'absolute', bottom:0, borderRadius: 20, backgroundColor: 'white', padding: 20 }}>

      <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent:'space-between'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <SelectMenu tabNum={1} title='곡설명'/>
          {
            props.lyrics && 
            <SelectMenu tabNum={2} title='가사'/>
          }
        </View>
        <TouchableOpacity 
          onPress={props.infoToggleModal} 
          style={{width:'10%', padding:5}}
        >
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      

      <View style={{flexDirection:'row', alignItems: 'center', justifyContent:'space-between'}}>
        <View style={{width:'90%'}}>
          <Typography>{props.title}</Typography>
        </View>
      </View>

      <View style={{padding:10}}>
        {currentTab === 1 && <Typography fontWeightIdx={2}>{props.notice}</Typography>}
        {currentTab === 2 && <Typography fontWeightIdx={2}>{props.lyrics}</Typography>}
      </View>
      
    </View>
  )
    
};


const styles = StyleSheet.create({
  textBox: {
    flex: 1,
    paddingHorizontal: 15,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
  },
  HaveHouseNoticeSelectBox : {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 20,
    borderWidth: 1,
    borderColor : '#DFDFDF',
    borderRadius: 15
  },
  HaveHouseNoticeSelectTextRow : {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 15,
    backgroundColor : '#F5F4F3',
    borderRadius: 10,
    marginVertical: 7
  },

})