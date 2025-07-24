import * as IMG from 'assets/images';
import CustomFlatList from 'components/atoms/custom-flatlist';
import FormHeader from 'components/atoms/headers/header';
import {Loader} from 'components/atoms/loader';
import {Row} from 'components/atoms/row';
import LeaveRequestCard from 'components/molecules/leave-request-card';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Regular from 'typography/regular-text';
import styles from './styles';
import Bold from 'typography/bold-text';
import {navigate} from 'navigation/navigation-ref';
import {getLeaveList} from 'services/api/auth-api-actions';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import Medium from 'typography/medium-text';

const FeeInvoiceCategory = props => {
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();


 

  return (
    <View style={styles.container}>
      <Header1x2x title={'Fee Invoice Category'} style={{marginBottom:mvs(20)}}/>
      <Row style={styles.row}>
      <TouchableOpacity style={[styles.invoicecontainer,{backgroundColor:colors.primary}]} onPress={()=>navigate('FeeInvoiceList')}>
      <Image source={IMG.paid} style={styles.image}/>
      <Medium label={'Paid'} fontSize={18} color={colors.white} style={{marginTop:mvs(7)}} />
    </TouchableOpacity>
    <TouchableOpacity style={[styles.invoicecontainer,{backgroundColor:colors.primary}]} onPress={()=>navigate('UnpaidFeeInvoiceList')}>
    <Image source={IMG.unpaid} style={styles.image}/>
      <Medium label={'UnPaid'} fontSize={18} color={colors.white} style={{marginTop:mvs(7)}}/>
    </TouchableOpacity>
    </Row>
    {/* <Row style={styles.row}>
    <TouchableOpacity style={[styles.invoicecontainer,{backgroundColor:colors.primary}]} onPress={()=>navigate('TobeVerifiedInvoiceList')}>
    <Image source={IMG.uphold} style={styles.image}/>
      <Medium label={'To be verified'} fontSize={18} color={colors.white} style={{marginTop:mvs(7)}}/>
    </TouchableOpacity>
    </Row> */}
    </View>
  );
};

export default FeeInvoiceCategory;
