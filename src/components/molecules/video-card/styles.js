import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: mvs(16),
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: mvs(12),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  playingContainer: {
    backgroundColor: colors.white,
    borderRadius: mvs(12),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  thumbnailContainer: {
    position: 'relative',
    height: mvs(200),
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: mvs(60),
    height: mvs(60),
    borderRadius: mvs(30),
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationBadge: {
    position: 'absolute',
    bottom: mvs(10),
    right: mvs(10),
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: mvs(4),
    paddingHorizontal: mvs(6),
    paddingVertical: mvs(2),
  },
  durationText: {
    color: colors.white,
  },
  infoContainer: {
    padding: mvs(12),
  },
  title: {
    color: colors.textDark,
    marginBottom: mvs(4),
    lineHeight: mvs(20),
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metadataText: {
    color: colors.textLight,
    marginRight: mvs(4),
  },
  videoPlayer: {
    borderTopLeftRadius: mvs(12),
    borderTopRightRadius: mvs(12),
  },
  closeButton: {
    position: 'absolute',
    top: mvs(10),
    right: mvs(10),
    width: mvs(30),
    height: mvs(30),
    borderRadius: mvs(15),
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  videoTitle: {
    padding: mvs(12),
    color: colors.textDark,
  },
});

export default styles;