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
import AdvanceRequestCard from 'components/molecules/advance-request-card';
import LoanRequestCard from 'components/molecules/loan-request-card';
import { getLoanList } from 'services/api/auth-api-actions';

const LoanRequestList = props => {
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState('all');
  const [expandedCard, setExpandedCard] = useState(null); // Track the expanded card by its ID
  const [loanList, setLoanList] = useState([]); // Track the expanded card by its ID

  const data = [
    {id: 1, status: 'Approved'},
    {id: 2, status: 'Pending'},
    {id: 3, status: 'Approved'},
  ];

  const fetchLoanList = async () => {
    try {
      setLoading(true);
      const response = await getLoanList('EMP-BGM-0001');
      setLoanList(response || []);
      console.log('loan List in index', loanList);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoanList(); // Fetch data on component mount
  }, []);

  const handlePress = Loan_Id => {
    // Toggle expansion for the selected card
    setExpandedCard(prevState => (prevState === Loan_Id ? null : Loan_Id));
  };

  const renderItem = ({item}) => (
    <LoanRequestCard
      isExpanded={expandedCard === item.Loan_Id} // Check if this card is expanded
      item={item}
      onPress={() => handlePress(item.Loan_Id)} // Toggle expansion on press
      onPressNavigate={ () => {
        navigate('LoanDetails', {Loan_Id : item.Loan_Id});}}
    />
  );

  const countPending = loanList?.filter(item => item?.HRapproval === "Pending")?.length;
  const countApprove = loanList?.filter(item => item?.HRapproval === "Approved")?.length;
  const countRejected = loanList?.filter(item => item?.HRapproval === "Rejected")?.length;

  return (
    <View style={styles.container}>
      <FormHeader
        back={true}
        title={'Request For Loan'}
        countTitle={loanList.length}
        countTitleOne={countApprove}
        countTitleTwo={countPending}
        countTitleThree={countRejected}
        titleOne={'Total'}
        titleTwo={'Taken'}
        titleThree={'Remaining'}
        titleFour={'Rejected'}
      />
      <View style={{marginTop: mvs(40), flex: 1}}>
        {loading ? (
          <Loader />
        ) : (
          <CustomFlatList
            showsVerticalScrollIndicator={false}
            data={loanList}
            renderItem={renderItem}
            contentContainerStyle={{
              paddingBottom: mvs(20),
              paddingHorizontal: mvs(20),
            }}
          />
        )}
        <TouchableOpacity
          onPress={() => navigate('LoanRequest')}
          style={styles.taskBtn}>
          <Bold color={colors.primary} fontSize={mvs(28)} label={'+'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoanRequestList;
