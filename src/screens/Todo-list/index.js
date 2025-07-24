import CustomFlatList from 'components/atoms/custom-flatlist';
import FormHeader from 'components/atoms/headers/header';
import {Loader} from 'components/atoms/loader';
import {Row} from 'components/atoms/row';
import LeaveRequestCard from 'components/molecules/leave-request-card';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Regular from 'typography/regular-text';
import styles from './styles';
import Bold from 'typography/bold-text';
import {navigate} from 'navigation/navigation-ref';
import {getLeaveList} from 'services/api/auth-api-actions';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
import {PrimaryButton} from 'components/atoms/buttons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import DatePickered from 'components/atoms/date-picker/currentmonth';
import ToDoCard from 'components/molecules/to-do-card';
import Primaryinput from 'components/atoms/inputs/index';

const TodoList = props => {
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState('all');
  const [expandedCard, setExpandedCard] = useState(null); // Track the expanded card by its ID
  const [leaveList, setLeaveList] = useState([]); // Track the expanded card by its ID
  const [dateValue, setDateValue] = useState(''); // Track the expanded card by its ID
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
    <ToDoCard
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
      <FormHeader
        back={true}
        title={'Todos'}
        countTitle={leaveList?.length}
        countTitleOne={countApprove}
        countTitleTwo={countPending}
        countTitleThree={countRejected}
        titleOne={'Total'}
        titleTwo={'Completed'}
        titleThree={'Pending'}
        titleFour={'Cancelled'}
      />
      <Row style={styles.filterContainer}>
        <Primaryinput
          value={dateValue}
          onChangeText={x => setDateValue(x)}
          placeholder="From Date"
          isCalendar
          editable={false}
          mainContainer={{width: '74%'}}
        />
 
      <PrimaryButton containerStyle={styles.searchButton} title="Filter" />
      </Row>
      {/* <Row style={{alignItems: 'center', marginTop: mvs(60),paddingHorizontal:mvs(20)}}>
        <Primaryinput
          value={dateValue}
          onChangeText={x => setDateValue(x)}
          placeholder="From Date"
          isCalendar
          editable={false}
          mainContainer={{width: '47%'}}
        />
        <Primaryinput
          value={dateValue}
          onChangeText={x => setDateValue(x)}
          placeholder="To Date"
          isCalendar
          editable={false}
          mainContainer={{width: '47%'}}
        />
      </Row>
      <PrimaryButton containerStyle={styles.searchButton} title="Filter" /> */}
      <View style={{ flex: 1}}>
        <Row style={{paddingHorizontal: mvs(40)}}>
          <TouchableOpacity
            onPress={() => setSelect('all')}
            style={{
              borderBottomWidth: mvs(1),
              borderBottomColor:
                select === 'all' ? colors.primary : colors.white,
            }}>
            <Regular
              label={'All'}
              color={select === 'all' ? colors.primary : colors.halfWhite}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelect('annual')}
            style={{
              borderBottomWidth: mvs(1),
              borderBottomColor:
                select === 'annual' ? colors.primary : colors.white,
            }}>
            <Regular
              label={'Completed'}
              color={select === 'annual' ? colors.primary : colors.halfWhite}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelect('casual ')}
            style={{
              borderBottomWidth: mvs(1),
              borderBottomColor:
                select === 'casual ' ? colors.primary : colors.white,
            }}>
            <Regular
              label={'Pending'}
              color={select === 'casual ' ? colors.primary : colors.halfWhite}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelect('sick')}
            style={{
              borderBottomWidth: mvs(1),
              borderBottomColor:
                select === 'sick' ? colors.primary : colors.white,
            }}>
            <Regular
              label={'Cancelled'}
              color={select === 'sick' ? colors.primary : colors.halfWhite}
            />
          </TouchableOpacity>
        </Row>

        {loading ? (
          <Loader />
        ) : (
          <CustomFlatList
            showsVerticalScrollIndicator={false}
            data={leaveList}
            renderItem={renderItem}
            contentContainerStyle={{
              paddingBottom: mvs(20),
              paddingHorizontal: mvs(20),
            }}
          />
        )}
        <TouchableOpacity
          onPress={() => navigate('AddTodo')}
          style={styles.taskBtn}>
          <Bold color={colors.primary} fontSize={mvs(28)} label={'+'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoList;
