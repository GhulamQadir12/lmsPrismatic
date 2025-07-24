import {Platform, StyleSheet} from 'react-native';
import {colors} from 'config/colors';
import {height, mvs, width} from 'config/metrices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: mvs(475),
  },
  welcomeText: {
    alignSelf: 'center',
  },
  lottie: {
    width: '100%',
    height: '80%',
  },
  contentContainerStyleNew: {
    marginTop: mvs(30),
  },
  bottomcontainer: {
    backgroundColor: colors.white,
    width: '100%',
    height: '45%',
    borderTopRightRadius: mvs(20),
    borderTopLeftRadius: mvs(20),
  },
  lottiecontainer: {
    height: '60%',
    alignItems: 'center',
  },
});
export default styles;
