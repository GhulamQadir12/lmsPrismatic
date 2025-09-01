import OnboardingWalkThrough from 'components/molecules/onboarding-walk-through';
import {colors} from 'config/colors';
import {useOnboardingList} from 'config/constants';
import React, {useRef} from 'react';
import {ScrollView, StatusBar, View} from 'react-native';
import Swiper from 'react-native-swiper';
import styles from './styles';
import {navigate} from 'navigation/navigation-ref';
import {UTILS} from 'utils';
import {mvs} from 'config/metrices';

const Onboarding = props => {
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const ONBOARDING_LIST = useOnboardingList();

  const handleNext = async () => {
    const actualIndex = swiperRef?.current?.state?.index ?? 0;
    if (actualIndex === ONBOARDING_LIST.length - 1) {
      await UTILS.setItem('hasLaunched', 'true');
      console.log('navigating to Onboarding');
      // await UTILS.setItem('hasLaunched', 'true');
      navigate('GetStarted');
    } else {
      console.log('scrolling to next slide', actualIndex);
      swiperRef.current.scrollBy(1);
    }
  };

  const handleSwipe = index => {
    // Prevent manual swiping by resetting to the current index
    swiperRef.current.scrollTo(currentIndex, false);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.primary}
        barStyle={'white'}
      />
      <Swiper
        ref={swiperRef}
        onIndexChanged={index => {
          setCurrentIndex(index);
        }}
        loop={false}
        scrollEnabled={false}
        showsPagination={false} // turn off built-in dots
      >
        {ONBOARDING_LIST?.map((item, index) => (
          <OnboardingWalkThrough
            key={index}
            item={item}
            handleNext={handleNext}
            isLast={index === ONBOARDING_LIST.length - 1}
            index={index}
            currentIndex={currentIndex}
            total={ONBOARDING_LIST.length}
          />
        ))}
      </Swiper>
    </View>
  );
};

export default Onboarding;
