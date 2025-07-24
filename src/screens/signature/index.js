import { colors } from 'config/colors';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const options = [
  { name: 'Fee Invoice Category', navigate: 'FeeInvoiceCategory' },
  { name: 'Register Course', navigate: 'RegisterCourse' },
  { name: 'Lms', navigate: 'Lms' },
  { name: 'DailyPlanner', navigate: 'DailyPlanner' },
  { name: 'Announcement', navigate: 'Announcement' },
  { name: 'Notifications', navigate: 'Notifications' },
  { name: 'Help desk', navigate: 'EmployeeChat' },
  { name: 'Profile', navigate: 'UserTab' }
];

const SignatureScreen = ({ navigation }) => {
  const handlePress = (option) => {
    console.log(`${option.name} pressed`);
    navigation.navigate(option.navigate);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={options}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.button} onPress={() => handlePress(item)}>
            <Text style={styles.buttonText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: 250,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignatureScreen;
