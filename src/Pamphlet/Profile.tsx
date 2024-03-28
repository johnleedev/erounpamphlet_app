import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Image  } from 'react-native';
import { Typography } from '../Components/Typography';
import { SubTitle } from '../Components/SubTitle';
import MainImageURL from '../../MainImageURL';
import axios from 'axios';
import MainURL from "../../MainURL";
import Loading from '../Components/Loading';

export default function Profile(props:any) {

  interface PostProps {
    pamphletID: number;
    playerName : string;
    part : string;
    imageName : string;
    career : [string] | string;
    isStyleWrite : string;
  }

  const [postData, setPostData] = useState<PostProps[]>([]);
  const fetchPosts = () => {
    axios.get(`${MainURL}/pamphlets/profiles/${props.route.params.pamphletID}`).then((res) => {
      let copy: any = [...res.data];
      copy.reverse();
      setPostData(copy);
    }).catch((error) => {
      console.error('게시물을 불러오는 중 오류 발생:', error);
    });
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    postData.length === 0
    ?  (
    <View style={{flex:1, width:'100%', height:'100%'}}>
      <Loading /> 
    </View>
    ) : ( 
    <View style={styles.container}>
      
      <SubTitle title='프로필' navigation={props.navigation}/>

      <ScrollView style={{flex:1}}>
        <View style={styles.section}>
          <View style={{marginVertical: 10}}>
          {
            postData?.map((item:any, index:any)=>{
              const careerCopy = item.isStyleWrite === "true" ? item.career : JSON.parse(item.career);
              return (
                <View key={item.id} style={{marginVertical:20}}>
                  
                  {/* 이름 */}
                  <View style={{flexDirection:'row', alignItems:'flex-end', marginBottom:10}}>
                    <Typography>{postData[index].part}</Typography>
                    <Typography>   </Typography>
                    <Typography fontSize={24}>{postData[index].playerName}</Typography>
                  </View>

                  {/* 사진 */}
                  {
                    item.imageName !== 'undefined' &&
                    <View style={{height:300, marginVertical:15}}>
                      <Image style={styles.image} source={{uri: `${MainImageURL}/images/pamphlet_player/${postData[index].imageName}`}}/>
                    </View>
                  }
                  {/* 경력 */}
                  <View>
                    {
                      item.isStyleWrite === "true"
                      ?
                      <Typography fontWeightIdx={2}>{careerCopy}</Typography>
                      :
                      careerCopy.map((item:any, index:any)=>{
                        return(
                          <Typography fontWeightIdx={2} key={index}>{item}</Typography>
                        )
                      })
                    }
                  </View>
                </View>
              )
            })
          }
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
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode:'cover'
  },
})