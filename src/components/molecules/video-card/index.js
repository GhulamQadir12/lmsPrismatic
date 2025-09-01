import React, {useState, useCallback} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import * as IMG from 'assets/images';
import YoutubePlayer from 'react-native-youtube-iframe';
import Bold from 'typography/bold-text';
import styles from './styles';
import {mvs} from 'config/metrices';
import { URLS } from 'services/api/api-urls';
import { colors } from 'config/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';


const extractVideoId = url => {
  const match = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/[^\/]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
  );
  return match ? match[1] : null;
};

const VideoCard = ({item}) => {
  const [playing, setPlaying] = useState(false);
  const videoId = extractVideoId(item?.video_link);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      {playing ? (
        <View style={styles.playingContainer}>
          <YoutubePlayer
            height={mvs(200)}
            play={playing}
            videoId={videoId}
            onChangeState={onStateChange}
            webViewStyle={styles.videoPlayer}
          />
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setPlaying(false)}
          >
            <AntDesign name="close" size={mvs(20)} color={colors.white} />
          </TouchableOpacity>
          <Bold
            label={item?.video_title || 'N/A'}
            style={styles.videoTitle}
            fontSize={mvs(16)}
            numberOfLines={2}
          />
        </View>
      ) : (
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => setPlaying(true)}
          activeOpacity={0.9}
        >
          <View style={styles.thumbnailContainer}>
            {item?.video_img_thumb ? (
              <Image
                source={{
                  uri: `${URLS.videos.yt_videos}${item.video_img_thumb}`,
                }}
                style={styles.thumbnail}
                resizeMode="cover"
              />
            ) : (
              <Image
                source={IMG.thumbnail}
                style={styles.thumbnail}
                resizeMode="cover"
              />
            )}
            <View style={styles.overlay}>
              <View style={styles.playButton}>
                <AntDesign name="play" size={mvs(24)} color={colors.white} />
              </View>
            </View>
            {/* <View style={styles.durationBadge}>
              <Bold
                label={'3:45'} // You might want to calculate this dynamically
                style={styles.durationText}
                fontSize={mvs(10)}
              />
            </View> */}
          </View>
          
          <View style={styles.infoContainer}>
            <Bold
              label={item?.video_title || 'N/A'}
              style={styles.title}
              fontSize={mvs(14)}
              numberOfLines={2}
            />
            {/* <View style={styles.metadata}>
              <Bold
                label={`${item?.views || 0} views`}
                style={styles.metadataText}
                fontSize={mvs(12)}
              />
              <Bold
                label="•"
                style={styles.metadataText}
                fontSize={mvs(12)}
              />
              <Bold
                label={item?.upload_date || '2 days ago'}
                style={styles.metadataText}
                fontSize={mvs(12)}
              />
            </View> */}
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;