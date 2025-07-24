import CustomFlatList from 'components/atoms/custom-flatlist';
import FormHeader from 'components/atoms/headers/header';
import {Loader} from 'components/atoms/loader';
import {Row} from 'components/atoms/row';
import WorkFromHomeRequestCard from 'components/molecules/WFH-request-card';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Regular from 'typography/regular-text';
import styles from './styles';
import Bold from 'typography/bold-text';
import {navigate} from 'navigation/navigation-ref';
import { getWorkFromHomeCategory, getWorkFromHomeList } from 'services/api/auth-api-actions';

const WorkFromHomeRequestList = props => {
  const [loading, setLoading] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null); // Track the expanded card by its ID
  const [wfhList, setWfhList] = useState([]); // Track the expanded card by its ID

  const fetchWorkFromHomeList = async () => {
    try {
      setLoading(true);
      const response = await getWorkFromHomeList('EMP-BGM-0001');
      setWfhList(response || []);
      // console.log('Reimbursement List', data);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkFromHomeList(); // Fetch data on component mount
  }, []);

 
  
  const handlePress = WFHReqId => {
    // Toggle expansion for the selected card
    setExpandedCard(prevState => (prevState === WFHReqId ? null : WFHReqId));
  };

  const renderItem = ({item}) => (
    <WorkFromHomeRequestCard
      isExpanded={expandedCard === item?.wfh?.WFHReqId} // Check if this card is expanded
      item={item}
      onPress={() => handlePress(item?.wfh?.WFHReqId)} // Toggle expansion on press
    />
  );

  const countPending = wfhList?.filter(item => item?.wfh?.Status === "Pending")?.length;
  const countApprove = wfhList?.filter(item => item?.wfh?.Status === "Approved")?.length;
  const countRejected = wfhList?.filter(item => item?.wfh?.Status === "Rejected")?.length;

  return (
    <View style={styles.container}>
      <FormHeader
        back={true}
        title={'Work From Home Request'}
        countTitle={wfhList?.length}
        countTitleOne={countApprove}
        countTitleTwo={countPending}
        countTitleThree={countRejected}
        titleOne={'Total'}
        titleTwo={'Approved'}
        titleThree={'Pending'}
        titleFour={'Rejected'}
      />
      <View style={{marginTop: mvs(50), flex: 1}}>
        {loading ? (
          <Loader />
        ) : (
          <CustomFlatList
            showsVerticalScrollIndicator={false}
            data={wfhList}
            renderItem={renderItem}
            contentContainerStyle={{
              paddingBottom: mvs(20),
              paddingHorizontal: mvs(20),
            }}
          />
        )}
        <TouchableOpacity
          onPress={() => navigate('WorkFromHomeRequest')}
          style={styles.taskBtn}>
          <Bold color={colors.primary} fontSize={mvs(28)} label={'+'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WorkFromHomeRequestList;
