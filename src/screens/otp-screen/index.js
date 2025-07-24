import OtpModal from 'components/molecules/modals/otp-modal';
import React, { useState } from 'react';
import { View, Button } from 'react-native';
const OtpScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [otpValue, setOtpValue] = useState('');
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="Open OTP Modal" onPress={() => setModalVisible(true)} />
        
        {/* OTP Modal */}
        <OtpModal
          visible={modalVisible}
          setValue={setOtpValue}
          value={otpValue}
          email="user@example.com"
          onClose={() => setModalVisible(false)}
          onPress={() => {
            console.log('Entered OTP:', otpValue);
            setModalVisible(false);
          }}
        />
      </View>
    );
  };
  
  export default OtpScreen;
  