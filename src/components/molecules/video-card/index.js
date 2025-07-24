import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import * as IMG from 'assets/images';

import YoutubePlayer from 'react-native-youtube-iframe';
import Bold from 'typography/bold-text';
import styles from './styles';
import { mvs } from 'config/metrices';

const extractVideoId = (url) => {
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/[^\/]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  return match ? match[1] : null;
};

const VideoCard = ({ item }) => {
  const [playing, setPlaying] = useState(false);
  const videoId = extractVideoId(item?.video_link);

  const onStateChange = useCallback((state) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      {playing ? (
        <View style={{marginBottom:mvs(10)}}>
      <YoutubePlayer
        height={mvs(200)}
        play={playing}
        videoId={videoId}
        onChangeState={onStateChange}
      />
                <Bold label={item?.video_title} style={[styles.name,{marginTop :mvs(10)}]} fontSize={mvs(16)} />
                </View>

        
      ) : (
        <TouchableOpacity style={styles.btn} onPress={() => setPlaying(true)}>
  {item?.video_img_thumb ? (
    <>
      <Image
        source={{ uri: `https://ace.prismaticcrm.com/uploads/thumbnails/${item.video_img_thumb}` }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
      <Image source={IMG.pause} style={styles.play} />
    </>
  ) : (
    <Image
      source={IMG.thumbnail}
      style={styles.thumbnail}
      resizeMode="cover"
    />
  )}
  <Bold
    label={item?.video_title}
    style={[styles.name, { marginTop: mvs(10) }]}
    fontSize={mvs(16)}
  />
</TouchableOpacity>

      )}
    </View>
  );
};

export default VideoCard;
