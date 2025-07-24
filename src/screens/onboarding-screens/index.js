import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableWithoutFeedback, 
  Keyboard 
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import { colors } from 'config/colors';
import { styles } from './style';
import { mvs } from 'config/metrices';

const OnboardingScreen = ({ navigation }) => {
  const [name, setName] = useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Onboarding
          onSkip={() => navigation.replace('SignIn')}
          onDone={() => navigation.replace('SignIn')}
          pages={[
            {
              backgroundColor: '#fff',
              image: (
                <LottieView
                  source={require('../../assets/lotties/lottie2.json')}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
              ),
              title: 'Welcome',
              subtitle: 'Enter your name to personalize your experience!',
              titleStyles: { color: colors.primary, fontSize: mvs(30) },
            },
            {
              backgroundColor: '#fdeb93',
              image: (
                <LottieView
                  source={require('../../assets/lotties/lottie2.json')}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
              ),
              title: 'Stay Connected',
              subtitle: 'Connect with people around the world!',
              titleStyles: { color: colors.primary, fontSize: mvs(30) },
            },
            {
              backgroundColor: '#e9bcbe',
              image: (
                <LottieView
                  source={require('../../assets/lotties/lottie3.json')}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
              ),
              title: 'Let’s Get Started!',
              subtitle: 'Sign up and enjoy the experience!',
              titleStyles: { color: colors.primary, fontSize: mvs(30) },
            },
          ]}
        />

        {/* Input Field Overlay */}
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={localStyles.inputContainer}
        >
          <TextInput
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            style={localStyles.input}
            placeholderTextColor="#666"
          />
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const localStyles = StyleSheet.create({
  inputContainer: {
    position: 'absolute',
    bottom: 150, // Adjust as needed
    width: '80%',
    alignSelf: 'center',
  },
  input: {
    height: mvs(50),
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
});

export default OnboardingScreen;
