// Updated styles.js
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: mvs(12),
    marginBottom: mvs(15),
    marginHorizontal: mvs(15),
    shadowColor: '#175884',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#f0f4f8',
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: mvs(15),
    backgroundColor: '#f8fafd',
    borderBottomWidth: 1,
    borderBottomColor: '#e8f2fa',
  },
  lectureNumber: {
    width: mvs(30),
    height: mvs(30),
    borderRadius: mvs(15),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: mvs(12),
  },
  headerContent: {
    flex: 1,
    marginRight: mvs(10),
  },
  lectureTitle: {
    fontWeight: '600',
    marginBottom: mvs(2),
  },
  detailsContainer: {
    padding: mvs(15),
    backgroundColor: colors.white,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: mvs(12),
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '30%',
    minWidth: mvs(80),
  },
  labelText: {
    marginLeft: mvs(5),
    fontWeight: '500',
  },
  valueText: {
    flex: 1,
    marginLeft: mvs(10),
    fontWeight: '400',
  },
  fileContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: mvs(10),
    padding: mvs(8),
    backgroundColor: '#f8f9fa',
    borderRadius: mvs(6),
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  fileText: {
    marginLeft: mvs(8),
    flex: 1,
  },
});

export default styles;