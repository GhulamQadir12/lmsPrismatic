import {mvs} from 'config/metrices';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Regular from 'typography/regular-text';
import styles from './styles';
import {ClockIcon, Tick} from 'assets/icons';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import moment from 'moment';
import {Checkbox} from 'components/atoms/checkbox';

const TodoCard = ({item, style, onPress, isExpanded}) => {
  const DateFrom = moment(item?.fl?.DateFrom).format('YYYY-MM-DD');
  const DateTo = moment(item?.fl?.DateTo).format('YYYY-MM-DD');
  const [check, setCheck] = React.useState(false);

  console.log('fdjkg', DateTo); // Output: 2024-11-21
  console.log('first item', item);
  return (
    <TouchableOpacity onPress={onPress} style={{...styles.container}}>
      <Row style={{gap: mvs(10), alignItems: 'center'}}>
        {/* {item?.status === 'Approved' ? <Tick /> : <ClockIcon />} */}
        {item?.status === 'Pending' ? <Tick /> : <ClockIcon />}
        <View style={{flex: 1}}>
          <Bold
            fontSize={mvs(15)}
            color={colors.primary}
            label={`${DateFrom}`}
          />
          <Row style={styles.statusContainer}>
            <Medium
              color={
                item?.fl?.dep.LeaveStatus === 'Pending'
                  ? colors.yellow
                  : colors.green
              }
              label={item?.fl?.dep.LeaveStatus}
            />
            <AntDesign
              name={isExpanded ? 'up' : 'down'}
              size={15}
              color={colors.black}
            />
          </Row>
        </View>
      </Row>
      {isExpanded && (
        <>
        <Row>
         
          <Row
            style={{
              alignItems: 'center',
              marginTop: mvs(20),
              justifyContent: 'flex-start',
              gap: mvs(20),
            }}>
            <Checkbox
              onPress={() => {
                const updatedCheck = !check; // Toggle the state
                setCheck(updatedCheck); // Update the React state
              }}
              checked={check} // Bind to the React state
            />
            <Regular
              style={{
                textDecorationLine: check ? 'line-through' : 'none',
                // flex: 1,
              }}
              label={'Detail Todo '}
            />
          </Row>
          <TouchableOpacity style={{alignSelf:'flex-end',width:'15%',alignItems:'center',justifyContent:'center',borderRadius:mvs(5)}}>
         <AntDesign size={20} name={'delete'} color={colors.primary} />
         </TouchableOpacity>
         </Row>
        </>
      )}
    </TouchableOpacity>
  );
};

export default React.memo(TodoCard);
