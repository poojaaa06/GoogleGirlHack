import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Calendar } from 'react-native-calendars';
import { Link } from 'expo-router';

export default function Dashboard() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [currentCycle, setCurrentCycle] = useState({
    periodStart: new Date(),
    nextPeriod: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
    fertile: {
      start: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
      end: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000),
    },
  });

  const [markedDates, setMarkedDates] = useState({});

  const showPeriodStartReminders = () => {
    Alert.alert(
      "Period Started! 🌸",
      "Remember to:\n\n" +
      "✓ Stock up on pads/tampons\n" +
      "✓ Get your favorite chocolates\n" +
      "✓ Have pain relief medication handy\n" +
      "✓ Keep some comfort snacks ready\n" +
      "✓ Schedule some self-care time",
      [
        {
          text: "Thanks for reminding! 💝",
          onPress: () => console.log("Reminder acknowledged")
        }
      ]
    );
  };

  const handleLogPeriod = (date) => {
    const newPeriodStart = new Date(date);
    const newNextPeriod = new Date(newPeriodStart);
    newNextPeriod.setDate(newNextPeriod.getDate() + 28);

    const newFertileStart = new Date(newPeriodStart);
    newFertileStart.setDate(newFertileStart.getDate() + 12);
    
    const newFertileEnd = new Date(newPeriodStart);
    newFertileEnd.setDate(newFertileEnd.getDate() + 16);

    setCurrentCycle({
      periodStart: newPeriodStart,
      nextPeriod: newNextPeriod,
      fertile: {
        start: newFertileStart,
        end: newFertileEnd,
      },
    });

    setIsModalVisible(false);
    showPeriodStartReminders();
  };

  useEffect(() => {
    const marks = {};
    const periodLength = 28;
    const cycleCount = 12;

    for (let cycle = 0; cycle < cycleCount; cycle++) {
      const cycleStartDate = new Date(currentCycle.periodStart);
      cycleStartDate.setDate(cycleStartDate.getDate() + cycle * periodLength);

      for (let i = 0; i < 5; i++) {
        const date = new Date(cycleStartDate);
        date.setDate(date.getDate() + i);
        marks[date.toISOString().split('T')[0]] = {
          selected: true,
          selectedColor: '#FF5F9E',
        };
      }

      const fertileStart = new Date(cycleStartDate);
      fertileStart.setDate(fertileStart.getDate() + 12);
      const fertileEnd = new Date(cycleStartDate);
      fertileEnd.setDate(fertileEnd.getDate() + 16);

      for (let d = new Date(fertileStart); d <= fertileEnd; d.setDate(d.getDate() + 1)) {
        marks[d.toISOString().split('T')[0]] = {
          selected: true,
          selectedColor: '#FF2E6C',
        };
      }

      const expectedDate = new Date(cycleStartDate);
      expectedDate.setDate(expectedDate.getDate() + periodLength);
      marks[expectedDate.toISOString().split('T')[0]] = {
        selected: true,
        selectedColor: '#FF2E6C',
      };
    }

    setMarkedDates(marks);
  }, [currentCycle]);
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Cycle</Text>
        <TouchableOpacity 
          style={styles.logButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Icon name="plus" size={20} color="#FFFFFF" />
          <Text style={styles.logButtonText}>Log Period</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statusCard}>
        <Text style={styles.statusTitle}>Next Period in</Text>
        <Text style={styles.daysCount}>
          {Math.ceil((currentCycle.nextPeriod - new Date()) / (1000 * 60 * 60 * 24))} days
        </Text>
        <Text style={styles.statusDate}>
          Expected on {currentCycle.nextPeriod.toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.calendar}>
        <Calendar
          markedDates={markedDates}
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
            setIsModalVisible(true);
          }}
          theme={{
            backgroundColor: '#FFFFFF',
            calendarBackground: '#FFFFFF',
            textSectionTitleColor: '#7B6F72',
            selectedDayBackgroundColor: '#FF5F9E',
            selectedDayTextColor: '#FFFFFF',
            todayTextColor: '#FF5F9E',
            dayTextColor: '#1D1617',
            textDisabledColor: '#F7F8F8',
          }}
        />
      </View>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#FF5F9E' }]} />
          <Text style={styles.legendText}>Period Days</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#FF2E6C' }]} />
          <Text style={styles.legendText}>Fertile Window</Text>
        </View>
      </View>

      <View style={styles.symptomsSection}>
        <Text style={styles.sectionTitle}>Log Symptoms</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.symptomsScroll}>
          {['Cramps', 'Headache', 'Mood Swings', 'Fatigue', 'Bloating'].map((symptom, index) => (
            <Link href={`/SymptomRemedies`} asChild key={index}>
              <TouchableOpacity style={styles.symptomButton}>
                <Text style={styles.symptomText}>{symptom}</Text>
              </TouchableOpacity>
            </Link>
          ))}
        </ScrollView>
      </View>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Log Period Start Date</Text>
            <Text style={styles.modalDate}>
              {selectedDate || new Date().toISOString().split('T')[0]}
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.confirmButton]}
                onPress={() => handleLogPeriod(selectedDate || new Date())}
              >
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1D1617',
  },
  logButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF5F9E',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  logButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  statusTitle: {
    fontSize: 18,
    color: '#7B6F72',
  },
  daysCount: {
    fontSize: 50,
    color: '#FF5F9E',
    fontWeight: 'bold',
  },
  statusDate: {
    fontSize: 16,
    color: '#1D1617',
  },
  calendar: {
    margin: 20,
    marginTop:50,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  legendText: {
    color: '#7B6F72',
  },
  symptomsSection: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#1D1617',
    marginBottom: 10,
  },
  symptomsScroll: {
    flexDirection: 'row',
  },
  symptomButton: {
    backgroundColor: '#F7F8F8',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  symptomText: {
    color: '#7B6F72',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    color: '#1D1617',
    marginBottom: 10,
  },
  modalDate: {
    fontSize: 16,
    color: '#7B6F72',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#FF5F9E',
  },
  confirmButton: {
    backgroundColor: '#FF2E6C',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
