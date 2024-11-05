import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [lastPeriod, setLastPeriod] = useState(new Date());
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);

  const handleComplete = () => {
    // Save data to storage/backend
    router.push('/dashboard');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.question}>When was your last period?</Text>
            <DateTimePicker
              value={lastPeriod}
              mode="date"
              display="spinner"
              onChange={(event, date) => setLastPeriod(date)}
            />
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.question}>How long is your typical cycle?</Text>
            <View style={styles.numberPickerContainer}>
              <TouchableOpacity
                onPress={() => setCycleLength(prev => Math.max(21, prev - 1))}
                style={styles.numberButton}
              >
                <Icon name="minus" size={20} color="#FF2E6C" />
              </TouchableOpacity>
              <Text style={styles.numberDisplay}>{cycleLength} days</Text>
              <TouchableOpacity
                onPress={() => setCycleLength(prev => Math.min(35, prev + 1))}
                style={styles.numberButton}
              >
                <Icon name="plus" size={20} color="#FF2E6C" />
              </TouchableOpacity>
            </View>
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.question}>How long does your period typically last?</Text>
            <View style={styles.numberPickerContainer}>
              <TouchableOpacity
                onPress={() => setPeriodLength(prev => Math.max(3, prev - 1))}
                style={styles.numberButton}
              >
                <Icon name="minus" size={20} color="#FF2E6C" />
              </TouchableOpacity>
              <Text style={styles.numberDisplay}>{periodLength} days</Text>
              <TouchableOpacity
                onPress={() => setPeriodLength(prev => Math.min(7, prev + 1))}
                style={styles.numberButton}
              >
                <Icon name="plus" size={20} color="#FF2E6C" />
              </TouchableOpacity>
            </View>
          </View>
        );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.progressContainer}>
        {[1, 2, 3].map(i => (
          <View
            key={i}
            style={[
              styles.progressDot,
              { backgroundColor: i <= step ? '#FF5F9E' : '#FF2E6C' },
            ]}
          />
        ))}
      </View>
      
      {renderStep()}

      <View style={styles.buttonContainer}>
        {step > 1 && (
          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={() => setStep(prev => prev - 1)}
          >
            <Text style={[styles.buttonText, styles.backButtonText]}>Back</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (step < 3) setStep(prev => prev + 1);
            else handleComplete();
          }}
        >
          <Text style={styles.buttonText}>
            {step === 3 ? 'Complete' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF', // Background color (white)
    padding: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 40,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D1617', // Text color (black)
    textAlign: 'center',
    marginBottom: 30,
  },
  numberPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  numberButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FF2E6C', // Updated border color
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberDisplay: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D1617', // Text color (black)
    minWidth: 100,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 40,
  },
  button: {
    backgroundColor: '#FF5F9E', // Updated button color
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FF5F9E', // Updated back button border color
  },
  buttonText: {
    color: '#FFFFFF', // Button text color (white)
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButtonText: {
    color: '#FF5F9E', // Back button text color
  },
});
