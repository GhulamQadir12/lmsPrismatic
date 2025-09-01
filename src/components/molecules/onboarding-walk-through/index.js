import React from 'react';
import FastImage from 'react-native-fast-image';
import {mvs} from 'config/metrices';
import {StyleSheet, View} from 'react-native';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';
import {colors} from 'config/colors';
import CustomSwipeButton from 'components/atoms/SwipeNextButton/SwipeNextButton';

const OnboardingWalkThrough = ({item, handleNext, isLast, index, currentIndex, total}) => {
  return (
    <View style={styles.container}>
      <View style={{marginTop: mvs(20)}}>
        <Bold
          label={item?.title}
          color={colors.black}
          fontSize={mvs(18)}
          numberOfLines={3}
          style={{textAlign: 'center'}}
        />
        <Regular
          label={item?.desc}
          color={colors.light}
          fontSize={mvs(13)}
          numberOfLines={3}
          style={{marginTop: mvs(10), textAlign: 'center'}}
        />
        <View style={{marginTop: mvs(20)}}>
          <CustomSwipeButton onSuccess={handleNext} isLast={isLast} />
        </View>
      </View>

      <View style={styles.imgcontainer}>
        <FastImage
          resizeMode="contain"
          source={item?.image}
          style={styles.img}
        />
        {/* Dots immediately below the image */}
        <View style={styles.paginationContainer}>
          {Array.from({ length: total }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                { backgroundColor: i === currentIndex ? colors.primary : colors.gray },
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default OnboardingWalkThrough;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: mvs(20),
  },
  img: {
    height: mvs(400),
    width: '100%',
  },
  imgcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
    height: mvs(450),
    marginTop: mvs(10),
    backgroundColor: colors.white,
    marginHorizontal: mvs(20),
  },
  paginationContainer: {
    flexDirection: 'row',
    marginTop: mvs(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: mvs(12),
    height: mvs(12),
    borderRadius: mvs(6),
    marginHorizontal: mvs(3),
  },
});
