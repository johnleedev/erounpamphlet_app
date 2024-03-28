import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, Image, Platform, Alert, KeyboardAvoidingView } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { Typography } from '../Components/Typography';
import axios from 'axios';
import MainURL from "../../MainURL";
import AsyncSetItem from '../AsyncSetItem'

function Logister (props : any) {

  const routeDataSet = () => {
    if(props.route.params === null || props.route.params === undefined) {
      return
    } else {
      const routeData = props.route.params.data;
      setRouteDataCopy(routeData);
      setRefreshToken(routeData.refreshToken);
      setUserAccount(routeData.email);
      setUserURL(routeData.userURL);
      {
        routeData.name && setUserName(routeData.name);
      }
    }
  }

  useEffect(()=>{
    routeDataSet();
  }, [])

  const [routeDataCopy, setRouteDataCopy] = useState({});
  const [refreshToken, setRefreshToken] = useState('');
  const [userAccount, setUserAccount] = useState('');
  const [userName, setUserName] = useState('');
  const [userURL, setUserURL] = useState('');

  const [userAccountMessage, setUserAccountMessage] = useState('');
  const [isUserAccount, setIsUserAccount] = useState(false);
  const [userNameMessage, setUserNameMessage] = useState('');0
  const [isUserName, setIsUserName] = useState(false);

  const onChangeUserAccount = (text : any) => {
    const userNameRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    setUserAccount(text);
    if (!userNameRegex.test(text)) {
      setUserAccountMessage('email 형식이 올바르지 않습니다.');
      setIsUserAccount(false);
    } else {
      setUserAccountMessage('올바른 형식의 메일입니다.');
      setIsUserAccount(true);
    }
  };

  const onChangeUserName = (text : any) => {
    const userNameRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    setUserName(text);
    if (!userNameRegex.test(text)) {
      setUserNameMessage('한글로 입력해주세요.');
      setIsUserName(false);
    } else if (text.length < 2 || text.length > 5) {
      setUserNameMessage('2글자 이상 5글자 미만으로 입력해주세요.');
      setIsUserName(false);
    } else {
      setUserNameMessage('올바른 형식의 이름입니다.');
      setIsUserName(true);
    }
  };

  // 회원가입하기 함수
  const handleSignup = () => {
     
    axios
      .post(`${MainURL}/login/logisterdo`, {
        userData : routeDataCopy
      })
      .then((res) => {
        if (res.data === userAccount) {
          Alert.alert('회원가입이 완료되었습니다!');
          AsyncSetItem(refreshToken, userAccount, userName, userURL);
          props.navigation.navigate('Result');
        } else {
          Alert.alert('다시 시도해 주세요.');
        }
      })
      .catch(() => {
        console.log('실패함');
      });
  };
  
  const alertPageOut = () => { 
    Alert.alert('작성한 모든 내용이 지워집니다.', '나가시겠습니까?', [
      { text: '취소', onPress: () => { return }},
      { text: '나가기', onPress: () => handlePageOut() }
    ]);
  }

  const handlePageOut = () => {
    setUserAccount('');
    setUserName('');
    props.navigation.navigate("Login");
  };


  return (
    <View style={Platform.OS === 'android' ? styles.android : styles.ios}>

      <View style={styles.container}>
      
        <View style={{alignItems: 'center', marginVertical: 20, justifyContent: 'center'}}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={()=>{
              props.navigation.goBack();
            }}
            >
            <EvilIcons name="arrow-left" size={30} color="black" />
          </TouchableOpacity>
          <Typography>회원가입</Typography>
        </View>
        
        <View style={{flex:1, marginVertical: 20}}>
          <Typography fontSize={22} fontWeightIdx={2}>
            회원 가입을 위해{'\n'}
            다음 기본 정보를 확인해 주세요.
          </Typography>
        </View>
        
        <View style={{flex:2}}>
          <Typography color='#8C8C8C' fontWeightIdx={2}>이메일 주소 <Typography color='#E94A4A'>*</Typography></Typography>
          <View style={{flexDirection:'row'}}>
            <View style={{width:21, height:40, justifyContent:'flex-end'}}>
              { userURL === 'kakao' && <Image source={require('../images/login/kakao.png')} style={{width:20, height:20}}/>}
              { userURL === 'naver' && <Image source={require('../images/login/naver.png')} style={{width:20, height:20}}/>}
              { userURL === 'apple' && <Image source={require('../images/login/apple.png')} style={{width:20, height:20}}/>}
              { userURL === 'google' 
                && <View style={{alignItems: 'center', justifyContent: 'center', width: 20, height: 20,
                      marginHorizontal: 5, borderRadius:28, borderWidth:1, borderColor: '#BDBDBD'}} >
                  <Image source={require('../images/login/google.png')} 
                      style={{width: '40%', height: '40%', resizeMode:'center'}}/>
                  </View>}
            </View>
            <TextInput
              style={[styles.input, {width: '94%'}]}
              placeholder="e-mail"
              placeholderTextColor='#5D5D5D'
              onChangeText={onChangeUserAccount}
              value={userAccount}
            />
          </View>
          {userAccount.length > 0 && (
            <Text style={[styles.message, isUserAccount ? styles.success : styles.error]}>
              {userAccountMessage}
            </Text>
          )}

          <Typography color='#8C8C8C' fontWeightIdx={2}>이름 <Typography color='#E94A4A'>*</Typography></Typography>
          <TextInput
            style={[styles.input, {width: '100%'}]}
            placeholder="이름"
            placeholderTextColor='#5D5D5D'
            onChangeText={onChangeUserName}
            value={userName}
          />
          {userName.length > 0 && (
            <Text style={[styles.message, isUserName ? styles.success : styles.error]}>
              {userNameMessage}
            </Text>
          )}
        </View>
            
        {/* 하단 버튼 */}
        <TouchableOpacity 
            onPress={()=>{
              userAccount && userName
              ? handleSignup()
              : Alert.alert('모든 항목을 채워주세요')
            }}
            style={
              userAccount && userName ? [styles.nextBtnBox, { backgroundColor: 'black'}] 
              : [styles.nextBtnBox, { backgroundColor: 'gray'}]
            }
            >
            <Text style={styles.nextBtnText}>가입완료</Text>
        </TouchableOpacity>

        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={alertPageOut}>
            <Text style={styles.linkButton}>나가기</Text>
          </TouchableOpacity>
        </View>
              
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  android: {
    flex: 1,
    backgroundColor: '#333',
  },
  ios : {
    flex: 1,
    backgroundColor: '#333',
    paddingTop: getStatusBarHeight(),
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24
  },
  backButton: {
    position:'absolute',
    top: 0,
    left: 0,
    width: 30,
    height: 30,
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: '#DFDFDF',
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
    color: '#333'
  },  
  message: {
    marginBottom: 10,
  },
  success: {
    color: '#47C83E',
  },
  error: {
    color: '#F15F5F',
  },
  errorText: {
    color: '#F15F5F',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linksContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkButton: {
    color: '#333',
    textDecorationLine: 'underline',
  },
  nextBtnBox: {
    borderRadius: 16,
    width: '100%',
    marginBottom: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nextBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  }
});

export default Logister;
