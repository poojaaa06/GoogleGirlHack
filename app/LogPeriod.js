import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function LogPeriod({ navigation, route }) {
  const { setCurrentCycle } = route.params; // Get setCurrentCycle from route params
  const [startDate, setStartDate] = useState('');

  const handleLogPeriod = () => {
    const newPeriodStart = new Date(startDate);
    setCurrentCycle(prevCycle => ({
      ...prevCycle,
      periodStart: newPeriodStart,
      nextPeriod: new Date(newPeriodStart.getTime() + 28 * 24 * 60 * 60 * 1000),
      fertile: {
        start: new Date(newPeriodStart.getTime() + 12 * 24 * 60 * 60 * 1000),
        end: new Date(newPeriodStart.getTime() + 16 * 24 * 60 * 60 * 1000),
      },
    }));
    navigation.goBack(); // Navigate back to the dashboard
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log Your Period</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter start date (YYYY-MM-DD)"
        value={startDate}
        onChangeText={setStartDate}
      />
      <TouchableOpacity style={styles.logButton} onPress={handleLogPeriod}>
        <Text style={styles.logButtonText}>Log Period</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF5F7',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#FF4081',
    borderRadius: 5,
    marginBottom: 20,
  },
  logButton: {
    backgroundColor: '#FF4081',
    padding: 15,
    borderRadius: 25,
  },
  logButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
