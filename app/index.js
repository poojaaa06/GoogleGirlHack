import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import LottieView from 'lottie-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Link } from 'expo-router';
import { useFonts, Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';

export default function App() {
  const [showContent, setShowContent] = useState(false);
  const animatedValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(animatedValue.value, { duration: 1000 }),
    transform: [{ scale: withTiming(animatedValue.value, { duration: 1000 }) }],
  }));

  useEffect(() => {
    animatedValue.value = 1;
  }, []);

  const handleAnimationFinish = () => {
    setTimeout(() => setShowContent(true), 0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        source={require('../assets/lottie/period.json')} // You'll need to add a relevant Lottie animation
        autoPlay
        loop={false}
        onAnimationFinish={handleAnimationFinish}
        style={styles.lottie}
      />
      <Animated.Text style={[styles.appName, animatedStyle]}>
        CycleCare
      </Animated.Text>
      {showContent && (
        <>
          <Text style={styles.subtitle}>Your personal cycle companion</Text>
          <Animated.View style={[styles.buttonContainer, animatedStyle]}>
            <Link href="/onboarding" asChild>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Get Started</Text>
                <Icon name="arrow-right" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </Link>
          </Animated.View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Privacy Policy | Terms and Conditions Apply</Text>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF5F7',
  },
  lottie: {
    width: 300,
    height: 300,
    marginBottom: 10,
    marginLeft: 55,
  },
  buttonContainer: {
    marginTop: 40,
  },
  button: {
    backgroundColor: '#FF6B9C',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  appName: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FF4081',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#666666',
    marginTop: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
  },
  footerText: {
    color: '#6D6D6D',
    fontSize: 14,
    opacity: 0.8,
  },
});