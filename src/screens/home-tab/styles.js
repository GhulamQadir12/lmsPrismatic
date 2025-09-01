import {mvs} from 'config/metrices';
import {StyleSheet} from 'react-native';
import {colors} from 'config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  backgroundimg: {
    width: '100%',
    height: mvs(120),
  },
  infoContainer: {
    width: '100%',
    padding: mvs(10),
    backgroundColor: colors.silver,
    borderRadius: mvs(10),
    
  },
  slide: {
    flex: 1,
    padding: mvs(20),

    
  },
  title: {
    fontSize: mvs(18),
    color: colors.white,
    maxWidth: '85%',

  },
  slidertitle: {
    fontSize: mvs(20),

  },
  description: {
    fontSize: mvs(12),
  },
   dropdowncontainer: {
    marginHorizontal: mvs(20),
    flex: 1,
  },
  dropdownWrapper: {
    position: 'relative',
    marginTop: 20,
  },
  label: {
    position: 'absolute',
    backgroundColor: colors.white,
    left: mvs(12),
    top: mvs(-10),
    paddingHorizontal: mvs(4),
    fontSize: mvs(14),
    zIndex: 1,
  },
  labelFocused: {
  },
  dropdown: {
    height: mvs(45),
    borderColor: colors.border,
    borderWidth: mvs(1),
    borderRadius: mvs(8),
    paddingHorizontal: mvs(10),
     backgroundColor: colors.white,
  },
  placeholderStyle: {
    fontSize: mvs(14),
  },
  selectedTextStyle: {
    fontSize: mvs(14),
    color: colors.black,
  },
  itemTextStyle: {
    fontSize: mvs(14),
  },
});
export default styles;
