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
    borderRadius: mvs(10),
    paddingVertical: mvs(10),
    marginTop: mvs(20),
  },
  documentContainer:{
    alignItems:'center',
    justifyContent:'center',
  },
  searchButton: {
    width: '100%',
    borderRadius: mvs(10),
    bottom: mvs(10),
  },



});
export default styles;
