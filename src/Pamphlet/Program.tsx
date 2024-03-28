import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Typography } from '../Components/Typography';
import { SubTitle } from '../Components/SubTitle';
import MainImageURL from '../../MainImageURL';
import axios from 'axios';
import MainURL from "../../MainURL";
import Loading from '../Components/Loading';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import InfoModal from './InfoModal';


export default function Program(props:any) {

  interface programProps {
    number : number,
    composition: string[],
    songName: string[]
  }
  
  interface subProgramProps {
    programNumber : number,
    songName : string[]
  }

  interface NoticeProps {
    programNumber : number,
    notice : string
  }
  interface LyricsProps {
    programNumber : number,
    lyrics : string
  }

  const [programData, setProgramData] = useState<programProps[]>([]);
  const [subProgramData, setSubProgramData] = useState<subProgramProps[]>([]);
  const [noticeData, setNoticeData] = useState<NoticeProps[]>([]);
  const [lyricsData, setLyricsData] = useState<LyricsProps[]>([]);

  const fetchPosts = () => {
    axios.get(`${MainURL}/pamphlets/program/${props.route.params.pamphletID}`).then((res) => {
      let copy = res.data[0];
      const programData = JSON.parse(copy.program);
      setProgramData(programData);
      const subProgramData = JSON.parse(copy.subProgram);
      setSubProgramData(subProgramData);
      const noticeData = JSON.parse(copy.notice) || [];
      setNoticeData(noticeData);
      const lyricsData = JSON.parse(copy.lyrics) || [];
      setLyricsData(lyricsData);
    }).catch((error) => {
      console.error('게시물을 불러오는 중 오류 발생:', error);
    });
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);

  // 인포 버튼 모달
  const [infoModalVisible, setInfoModalVisible] = useState<boolean>(false);
  const [selectedProgramInfo, setSelectedProgramInfo] = useState<any>(null);

  const infoToggleModal = (selectedInfo: any) => {
    setSelectedProgramInfo(selectedInfo);
    setInfoModalVisible(!infoModalVisible);
  };

  return (
    programData.length === 0
    ?  (
    <View style={{flex:1, width:'100%', height:'100%'}}>
      <Loading /> 
    </View>
    ) : ( 
      <View style={styles.container}>

        <SubTitle title='연주순서' navigation={props.navigation}/>

        <ScrollView style={styles.section}>

        {
          programData.map((item:any, index:any)=>{
            const subProgramCopy = subProgramData.find((e)=> e.programNumber === item.number);
            const noticeCopy = noticeData.length > 0 ? noticeData.find((e)=> e.programNumber === item.number) : undefined;
            const lyricsCopy = lyricsData.length > 0 ? lyricsData.find((e)=> e.programNumber === item.number) : undefined;

            return (
              <View key={item.number} style={{marginBottom:30}}>
                {
                  item.composition.map((compositionItem:any, compositionIndex:any)=>{
                    return (
                      <View key={compositionIndex} style={{marginBottom:10}}>
                        {
                        compositionItem === 'InterMission' 
                        ?
                        null
                        :
                        <Typography fontWeightIdx={2}>{compositionItem}</Typography>
                        }
                      </View>
                    )
                  })
                }
                {
                  item.songName.map((subItem:any, subIndex:any)=>{
                    return(
                      <View key={subIndex}>
                        {
                          subItem === 'InterMission' 
                          ?
                          <Typography>- InterMission -</Typography>
                          :
                          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between'}}>
                            <View style={{width:'80%'}}>
                              <Typography fontSize={20} marginBottom={10}>{subItem}</Typography>
                            </View>
                            <View style={{width:'20%', flexDirection:'row', justifyContent:'flex-end', alignItems:'flex-start'}}>
                              {noticeCopy &&
                                <TouchableOpacity
                                  hitSlop={5}
                                  style={{padding:5}}
                                  onPress={() => infoToggleModal({ title: subItem, notice: noticeCopy?.notice, lyrics: lyricsCopy?.lyrics })}
                                >
                                  <AntDesign name='infocirlceo' size={16}/>
                                </TouchableOpacity>
                              }
                            </View>
                            <Modal
                              animationType="slide"
                              transparent={true}
                              visible={infoModalVisible}
                              onRequestClose={infoToggleModal}
                            >
                              <InfoModal
                                infoToggleModal={() => infoToggleModal(null)} // 모달 닫을 때 선택된 정보 초기화
                                title={selectedProgramInfo?.title}
                                notice={selectedProgramInfo?.notice}
                                lyrics={selectedProgramInfo?.lyrics}
                              />
                            </Modal>
                          </View>
                        }
                        {
                          subProgramCopy 
                          ?
                          <>
                            {
                              subProgramCopy.songName.map((song:any, songIdx:any)=>{
                                return (
                                  <Typography key={songIdx} marginBottom={10}>{songIdx+1}. {song}</Typography>
                                )
                              })
                            }
                          </>
                          :
                          null
                        }
                      </View>
                    )
                  })
                }
              </View>
            )
          })
        }

        </ScrollView >

        {/* 모달 백화면 커버창 */}
        <View style={ infoModalVisible ? styles.modalBackCover :  { display: 'none'}}></View>

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
  modalBackCover : {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#333',
    opacity: 0.8,
    zIndex: 1
  },
})