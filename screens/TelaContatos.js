import React from 'react';
import { View, ScrollView, StyleSheet, StatusBar, Image, Text } from 'react-native';

export default function TelaContatos() {
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
          <View style={styles.cardRow}>
            <Image source={require('../assets/defesa_civil.png')} style={styles.cardImage} />
                <Text style={styles.text}>
                    🚨 <Text style={styles.bold}>Durante o risco:</Text>{'\n'}
                    Defesa Civil (199)
                </Text>
            </View>

            <View style={styles.cardRow}>
            <Image source={require('../assets/bombeiro.jpeg')} style={styles.cardImage} />
                <Text style={styles.text}>
                    🚨 <Text style={styles.bold}>Durante o risco/Pessoa acidentada:</Text>{'\n'}
                    Bombeiros (193)
                </Text>
            </View>

            <View style={styles.cardRow}>
            <Image source={require('../assets/samu.jpg')} style={styles.cardImage} />
                <Text style={styles.text}>
                    🚨 <Text style={styles.bold}>Pessoa Acidentada:</Text>{'\n'}
                    Samu (192)
                </Text>
            </View>

            <View style={styles.cardRow}>
            <Image source={require('../assets/policia_militar.jpg')} style={styles.cardImage} />
                <Text style={styles.text}>
                    🚨 <Text style={styles.bold}>Durante o risco:</Text>{'\n'}
                    Policia Militar (190)
                </Text>
            </View>

            <View style={styles.cardRow}>
            <Image source={require('../assets/policia_civil.jpeg')} style={styles.cardImage} />
                <Text style={styles.text}>
                    🚨 <Text style={styles.bold}>Durante o risco:</Text>{'\n'}
                    Policia Civil (o número muda por estado) SP- 199
                </Text>
            </View>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
  logo: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  logoContainer: {
    alignItems: 'flex-start',
    marginBottom: 40,
    width: '100%',
  },
  cardRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    borderWidth: 1,
    borderColor:'green'
  },
  text: {
    fontSize: 17,
    color: '#475569',
    flex: 1,
    lineHeight: 24,
  },
  bold: {
    fontWeight: 'bold',
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});
