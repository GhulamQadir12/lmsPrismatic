import {Platform, StyleSheet} from 'react-native';
import {colors} from 'config/colors';
import {height, mvs, width} from 'config/metrices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafd',
  },
  header: {
    backgroundColor: 'transparent',
  },
  headerTitle: {
    fontSize: mvs(22),
    color: colors.white,
    textAlign: 'center',
  },
  keyboradscrollcontent: {
    padding: mvs(20),
    paddingTop: mvs(10),
  },
  formContainer: {
    backgroundColor: colors.white,
    borderRadius: mvs(16),
    paddingVertical: mvs(15),
    paddingHorizontal: mvs(10),
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  welcomeSection: {
    alignItems: 'center',
    justifyContent:'center',
    marginBottom: mvs(30),
    padding: mvs(20),
    backgroundColor: '#f8fafd',
    borderRadius: mvs(12),
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  welcomeText: {
    marginTop: mvs(10),
    marginBottom: mvs(5),
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: mvs(20),
  },
  formSection: {
    width: '100%',
  },
  sectionTitle: {
    marginBottom: mvs(15),
    paddingBottom: mvs(5),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  inputContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: mvs(10),
    marginBottom: mvs(15),
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  textAreaContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: mvs(10),
    minHeight: mvs(120),
    marginBottom: mvs(20),
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  submitButton: {
    borderRadius: mvs(10),
    height: mvs(50),
    marginTop: mvs(10),
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
  },
  buttonText: {
    fontSize: mvs(16),
    fontWeight: '600',
  },
  uploadBtn: {
    width: '30%',
    height: mvs(35),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.yellow,
    borderRadius: mvs(20),
  },
});

export default styles;