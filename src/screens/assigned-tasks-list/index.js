import CustomFlatList from 'components/atoms/custom-flatlist';
import FormHeader from 'components/atoms/headers/header';
import {Loader} from 'components/atoms/loader';
import {Row} from 'components/atoms/row';
import LeaveRequestCard from 'components/molecules/leave-request-card';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
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
import AssignedTasksCard from 'components/molecules/assigned-tasks-card';

const AssignedTaskList = props => {
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState('all');
  const [expandedCard, setExpandedCard] = useState(null); // Track the expanded card by its ID
  const [leaveList, setLeaveList] = useState([]); // Track the expanded card by its ID
  const [dateValue, setDateValue] = useState(''); // Track the expanded card by its ID
  const isFocused = useIsFocused();

  const [tasks, setTasks] = useState({
    toDos: [
      {
        id: '1',
        taskName: 'Complete Project Proposal',
        assignedBy: ['Manager'],
        assignedTo: ['John'],
        time: '10:00 AM',
        date: '2024-12-20',
        pdfPath: '/path/to/proposal.pdf',
        status: 'toDo',
      },
      {
        id: '2',
        taskName: 'Prepare Presentation',
        assignedBy: ['Team Lead'],
        assignedTo: ['Alice'],
        time: '02:00 PM',
        date: '2024-12-22',
        pdfPath: '/path/to/presentation.pdf',
        status: 'toDo',
      },
    ],
    inProgress: [
      {
        id: '3',
        taskName: 'Bug Fixing',
        assignedBy: ['QA','Cadmore'],
        assignedTo: ['Tom','Cadmore'],
        time: '03:00 PM',
        date: '2024-12-18',
        pdfPath: '/path/to/bugs.pdf',
        status: 'inProgress',
      },
    ],
    completed: [
      {
        id: '4',
        taskName: 'Documentation',
        assignedBy: ['Paa ccc ddd fff kkkk Client','Cadmore'],
        assignedTo: ['Emma','Cadmore'],
        time: '11:00 AM',
        date: '2024-12-15',
        pdfPath: '/path/to/documentation.pdf',
        status: 'completed',
      },
      {
        id: '5',
        taskName: 'Documentation 2',
        assignedBy: ['Client 2','Cadmore'],
        assignedTo: ['Emma watso','Cadmore'],
        time: '12:00 AM',
        date: '2024-12-18',
        pdfPath: '/path/to/documentation.pdf',
        status: 'completed',
      },
    ],
  });

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
    <AssignedTasksCard
      isExpanded={expandedCard === item?.id} // Check if this card is expanded
      item={item}
      onPress={() => handlePress(item?.id)} // Toggle expansion on press
      onPressNavigate={ () => {
              navigate('AssignedTaskDetails', {itemDetail : item});}}
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

  // const allToDos = taskRecords.flatMap(record => record.toDos);
  // const allInProgress = taskRecords.flatMap(record => record.inProgress);
  // const allCompleted = taskRecords.flatMap(record => record.completed);
  const moveTask = (task, currentCategory, newCategory) => {
    setTasks(prevTasks => {
      const updatedCurrentCategory = prevTasks[currentCategory].filter(
        t => t.id !== task.id,
      );
      const updatedNewCategory = [...prevTasks[newCategory], task];
      return {
        ...prevTasks,
        [currentCategory]: updatedCurrentCategory,
        [newCategory]: updatedNewCategory,
      };
    });
  };

  const renderTask =
    category =>
    ({item}) =>
      (
        <View style={styles.taskItem}>
          <Text style={styles.taskName}>{item.taskName}</Text>
          <Text style={styles.taskDetails}>
            Assigned By: {item.assignedBy.join(', ')}
          </Text>
          <Text style={styles.taskDetails}>
            Assigned To: {item.assignedTo.join(', ')}
          </Text>
          <Text style={styles.taskDetails}>Time: {item.time}</Text>
          <Text style={styles.taskDetails}>Date: {item.date}</Text>
          <Text style={styles.taskDetails}>PDF: {item.pdfPath}</Text>
          <View style={styles.buttonContainer}>
            {category !== 'toDos' && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => moveTask(item, category, 'toDos')}>
                <Text style={styles.buttonText}>Move to To-Do</Text>
              </TouchableOpacity>
            )}
            {category !== 'inProgress' && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => moveTask(item, category, 'inProgress')}>
                <Text style={styles.buttonText}>Move to In-Progress</Text>
              </TouchableOpacity>
            )}
            {category !== 'completed' && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => moveTask(item, category, 'completed')}>
                <Text style={styles.buttonText}>Move to Completed</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      );

  return (
    <View style={styles.container}>
      <FormHeader
        back={true}
        title={'Assigned Tasks'}
        countTitle={leaveList?.length}
        countTitleOne={countApprove}
        countTitleTwo={countPending}
        countTitleThree={countRejected}
        titleOne={'Total'}
        titleTwo={'To-Dos'}
        titleThree={'Progress'}
        titleFour={'Completed'}
      />
      <Row style={styles.filterContainer}>
        <Primaryinput
          value={dateValue}
          onChangeText={x => setDateValue(x)}
          placeholder="Date"
          isCalendar
          editable={false}
          mainContainer={{width: '74%'}}
        />

        <PrimaryButton containerStyle={styles.searchButton} title="Filter" />
      </Row>

      <View style={{flex: 1}}>
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
              label={'Pending'}
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
              label={'In Progress'}
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
              label={'Completed'}
              color={select === 'sick' ? colors.primary : colors.halfWhite}
            />
          </TouchableOpacity>
        </Row>
        <ScrollView>
         
            <CustomFlatList
              showsVerticalScrollIndicator={false}
              data={tasks.toDos}
              renderItem={renderItem}
              contentContainerStyle={{
                paddingBottom: mvs(20),
                paddingHorizontal: mvs(20),
              }}
            />
            
            <CustomFlatList
              showsVerticalScrollIndicator={false}
              data={tasks.inProgress}
              renderItem={renderItem}
              contentContainerStyle={{
                paddingBottom: mvs(20),
                paddingHorizontal: mvs(20),
              }}
            />
          {/* {loading ? (
            <Loader />
          ) : ( */}
            <CustomFlatList
              showsVerticalScrollIndicator={false}
              data={tasks.completed}
              renderItem={renderItem}
              contentContainerStyle={{
                paddingBottom: mvs(20),
                marginBottom: mvs(20),
                paddingHorizontal: mvs(20),
              }}
            />
          {/* )} */}
        </ScrollView>
        {/* <TouchableOpacity
          onPress={() => navigate('AddTodo')}
          style={styles.taskBtn}>
          <Bold color={colors.primary} fontSize={mvs(28)} label={'+'} />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default AssignedTaskList;
