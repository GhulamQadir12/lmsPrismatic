import {Platform, StyleSheet} from 'react-native';
import {colors} from 'config/colors';
import {height, mvs, width} from 'config/metrices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  welcomeText: {
    alignSelf: 'center',
  },
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
    lottie: {
      width: '80%',
      height: '80%',
    },
      lottiecontainer: {
    height: '55%',
    alignItems: 'center',
    justifyContent:'center'
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

});
export default styles;
