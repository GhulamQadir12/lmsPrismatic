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
    width: '100%',
    height: mvs(423),
  },
  welcomeText: {
    alignSelf: 'center',
    marginTop: mvs(20),
  },


  lottie: {
    width: '100%',
    height: '80%',
  },
  lottiecontainer:{ height: '60%',alignItems:'center'},
  bottomContainer: {
    backgroundColor: colors.white,
    width: '100%',
    height: '40%',
    borderTopLeftRadius: mvs(20),
    borderTopRightRadius: mvs(20),
  },
});
export default styles;
