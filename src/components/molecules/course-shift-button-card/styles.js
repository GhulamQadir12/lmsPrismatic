import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.red,
    flex:1,

  },
 btn: {
  flex:1,
  width: 'auto',  // Change from '50%' to 'auto'
  paddingHorizontal: mvs(15), // Add some padding for a better look
  paddingVertical: mvs(10),
  borderRadius: mvs(5),
  backgroundColor: colors.primary, // Example background color
  marginRight: mvs(10), // Add margin for spacing between buttons
  borderRadius: mvs(5),
},

});
export default styles;
