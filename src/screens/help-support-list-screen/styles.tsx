import {mvs, width} from 'config/metrices';
import {StyleSheet} from 'react-native';
import {colors} from 'config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
      containerStyle:{
      // position: 'absolute',
      bottom: mvs(10),
      
      // left: mvs(0),
      right: mvs(10),
      justifyContent: 'center',
      alignItems: 'center',
      width: mvs(50),
      height: mvs(50),
      alignSelf:'flex-end',
    },
    textStyle:{
      fontSize: mvs(30),
      marginTop: mvs(3),
    },



});
export default styles;
