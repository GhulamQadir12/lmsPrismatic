import {StyleSheet} from 'react-native';
import {colors} from 'config/colors';
import { mvs } from 'config/metrices';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: mvs(20),
      backgroundColor: colors.primary,
    },
  lottie: {
    width: mvs(250),
    height: mvs(250),
  },
  lottieContainer: {
    flex: 1,
    alignItems: 'center',
    borderRadius:mvs(20),
  },
  inputContainer: {
    position: 'absolute',
    bottom: 150, // Adjust based on design
    width: '80%',
    alignSelf: 'center',
  },
  input: {
    // height: mvs(50),
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    // width: '100%',
  },
});
