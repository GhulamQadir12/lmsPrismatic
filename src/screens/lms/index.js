import * as IMG from 'assets/images';
import CustomFlatList from 'components/atoms/custom-flatlist';
import FormHeader from 'components/atoms/headers/header';
import {Loader} from 'components/atoms/loader';
import {Row} from 'components/atoms/row';
import LeaveRequestCard from 'components/molecules/leave-request-card';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import Regular from 'typography/regular-text';
import styles from './styles';
import Bold from 'typography/bold-text';
import {navigate} from 'navigation/navigation-ref';
import {getLeaveList} from 'services/api/auth-api-actions';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import Medium from 'typography/medium-text';

const Lms = props => {
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState('all');
  const [expandedCard, setExpandedCard] = useState(null); // Track the expanded card by its ID
  const [leaveList, setLeaveList] = useState([]); // Track the expanded card by its ID
  const isFocused = useIsFocused();

  const fetchLeaveList = async () => {
    try {
      setLoading(true);
      const response = await getLeaveList('EMP-BGM-0001');
      console.log('response in leave list screen :', response);
      setLeaveList(response);
      //   setallData(response);
      console.log('Leave List ', leaveList);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchLeaveList(); // Fetch data on component mount
    }
  }, [isFocused]);

  // console.log("Zero index",leaveList[0]);
  // console.log("Zero index",leaveList[0].fl.dep.LeaveStatus);
  // console.log("Zero index",leaveList[0]);

  const handlePress = id => {
    // Toggle expansion for the selected card
    setExpandedCard(prevState => (prevState === id ? null : id));
  };

  const renderItem = ({item}) => (
    <LeaveRequestCard
      isExpanded={expandedCard === item?.fl?.Leave_Id} // Check if this card is expanded
      item={item}
      onPress={() => handlePress(item?.fl?.Leave_Id)} // Toggle expansion on press
    />
  );

  const countPending = leaveList?.filter(
    item => item?.fl?.dep?.LeaveStatus === 'Pending',
  )?.length;
  const countApprove = leaveList?.filter(
    item =>
      item?.fl?.dep?.LeaveStatus === 'Approved' ||
      item?.fl?.dep?.LeaveStatus === 'Paid' ||
      item?.fl?.dep?.LeaveStatus === 'UnPaid',
  )?.length;
  const countRejected = leaveList?.filter(
    item => item?.fl?.dep?.LeaveStatus === 'Rejected',
  )?.length;
  console.log('countPending', countPending);
  console.log('countApprove', countApprove);

  return (
    <View style={styles.container}>
      <Header1x2x title={'LMS'} style={{marginBottom:mvs(20)}}/>
      <ScrollView>
      <Row style={styles.row}>
      <TouchableOpacity style={[styles.invoicecontainer,{backgroundColor:colors.primary}]} onPress={()=>navigate('LectureNotes')}>
      <Image source={IMG.notes} style={styles.image}/>
      <Medium label={'Lectures Notes'} fontSize={18} color={colors.white} style={{marginTop:mvs(15)}} />
    </TouchableOpacity>
    <TouchableOpacity style={[styles.invoicecontainer,{backgroundColor:colors.primary}]} onPress={()=>navigate('VideoTutorials')}>
    <Image source={IMG.video} style={styles.image}/>
      <Medium label={'Video Tutorials'} fontSize={18} color={colors.white} style={{marginTop:mvs(15)}}/>
    </TouchableOpacity>
    </Row>
    <Row style={styles.row}>
    <TouchableOpacity style={[styles.invoicecontainer,{backgroundColor:colors.primary}]} onPress={()=>navigate('Assignment')}>
    <Image source={IMG.assignment} style={styles.image}/>
      <Medium label={'Assignment'} fontSize={18} color={colors.white} style={{marginTop:mvs(15)}}/>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.invoicecontainer,{backgroundColor:colors.primary}]} onPress={()=>navigate('Quiz')}>
    <Image source={IMG.quiz} style={styles.image}/>
      <Medium label={'Quiz'} fontSize={18} color={colors.white} style={{marginTop:mvs(15)}}/>
    </TouchableOpacity>
    </Row>
    </ScrollView>
    </View>
  );
};

export default Lms;
