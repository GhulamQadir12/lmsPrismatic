import {Platform, StyleSheet} from 'react-native';
import {colors} from 'config/colors';
import {height, mvs, width} from 'config/metrices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    // paddingHorizontal: mvs(20),
    paddingBottom: mvs(30),
  },
  keyboradscrollcontent: {
    marginVertical:mvs(20)
  },
  sectionTitle: {
    fontSize: mvs(18),
    color: colors.textDark,
    marginBottom: mvs(12),
    fontWeight: '600',
  },

  assignmentTitle: {
    fontSize: mvs(16),
    color: colors.textDark,
    flex: 1,
  },
  dueDate: {
    fontSize: mvs(14),
    color: colors.textLight,
  },
  inputSection: {
    marginVertical: mvs(20),
  },
  textArea: {
    backgroundColor: colors.white,
    borderRadius: mvs(12),
    borderWidth: 1,
    borderColor: colors.border,
    padding: mvs(15),
    minHeight: mvs(120),
    textAlignVertical: 'top',
  },
  uploadSection: {
    // marginTop: mvs(20),
  },
  uploadLabel: {
    fontSize: mvs(16),
    color: colors.textDark,
    marginBottom: mvs(4),
  },
  uploadHint: {
    fontSize: mvs(12),
    color: colors.textLight,
    marginBottom: mvs(15),
  },
  uploadButton: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    borderRadius: mvs(12),
    padding: mvs(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButtonContent: {
    alignItems: 'center',
  },
  uploadButtonText: {
    color: colors.primary,
    marginTop: mvs(10),
    marginBottom: mvs(5),
  },
  uploadButtonSubtext: {
    color: colors.textLight,
    fontSize: mvs(12),
  },
  documentCard: {
    backgroundColor: colors.white,
    borderRadius: mvs(12),
    padding: mvs(15),
    borderWidth: 1,
    borderColor: colors.border,
  },
  documentRow: {
    alignItems: 'center',
    gap: mvs(12),
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    color: colors.textDark,
    fontSize: mvs(14),
    marginBottom: mvs(2),
  },
  documentStatus: {
    color: colors.success,
    fontSize: mvs(12),
  },
  removeButton: {
    padding: mvs(5),
  },
  errorText: {
    marginTop: mvs(5),
    fontSize: mvs(12),
  },
  submitButton: {
    borderRadius: mvs(12),
    marginTop: mvs(10),
    height: mvs(50),
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

export default styles;