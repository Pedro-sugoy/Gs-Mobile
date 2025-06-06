import { Linking } from 'react-native';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, Image, TouchableOpacity } from 'react-native';

export default function TelaDicas() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/Logo.png')} 
            style={styles.logo} 
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Dicas sobre Deslizamentos</Text>

        <View style={styles.cardRow}>
          <Image source={require('../assets/deslizamento1.jpeg')} style={styles.cardImage} />
          <Text style={styles.text}>
            🌍 <Text style={styles.bold}>O que é deslizamento?</Text>{'\n'}
            É o escorregamento de terra, rochas e vegetação em terrenos inclinados, causado por chuvas fortes, tipo de solo, inclinação e presença de água.
          </Text>
        </View>

        <View style={styles.cardRow}>
          <Text style={styles.text}>
            ⚠️ <Text style={styles.bold}>Sinais de alerta:</Text>{'\n'}
            Rachaduras no solo e nas paredes, inclinação de árvores e postes, surgimento de água inesperada no terreno.
          </Text>
          <Image source={require('../assets/deslizamento2.jpeg')} style={styles.cardImage} />
        </View>

        

        <View style={styles.card}>
          <Text style={styles.text}>
            🧠 <Text style={styles.bold}>Como prevenir?</Text>{'\n'}
            Evite desmatar encostas. Não jogue lixo em morros. Conserte vazamentos. Use vegetação com raízes longas. Peça ajuda da Defesa Civil.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.text}>
            👷‍♂️ <Text style={styles.bold}>Após o deslizamento:</Text>{'\n'}
            Afaste-se da área e não permita acesso de curiosos. Siga as orientações da Defesa Civil e dos Bombeiros.
          </Text>
        </View>

        <TouchableOpacity onPress={() => Linking.openURL("https://www.ba.gov.br/defesacivil/servicos/deslizamento-o-que-fazer")}>
          <Text style={[styles.text, { color: '#1e40af', marginTop: 10, textDecorationLine: 'underline' }]}>
            Fonte: www.ba.gov.br
          </Text>
        </TouchableOpacity>
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    width: '100%',
    maxWidth: 320,
    borderWidth: 1,
    borderColor:'green'
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
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
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
});
