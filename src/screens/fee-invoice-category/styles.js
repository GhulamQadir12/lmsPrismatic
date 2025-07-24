import {mvs} from 'config/metrices';
import {StyleSheet} from 'react-native';
import {colors} from 'config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // padding: mvs(20),
  },
  invoicecontainer:{
    // flex:1,
    width:'45%',
    // backgroundColor:colors.primary,
    margin:mvs(10),
    alignItems:'center',
    justifyContent:'center',
    borderRadius:mvs(15),
  },
  row:{
    height:mvs(170),
    // backgroundColor:colors.red,
    marginHorizontal:mvs(20),
  }
 
});
export default styles;
