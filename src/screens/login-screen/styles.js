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
    width: '100%',
    height: mvs(423),
  },
  welcomeText: {
    alignSelf: 'center',
  },
  loginText: {
    alignSelf: 'center',
    marginTop: mvs(6),
  },

  lottie: {
    width: '100%',
    height: '80%',
  },
  bottomcontainer: {
    backgroundColor: colors.white,
    width: '100%',
    height: '48%',
    borderTopRightRadius: mvs(20),
    borderTopLeftRadius: mvs(20),
  },
  lottiecontainer: {
    height: '52%',
    alignItems: 'center',
  },
});
export default styles;
