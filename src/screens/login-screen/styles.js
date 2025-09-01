import {Platform, StyleSheet} from 'react-native';
import {colors} from 'config/colors';
import {height, mvs, width} from 'config/metrices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboradscrollcontent: {
    marginTop: mvs(20),
  },
btnstyle:{borderBottomWidth: 1},
 backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  welcomeText: {
    alignSelf: 'center',
  },
  loginText: {
    alignSelf: 'center',
    marginTop: mvs(6),
  },
  lottie: {
    width: '80%',
    height: '80%',
  },
  bottomcontainer: {
    backgroundColor: colors.white,
    width: '100%',
    height: '50%',
    borderTopRightRadius: mvs(20),
    borderTopLeftRadius: mvs(20),
  },
  lottiecontainer: {
    height: '50%',
    alignItems: 'center',
    justifyContent:'center'
  },
});
export default styles;
