// Updated styles.js
import {mvs} from 'config/metrices';
import {StyleSheet, Dimensions} from 'react-native';
import {colors} from 'config/colors';

const {width} = Dimensions.get('window');
const CARD_WIDTH = (width - mvs(60)) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerGradient: {
    // paddingTop: mvs(40),
    paddingBottom: mvs(20),
    borderBottomLeftRadius: mvs(20),
    borderBottomRightRadius: mvs(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  header: {
    backgroundColor: 'transparent',
    marginBottom: mvs(10),
  },
  headerTitle: {
    fontSize: mvs(22),
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
  },
  scrollContent: {
    padding: mvs(20),
    paddingTop: mvs(10),
  },
  welcomeContainer: {
    backgroundColor: colors.white,
    borderRadius: mvs(15),
    padding: mvs(20),
    marginBottom: mvs(25),
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  welcomeTitle: {
    textAlign: 'center',
  },
  welcomeSubtitle: {
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: mvs(25),
  },
  menuItem: {
    width: CARD_WIDTH,
    marginBottom: mvs(20),
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: mvs(15),
    padding: mvs(15),
    alignItems: 'center',
    height: mvs(160),
    justifyContent: 'center',
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconContainer: {
    width: mvs(60),
    height: mvs(60),
    borderRadius: mvs(30),
    backgroundColor: '#e8f2fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: mvs(15),
  },
  image: {
    width: mvs(30),
    height: mvs(30),
    tintColor: colors.primary,
    resizeMode: 'contain',
  },
  menuTitle: {
    textAlign: 'center',
    marginBottom: mvs(5),
    fontWeight: '600',
  },
  menuDescription: {
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: mvs(15),
    padding: mvs(20),
    justifyContent: 'space-between',
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontWeight: '700',
    marginBottom: mvs(5),
  },
  statLabel: {
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e0e6ed',
    marginHorizontal: mvs(10),
  },
});

export default styles;