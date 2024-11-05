import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

const remediesData = {
  Cramps: {
    description: "Menstrual cramps occur due to uterine contractions and can range from mild to severe.",
    remedies: [
      {
        title: "Heat Therapy",
        description: "Apply a heating pad to your lower abdomen or take a warm bath",
        icon: "fire"
      },
      {
        title: "Exercise",
        description: "Light exercise like walking or yoga can help reduce cramping",
        icon: "bicycle"
      },
      {
        title: "Hydration",
        description: "Drink plenty of water and warm herbal teas",
        icon: "tint"
      }
    ]
  },
  Headache: {
    description: "Hormonal headaches are common during menstruation due to estrogen level changes.",
    remedies: [
      {
        title: "Rest in Dark Room",
        description: "Find a quiet, dark place to rest and avoid bright screens",
        icon: "moon-o"
      },
      {
        title: "Stay Hydrated",
        description: "Drink plenty of water and avoid caffeine",
        icon: "tint"
      },
      {
        title: "Cold Compress",
        description: "Apply a cold compress to your forehead and temples",
        icon: "snowflake-o"
      }
    ]
  },
  "Mood Swings": {
    description: "Emotional changes are normal during menstruation due to hormonal fluctuations.",
    remedies: [
      {
        title: "Meditation",
        description: "Practice deep breathing and mindfulness exercises",
        icon: "leaf"
      },
      {
        title: "Regular Exercise",
        description: "Physical activity can help stabilize mood",
        icon: "heartbeat"
      },
      {
        title: "Balanced Diet",
        description: "Eat regular, nutritious meals and avoid sugar spikes",
        icon: "apple"
      }
    ]
  },
  Fatigue: {
    description: "Feeling tired during menstruation is common due to hormonal changes and iron loss.",
    remedies: [
      {
        title: "Rest Well",
        description: "Ensure you get adequate sleep and take short naps if needed",
        icon: "bed"
      },
      {
        title: "Iron-Rich Foods",
        description: "Include leafy greens, lean meats, and legumes in your diet",
        icon: "cutlery"
      },
      {
        title: "Light Exercise",
        description: "Gentle movement can help boost energy levels",
        icon: "child"
      }
    ]
  },
  Bloating: {
    description: "Hormonal changes can cause water retention and digestive changes.",
    remedies: [
      {
        title: "Limit Salt",
        description: "Reduce sodium intake to minimize water retention",
        icon: "ban"
      },
      {
        title: "Stay Active",
        description: "Light exercise can help reduce bloating",
        icon: "bicycle"
      },
      {
        title: "Herbal Tea",
        description: "Peppermint or ginger tea can help with digestion",
        icon: "coffee"
      }
    ]
  }
};

const SymptomRemedies = () => {
  const router = useRouter();
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const handleSymptomPress = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((item) => item !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Icon name="arrow-left" size={20} color="#1D1617" />
        </TouchableOpacity>
        <Text style={styles.title}>Symptom Remedies</Text>
      </View>

      {/* Log Symptoms Section */}
      <View style={styles.symptomsSection}>
        <Text style={styles.sectionTitle}>Log Symptoms</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.symptomsScroll}>
          {Object.keys(remediesData).map((symptom, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.symptomButton,
                selectedSymptoms.includes(symptom) ? styles.selectedSymptom : null
              ]}
              onPress={() => handleSymptomPress(symptom)}
            >
              <Text style={styles.symptomText}>{symptom}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Remedies Section */}
      <View style={styles.remediesSection}>
        {selectedSymptoms.map((symptom, index) => (
          <View key={index} style={styles.symptomCard}>
            <Text style={styles.symptomTitle}>{symptom}</Text>
            <Text style={styles.description}>{remediesData[symptom].description}</Text>
            
            <View style={styles.remediesList}>
              {remediesData[symptom].remedies.map((remedy, remedyIndex) => (
                <View key={remedyIndex} style={styles.remedyItem}>
                  <View style={styles.remedyIcon}>
                    <Icon name={remedy.icon} size={24} color="#FFFFFF" />
                  </View>
                  <View style={styles.remedyContent}>
                    <Text style={styles.remedyTitle}>{remedy.title}</Text>
                    <Text style={styles.remedyDescription}>{remedy.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D1617',
    marginLeft: 10,
  },
  symptomsSection: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D1617',
    marginBottom: 10,
  },
  symptomsScroll: {
    flexDirection: 'row',
  },
  symptomButton: {
    backgroundColor: '#FF5F9E', // Bright pink for buttons
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  selectedSymptom: {
    backgroundColor: '#FF2E6C', // Darker pink for selected state
  },
  symptomText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  remediesSection: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  symptomCard: {
    backgroundColor: '#FFE5EB', // Lighter pink for symptom cards
    marginBottom: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  symptomTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF5F9E',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#7B6F72',
    marginBottom: 20,
    lineHeight: 20,
  },
  remediesList: {
    gap: 15,
  },
  remedyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8F8', // Light grey for remedy items
    padding: 15,
    borderRadius: 12,
  },
  remedyIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#FFCCDB', // Very light pink for icons
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  remedyContent: {
    flex: 1,
  },
  remedyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1D1617',
  },
  remedyDescription: {
    fontSize: 14,
    color: '#7B6F72',
  },
});


export default SymptomRemedies;