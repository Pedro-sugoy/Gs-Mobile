import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, StatusBar } from 'react-native';

export default function TelaDevs() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <Image 
            source={require("../assets/Logo.png")}
            style={styles.logo} 
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Desenvolvedores 👨‍💻</Text>

        <View style={styles.developerContainer}>
          <Image source={require('../assets/pedro.jpg')} style={styles.image} />
          <Text style={styles.text}>Pedro Manzo Yokoo - RM556115</Text>
        </View>

        <View style={styles.developerContainer}>
          <Image source={require('../assets/fernando.jpg')} style={styles.image} />
          <Text style={styles.text}>Fernando Fernandes Prado - RM557982</Text>
        </View>

        <View style={styles.developerContainer}>
          <Image source={require('../assets/guilherme.jpg')} style={styles.image} />
          <Text style={styles.text}>Guilherme Camasmie Laiber de Jesus - RM554894</Text>
        </View>
      </ScrollView>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dddbd9',
    paddingTop: 20,
    paddingHorizontal: 30,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'flex-start',
    marginBottom: 40,
    width: '100%',
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 20,
    textAlign: 'center',
  },
  developerContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
    width: '100%',
    maxWidth: 400,
    marginBottom: 20,
    borderColor:'green',
    borderWidth:1
  },
  image: {
    width: 80, 
    height: 80,
    borderRadius: 40, 
    marginBottom: 15,
  },
  text: {
    fontSize: 17,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 24,
  },
});
