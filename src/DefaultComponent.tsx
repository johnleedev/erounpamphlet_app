import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from './Components/Typography';
import { SubTitle } from './Components/SubTitle';


export default function DefaultComponent(props:any) {
  return (
    <View style={styles.container}>

      <SubTitle title='Default' navigation={props.navigation}/>

      <View style={styles.section}>
        <Typography>df</Typography>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding:20
  }
})