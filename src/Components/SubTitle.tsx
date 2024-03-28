import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { Typography } from './Typography';

export const SubTitle :React.FC<{
    navigation:any,
    title?: string,
    enTitle?: string,
    paddingHorizontal? : number,
    paddingVertical? : number
}> = (props)=>{
    
  return (
    <View style={[styles.contentTitleBox, {paddingHorizontal: props.paddingHorizontal ?? 20, paddingVertical : props.paddingVertical ?? 10}]}>
      <View style={{flex:1, alignItems:'flex-start'}}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={()=>{
            props.navigation.goBack()
          }}>
           <EvilIcons name="arrow-left" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{flex:2, alignItems:'center'}}>
        <Typography fontSize={22} fontWeight='bold'>{props.title}</Typography>
      </View>
      <View style={{flex:1, alignItems:'flex-end'}}>
        <Typography color='#C9AE00' fontSize={12} >{props.enTitle}</Typography>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  contentTitleBox : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent:'center',
  },
})