import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

export default function SymptomsLog() {
  const router = useRouter();
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [notes, setNotes] = useState('');

  const symptoms = {
    'Physical': ['Cramps', 'Headache', 'Bloating', 'Breast Tenderness', 'Acne', 'Backache'],
    'Emotional': ['Mood Swings', 'Anxiety', 'Depression', 'Irritability', 'Food Cravings'],
    'Other': ['Fatigue', 'Insomnia', 'Nausea', 'Dizziness']
  };

  const toggleSymptom = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleSave = () => {
    // Save symptoms and notes to storage/backend
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-left" size={24} color="#333333" />
        </TouchableOpacity>
        <Text style={styles.title}>Log Symptoms</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {Object.entries(symptoms).map(([category, categorySymptoms]) => (
          <View key={category} style={styles.category}>
            <Text style={styles.categoryTitle}>{category}</Text>
            <View style={styles.symptomsGrid}>
              {categorySymptoms.map((symptom) => (
                <TouchableOpacity
                  key={symptom}
                  style={[
                    styles.symptomButton,
                    selectedSymptoms.includes(symptom) && styles.symptomButtonActive
                  ]}
                  onPress={() => toggleSymptom(symptom)}
                >
                  <Text style={[
                    styles.symptomText,
                    selectedSymptoms.includes(symptom) && styles.symptomTextActive
                  ]}>
                    {symptom}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.notesSection}>
          <Text style={styles.notesSectionTitle}>Notes</Text>
          <TextInput
            style={styles.notesInput}
            multiline
            placeholder="Add any additional notes..."
            value={notes}
            onChangeText={setNotes}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#FFD6E4',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  saveButton: {
    color: '#FF4081',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  category: {
    marginBottom: 25,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  symptomButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFD6E4',
  },
  symptomButtonActive: {
    backgroundColor: '#FF4081',
    borderColor: '#FF4081',
  },
  symptomText: {
    color: '#666666',
    fontSize: 16,
  },
  symptomTextActive: {
    color: '#FFFFFF',
  },
  notesSection: {
    marginTop: 20,
  },
  notesSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  notesInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    height: 120,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#FFD6E4',
  },
});