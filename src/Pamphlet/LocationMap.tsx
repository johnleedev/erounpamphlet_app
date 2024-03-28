import React, { useRef, useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { SubTitle } from '../Components/SubTitle';
import { useRoute } from '@react-navigation/native';
import NaverMapView, { Marker } from "react-native-nmap";
import axios from 'axios';
import { Typography } from '../Components/Typography';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function LocationMap(props:any) {

  const route : any = useRoute();
  const query = route.params.address;
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  const addressAPI = async () => {
    try {
      const res = await axios.get(`https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${query}`, {
        headers : {
          "X-NCP-APIGW-API-KEY-ID": "p0xl3fa4si",
          "X-NCP-APIGW-API-KEY": "iO5Yq3szE59M2GUCxQQbR0zCXt8cECudDfUpE17s",
        }
      });
      setLatitude(parseFloat(res.data.addresses[0].y));
      setLongitude(parseFloat(res.data.addresses[0].x));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    addressAPI();
  }, []);

  const P0 = {latitude: latitude, longitude: longitude};
  
  return (
    <View style={{flex:1, backgroundColor:'#fff'}}>
      
      <View style={styles.section}>
        <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <TouchableOpacity 
          style={{}}
          onPress={()=>{
            props.navigation.goBack();
          }}
          >
          <AntDesign name="left" size={30} color="#000" />
        </TouchableOpacity>
        <Typography>{route.params.place}</Typography>
        </View>
      </View>

      <View style={{flex:1}}>
        <NaverMapView 
          style={{width: '100%', height: '100%'}}
          showsMyLocationButton={true}
          center={{...P0, zoom: 16}}
        >
          <Marker 
            coordinate={P0} 
            caption={{color:'#fff', haloColor: '#E5625D', textSize: 20}}
          />
        </NaverMapView>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  section: {
    padding:20
  }
})