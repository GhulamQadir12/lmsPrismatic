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
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.border,
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
  ticketNumber: {
    width: mvs(30),
    height: mvs(30),
    borderRadius: mvs(15),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: mvs(12),
  },
  headerContent: {
    flex: 1,
    marginRight: mvs(10),
  },
  ticketTitle: {
    fontWeight: '600',
    marginBottom: mvs(2),
  },
  headerRight: {
    alignItems: 'flex-end',
    gap: mvs(5),
  },
  statusBadge: {
    paddingHorizontal: mvs(8),
    paddingVertical: mvs(4),
    borderRadius: mvs(12),
    minWidth: mvs(70),
    alignItems: 'center',
  },
  statusText: {
    fontWeight: '500',
  },
  detailsContainer: {
    padding: mvs(15),
    backgroundColor: colors.white,
  },
  detailRow: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginBottom: mvs(12),
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: mvs(12),
  },
  labelContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
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
  messageText: {
    flex: 1,
    marginLeft: mvs(10),
    fontWeight: '400',
    fontStyle: 'italic',
    backgroundColor: '#f8f9fa',
    padding: mvs(8),
    borderRadius: mvs(6),
    borderWidth: 1,
    borderColor: colors.border,
  },
});

export default styles;