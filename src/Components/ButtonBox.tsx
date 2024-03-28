import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Typography } from './Typography';

export const ButtonBox :React.FC<{
    leftFunction: () => void;
    leftText: string,
    rightFunction: () => void;
    rightText: string,
    marginTop?: number,
    marginBottom? : number
}> = (props)=>{
    
  return (
    <View style={{flexDirection:'row', justifyContent:'center', marginTop: props.marginTop ?? null, marginBottom: props.marginBottom ?? null}}>
          
      <View style={styles.ButtonBox}>
        <TouchableOpacity 
          style={styles.Button} 
          onPress={props.leftFunction}>
          <Typography>{props.leftText}</Typography>
        </TouchableOpacity>
      </View>

      <View style={styles.ButtonBox}>
        <TouchableOpacity 
          style={styles.Button} 
          onPress={props.rightFunction}>
          <Typography>{props.rightText}</Typography>
        </TouchableOpacity>
      </View>

    </View>
  )
}


const styles = StyleSheet.create({
  ButtonBox: {
    width: '48%',
    alignItems:'center',
    marginBottom:20,
  },
  Button: {
    width: '90%',
    borderWidth:1, 
    borderColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 15,
    borderRadius: 10,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'center',
  },
})