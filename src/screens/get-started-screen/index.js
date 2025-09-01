import {PrimaryButton} from 'components/atoms/buttons';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {navigate} from 'navigation/navigation-ref';
import React from 'react';
import {ImageBackground, ScrollView, StatusBar, View} from 'react-native';
import Bold from 'typography/bold-text';
import styles from './styles';
import Regular from 'typography/regular-text';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import * as IMG from 'assets/images';
import { hexToRgba } from 'utils';



const GetStartedScreen = props => {
  const [loading, setLoading] = React.useState(false);


  return (
    <View style={[styles.container, {backgroundColor: colors.primary}]}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.primary}
        barStyle={'white'}
      />
       <ImageBackground
        source={IMG.eduBg} // Add a beautiful education background image
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={[hexToRgba(colors.primary, 0.8),  hexToRgba(colors.primary, 0.85)]}
          style={styles.gradientOverlay}
        >
      <View style={[styles.lottiecontainer]}>
        <LottieView
          source={require('../../assets/lotties/lottie4.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>

      <View style={styles.bottomcontainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.keyboradscrollcontent}>
          <Icon name="school" size={mvs(40)} color={colors.primary} style={{alignSelf:'center'}} />
          <Bold
            label={'Welcome Back'}
            color={colors.primary}
            fontSize={mvs(20)}
            style={styles.welcomeText}
          />
          <View style={{width: '90%', alignSelf: 'center'}}>
            <Regular
              fontSize={mvs(10)}
              numberOfLines={4}
              style={[
                styles.loginText,
                {
                  color: colors.black,
                },
              ]}
              label={
                'Learn anytime, anywhere with your personalized LMS. your personalized LMS.Ready to level up? Your learning journey starts here.Tap in, explore courses, and grow your skills'
              }
            />
          </View>
          <View style={styles.buttonsContainer}>
                  <PrimaryButton
                    containerStyle={[styles.studentButton,{
    backgroundColor: colors.primary
                    }]}
                    loading={loading}
                    onPress={() => navigate('Login', {is_student: 1})}
                    title={'Continue as Student'}
                    textStyle={styles.buttonText}
                  />
                  <PrimaryButton
                    containerStyle={styles.parentButton}
                    loading={loading}
                    onPress={() => navigate('Login', {is_student: 0})}
                    title={'Continue as Parent'}
                    textStyle={styles.buttonText}
                  />
                </View>

      
        </ScrollView>
      </View>
      </LinearGradient>
      </ImageBackground>
    </View>
  );
};
export default GetStartedScreen;
