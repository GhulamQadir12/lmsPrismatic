import {Platform, StyleSheet} from 'react-native';
import {colors} from 'config/colors';
import {height, mvs, width} from 'config/metrices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboradscrollcontent: {
    marginTop: mvs(20),
    marginHorizontal: mvs(20),
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
    textAlign: 'center',
  },

  lottie: {
    width: '80%',
    height: '80%',
  },
  bottomcontainer: {
    backgroundColor: colors.white,
    width: '100%',
    height: '40%',
    borderTopRightRadius: mvs(20),
    borderTopLeftRadius: mvs(20),
  },
  lottiecontainer: {
    height: '60%',
    alignItems: 'center',
    justifyContent:'center'
  },
    buttonsContainer: {
    marginTop: mvs(20),
  },
  studentButton: {
    borderRadius: mvs(12),
    height: mvs(50),
    shadowColor: '#175884',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginBottom: mvs(15),
  },
  parentButton: {
    borderRadius: mvs(12),
    height: mvs(50),
    backgroundColor: '#6c757d',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
export default styles;
