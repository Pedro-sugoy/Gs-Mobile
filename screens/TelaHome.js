import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ScrollView } from 'react-native';

export default function TelaHome() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <Image 
            source={require("../assets/Logo.png")}
            style={styles.image} 
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>GeoAlerta 👨🏻‍💼❗</Text>

        <View style={styles.card}>
        <Text style={styles.tiulo}>PROPOSTA</Text>
          <Text style={styles.paragraph}>
            Nosso aplicativo foi criado especialmente para pessoas que vivem em áreas vulneráveis a deslizamentos de terra, principalmente quem reside próximas a morros e encostas.
          </Text>

          <Text style={styles.tiulo}>CAUSA</Text>
          <Text style={styles.paragraph}>
            Esses deslizamentos são fenômenos naturais causados por diversos fatores, como fortes chuvas, o tipo de solo e relevo da região, além da interferência humana, como desmatamento e construções irregulares em áreas de risco.
          </Text>

          <Text style={styles.tiulo}>OBJETIVO</Text>
          <Text style={styles.paragraph}>
            Embora não seja possível evitar completamente os deslizamentos, nosso principal objetivo é monitorar e calcular a probabilidade de riscos nessas regiões, para que os moradores possam receber alertas antecipados e se preparar para situações de perigo.
          </Text>

          <Text style={styles.paragraph}>
            Nosso app vai além dos avisos: oferece orientações práticas e dicas importantes sobre como agir antes, durante e depois de um deslizamento, explicando suas causas e impactos, além de disponibilizar contatos de profissionais e órgãos especializados para análise e suporte.
          </Text>

          <Text style={styles.paragraph}>
            Para garantir que os alertas e informações sejam personalizados e precisos, solicitamos que o usuário cadastre o endereço de sua residência. Com essa informação, conseguimos monitorar melhor a área e fornecer um acompanhamento eficaz, ajudando a proteger vidas e minimizar perdas materiais.
          </Text>

          <Text style={styles.tiulo}>PRÓPOSITO</Text>
          <Text style={styles.paragraph}>
            O GeoAlerta é mais que um simples aplicativo de notificações — é uma ferramenta de prevenção e conscientização que busca apoiar as comunidades em áreas de risco, promovendo segurança e preparo diante de eventos naturais que podem ser devastadores.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dddbd9',
    paddingTop: 20,
    paddingHorizontal: 30,
    flex: 1,
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
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 10,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    color: '#334155',
    lineHeight: 26,
    marginBottom: 15,
    textAlign: 'left',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    width: '100%',
    maxWidth: 320,
    borderColor: 'green',
    borderWidth: 1,
  },
  tiulo: {
    fontSize:25
  }
});
