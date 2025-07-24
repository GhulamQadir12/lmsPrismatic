import {mvs, width} from 'config/metrices';
import {StyleSheet} from 'react-native';
import {colors} from 'config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: mvs(20),
  },
  timerRow: {
    // alignItems: 'center',
    marginVertical: mvs(10),
    gap: mvs(30),
    justifyContent: 'center',
  },
  timerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.red,
  },
  timerLabel: {
    fontSize: mvs(14),
    color: colors.black,
    marginBottom: mvs(5),
  },
  timeText: {
    fontSize: mvs(24),
    color: colors.primary,
    fontWeight: 'bold',
  },
  progressContainer: {
    marginBottom: mvs(15),
    alignSelf: 'flex-end',
  },
  progressText: {
    fontSize: mvs(14),
  },

  optionsContainer: {
    marginVertical: mvs(30),
  },
  // optionButton: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   padding: mvs(15),
  //   marginBottom: mvs(10),
  //   backgroundColor: colors.lightGray,
  //   borderRadius: mvs(5),
  // },
  // selectedOption: {
  //   backgroundColor: colors.blueHalf,
  // },
  // optionText: {
  //   flex: 1,
  //   marginLeft: mvs(10),
  //   fontSize: mvs(16),
  //   color: colors.black,
  // },
  button: {
    marginVertical: mvs(20),
  },
  reimtimerLabel: {
    fontSize: mvs(20),
    color: colors.black,
    marginBottom: mvs(10),
    alignSelf: 'center',
  },
  questionContainer: {
    backgroundColor: colors.white,
    borderRadius: mvs(10),
    padding: mvs(20),
    marginBottom: mvs(20),
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
  blockerOverlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  zIndex: 1000
},
});
export default styles;
