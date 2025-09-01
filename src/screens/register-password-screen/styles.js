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
    height: '60%',
    alignItems: 'center',
    justifyContent:'center'
  },
  welcomeText: {
    alignSelf: 'center',
    // marginTop: mvs(10),
  },



  bottomContainer: {
    backgroundColor: colors.white,
    width: '100%',
    height: '40%',
    borderTopLeftRadius: mvs(20),
    borderTopRightRadius: mvs(20),
  },
});
export default styles;
