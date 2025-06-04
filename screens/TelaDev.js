import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Linking,
} from 'react-native';

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
        
        <View style={styles.devBox}>
          <Image source={require('../assets/guilherme.jpg')} style={styles.devImage} />
          <View style={styles.devInfo}>
            <Text style={styles.devText}>Guilherme Camasmie Laiber de Jesus</Text>
            <Text style={styles.rmText}>RM: 554894</Text>

            <View style={styles.links}>
              <TouchableOpacity
                onPress={() => Linking.openURL('https://github.com/Gui11epio')}
                style={[styles.linkButton, styles.github]}>
                <Text style={styles.linkText}>GitHub</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL('https://www.linkedin.com/in/guilherme-camasmie-laiber-de-jesus-6111a82b6/')
                }
                style={[styles.linkButton, styles.linkedin]}>
                <Text style={styles.linkText}>LinkedIn</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.devBox}>
          <Image source={require('../assets/pedro.jpg')} style={styles.devImage} />
          <View style={styles.devInfo}>
            <Text style={styles.devText}>Pedro Manzo Yokoo</Text>
            <Text style={styles.rmText}>RM: 556115</Text>

            <View style={styles.links}>
              <TouchableOpacity
                onPress={() => Linking.openURL('https://github.com/Pedro-sugoy')}
                style={[styles.linkButton, styles.github]}>
                <Text style={styles.linkText}>GitHub</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL('https://www.linkedin.com/in/pedro-yokoo-36291a319/')
                }
                style={[styles.linkButton, styles.linkedin]}>
                <Text style={styles.linkText}>LinkedIn</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.devBox}>
          <Image source={require('../assets/fernando.jpg')} style={styles.devImage} />
          <View style={styles.devInfo}>
            <Text style={styles.devText}>Fernando Fernandes Prado</Text>
            <Text style={styles.rmText}>RM: 557982</Text>

            <View style={styles.links}>
              <TouchableOpacity
                onPress={() => Linking.openURL('https://github.com/fehunterbr')}
                style={[styles.linkButton, styles.github]}>
                <Text style={styles.linkText}>GitHub</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL('https://www.linkedin.com/in/fernando-prado-41b61524b/')
                }
                style={[styles.linkButton, styles.linkedin]}>
                <Text style={styles.linkText}>LinkedIn</Text>
              </TouchableOpacity>
            </View>
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
  devBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'green',
  },
  devImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    alignSelf: 'left',
  },
  devInfo: {
    alignItems: 'center',
  },
  devText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 5,
  },
  rmText: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 10,
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  linkButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginHorizontal: 5,
    marginTop: 8,
  },
  github: {
    backgroundColor: '#333',
  },
  linkedin: {
    backgroundColor: '#0e76a8',
  },
  linkText: {
    color: '#fff',
    fontSize: 14,
  },
});
