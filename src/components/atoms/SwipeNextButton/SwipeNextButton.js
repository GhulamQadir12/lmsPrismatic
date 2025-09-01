import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  I18nManager,
  Text,
} from 'react-native';
import {mvs} from 'config/metrices';
import {colors} from 'config/colors';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const RAIL_WIDTH = SCREEN_WIDTH - 60;
const THUMB_WIDTH = 120;
const THUMB_MARGIN = 5;
const THRESHOLD = RAIL_WIDTH - THUMB_WIDTH - THUMB_MARGIN;
const ARROW_HIDE_ZONE = THRESHOLD - 60;

const CustomSwipeButton = ({onSuccess, isLast}) => {
  const thumbTranslateX = useRef(new Animated.Value(0)).current;
  const progressTranslateX = useRef(new Animated.Value(-RAIL_WIDTH)).current;
  const [showArrows, setShowArrows] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const arrowPulseAnim = useRef(new Animated.Value(0)).current;

  // Pulsing arrow animation
  useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(arrowPulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(arrowPulseAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start(() => pulse());
    };
    pulse();
    return () => arrowPulseAnim.stopAnimation();
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderMove: (_, gestureState) => {
        const dx = Math.min(
          Math.max(0, gestureState.dx),
          THRESHOLD + THUMB_MARGIN,
        );
        thumbTranslateX.setValue(dx);
        progressTranslateX.setValue(dx - RAIL_WIDTH);
        setShowArrows(dx < ARROW_HIDE_ZONE);
      },

      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx >= THRESHOLD) {
          handleSuccess();
        } else {
          resetPosition();
        }
      },
    }),
  ).current;

  const handleSuccess = () => {
    Animated.parallel([
      Animated.timing(thumbTranslateX, {
        toValue: THRESHOLD,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(progressTranslateX, {
        toValue: THRESHOLD - RAIL_WIDTH,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsCompleted(true);
      onSuccess?.();
      setTimeout(resetComponent, 500);
    });
  };

  const resetPosition = () => {
    Animated.parallel([
      Animated.spring(thumbTranslateX, {
        toValue: 0,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.spring(progressTranslateX, {
        toValue: -RAIL_WIDTH,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start(() => setShowArrows(true));
  };

  const resetComponent = () => {
    thumbTranslateX.setValue(0);
    progressTranslateX.setValue(-RAIL_WIDTH);
    setShowArrows(true);
    setIsCompleted(false);
  };

  const arrowOpacity = arrowPulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  return (
    <View style={styles.wrapper}>
      {/* Instructional text */}
      <Medium 
        style={styles.instructionText} 
        label="Swipe right to continue" 
      />
      
      <View style={styles.container}>
        {/* Gradient background as visual cue */}
        <Animated.View style={[
          styles.gradientCue,
          { opacity: showArrows ? arrowOpacity : 0 ,backgroundColor: colors.primary, }
        ]} />
        
        {/* Background Rail */}
        <View style={[styles.rail, {backgroundColor: colors.rail}]} />
        
        {/* Progress Rail */}
        <Animated.View
          style={[
            styles.progressRail,
            {
              backgroundColor: colors.primary,
              transform: [{ translateX: progressTranslateX }],
            },
          ]}
        />

        {/* Thumb */}
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.thumb,
            {
              transform: [{ translateX: thumbTranslateX }],
            },
          ]}>
          <Medium
            style={[styles.thumbText, {color: colors.primary}]}
            label={isLast ? 'Get Started' : 'Next'}
          />
        </Animated.View>

        {/* Animated Arrows */}
        {showArrows && !isCompleted && (
          <Animated.View style={[
            styles.arrows,
            { opacity: arrowOpacity }
          ]}>
            {[...Array(4)].map((_, i) => (
              <Bold
                key={`arrow-${i}`}
                style={[
                  styles.arrow,
                  {
                    color: i < 2 ? colors.lightGray : colors.white,
                  },
                ]}
                label={I18nManager.isRTL ? '‹' : '›'}
              />
            ))}
          </Animated.View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: mvs(10),
  },
  instructionText: {
    color: colors.darkGray,
    textAlign: 'center',
    marginBottom: mvs(8),
    fontSize: mvs(14),
  },
  container: {
    height: mvs(50),
    borderRadius: mvs(30),
    backgroundColor: colors.rail,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  gradientCue: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: mvs(30),
    
    opacity: 0.1,
  },
  rail: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: mvs(30),
  },
  progressRail: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: mvs(30),
    width: RAIL_WIDTH,
    left: 0,
  },
  thumb: {
    width: THUMB_WIDTH,
    height: mvs(40),
    borderRadius: mvs(25),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    marginLeft: THUMB_MARGIN,
    zIndex: 2,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  thumbText: {
    fontWeight: 'bold',
    fontSize: mvs(15),
  },
  arrows: {
    position: 'absolute',
    right: mvs(40),
    flexDirection: 'row',
  },
  arrow: {
    fontSize: mvs(44),
    marginLeft: mvs(2),
    marginTop: mvs(-10),
  },
});

export default React.memo(CustomSwipeButton);