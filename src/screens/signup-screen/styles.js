import {Platform, StyleSheet} from 'react-native';
import {colors} from 'config/colors';
import {height, mvs, width} from 'config/metrices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  keyboradscrollcontent: {
    marginTop: mvs(20),
  },
btnstyle:{borderBottomWidth: 1, borderColor: colors.primary},
  backgroundImage: {
    width: '100%',
    height: mvs(423),
  },
  welcomeText: {
    alignSelf: 'center',
  },
  loginText: {
    color: colors.secondary,
    alignSelf: 'center',
    marginTop: mvs(6),
  },
  checkView: {
    width: mvs(20),
    height: mvs(20),
    borderRadius: mvs(10),
    borderColor: colors.secondary,
    borderWidth: mvs(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottie: {
    width: '100%',
    height: '80%',
  },
  bottomcontainer: {
    flexGrow: 1,
    backgroundColor: colors.white,
    width: '100%',
    borderTopRightRadius: mvs(20),
    borderTopLeftRadius: mvs(20),
  },
  lottiecontainer: {
    backgroundColor: colors.primary,
    height: '52%',
    alignItems: 'center',
  },
});
export default styles;
