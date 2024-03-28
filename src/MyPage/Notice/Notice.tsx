import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import MainURL from "../../../MainURL";
import { Typography } from '../../Components/Typography';
import { SubTitle } from '../../Components/SubTitle';
import { Divider } from '../../Components/Divider';
import DateFormmating from '../../Components/DateFormmating';

const Stack = createNativeStackNavigator();

const NoticeDetail = ({ route, navigation } : any) => {
  
  const data = route.params.data;

  return (
    <View style={styles.container}>
      <View style={styles.noticeContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="x" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Typography fontSize={18} marginBottom={10}>{data.title}</Typography>
        <Typography fontSize={12} color='#8C8C8C'>{DateFormmating(data.date)}</Typography>
        <Divider height={2} marginVertical={10}/>
        <Typography marginBottom={4}>{data.content}</Typography>
      </View>
    </View>
  );
};

const Notice = () => {

  const [data, setDate] = useState<any>([]);

  const getNotice = () => {
    axios
    .get(`${MainURL}/notice/noticelist`)
    .then((res) => {
      let copy: any = [...res.data];
      copy.reverse();
      setDate(copy);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  useEffect(() => {
    getNotice();
  }, []);

  const NoticeList = ( props :any) => {
    return (
      <View style={styles.container}>
        <SubTitle title='공지사항' enTitle='Notice' navigation={props.navigation}/>
        <Divider height={2}/>
        <View style={styles.section}>
        {
          data.map((item:any, index:any)=>{
            return(
              <TouchableOpacity
                key={index}
                style={styles.item}
                onPress={() => props.navigation.navigate('NoticeDetail', { data : item })}
              >
                <View style={styles.itemIconContainer}>
                  <Feather name="info" size={24} color="gray" />
                </View>
                <View style={styles.itemContent}>
                  <Typography fontSize={18} marginBottom={4}>{item.title}</Typography>
                  <Typography fontSize={14} marginBottom={4}>{DateFormmating(item.date)}</Typography>
                </View>
              </TouchableOpacity>
            )
          })
        }
        </View>
      </View>
    );
  };

  return (
    <Stack.Navigator 
      initialRouteName="NoticeList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="NoticeList" component={NoticeList}/>
      <Stack.Screen name="NoticeDetail" component={NoticeDetail}/>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor:'#fff',
  },
  section: {
    padding:20
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    marginVertical: 1,
    borderRadius: 8,
  },
  itemIconContainer: {
    marginRight: 16,
  },
  itemContent: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  noticeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  
});

export default Notice;
