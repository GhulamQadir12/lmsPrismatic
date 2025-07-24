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
    marginTop: mvs(30),
    borderRadius: mvs(10),
    paddingVertical: mvs(15),
  },
  documentContainer:{
    alignItems:'center',
    justifyContent:'center',
  },
  taskBtn: {
    width: mvs(60),
    height: mvs(60),
    borderRadius: mvs(30),
    backgroundColor: colors.yellow,
    position: 'absolute',
    bottom: mvs(20),
    right: mvs(20),
    alignItems: 'center',
    justifyContent: 'center',
  },



});
export default styles;
