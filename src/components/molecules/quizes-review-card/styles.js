import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
   questionContainer: {
      backgroundColor: colors.white,
      borderRadius: mvs(10),
      padding: mvs(20),
      marginBottom: mvs(20),
      marginHorizontal: mvs(10),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    questionLabel: {
      fontSize: mvs(18),
      marginBottom: mvs(10),
      lineHeight: mvs(24),
    },
    questionText: {
      fontSize: mvs(16),
      marginBottom: mvs(20),
      lineHeight: mvs(22),
    },
    optionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: mvs(15),
      marginBottom: mvs(10),
      backgroundColor: colors.white,
      borderRadius: mvs(8),
      borderWidth: 1,
      borderColor: colors.border,
      // shadowColor: '#000',
      // shadowOffset: {
      //   width: 0,
      //   height: 1,
      // },
      // shadowOpacity: 0.1,
      // shadowRadius: 1.41,
      // elevation: 2,
    },
    selectedOption: {
      backgroundColor: '#f5f2f0',
      borderColor: colors.border,
    },
    optionText: {
      flex: 1,
      marginLeft: mvs(12),
      fontSize: mvs(15),
    },
    questionCounter: {
      fontSize: mvs(14),
      color: colors.black,
      marginBottom: mvs(5),
      alignSelf: 'flex-end',
    },
    feedbackContainer: {
  padding: mvs(10),
  borderRadius: mvs(5),
  marginTop: mvs(10),
},
selectedOption: {
  backgroundColor: colors.lightGray, // or any color you prefer for selected options
},
});
export default styles;
