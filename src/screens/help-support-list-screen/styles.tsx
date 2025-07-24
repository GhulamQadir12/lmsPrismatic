import {mvs, width} from 'config/metrices';
import {StyleSheet} from 'react-native';
import {colors} from 'config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topcontainer: {
    width: '100%',
    height: '19%',
    backgroundColor: colors.primary,
  },

  
  infoContainer: {
    // width: '90%',
    paddingHorizontal: mvs(20),
    backgroundColor: colors.silver,
    marginHorizontal: mvs(20),
    marginVertical: mvs(30),
    borderRadius: mvs(10),
    paddingVertical: mvs(30),
  },
  documentContainer:{
    alignItems:'center',
    justifyContent:'center',
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
