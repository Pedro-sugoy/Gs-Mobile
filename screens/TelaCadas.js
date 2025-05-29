import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, StatusBar, Image, Alert, ScrollView } from 'react-native';

export default function TelaCadas() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');

  const handleCadastro = async () => {
    if (!nome || !email || !senha || !telefone || !bairro || !cidade) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const usuario = {
      nome,
      email,
      senha,
      telefone,
      endereco: {
        bairro,
        cidade
      }
    };

    try {
      const response = await fetch('http://<IP_DO_BACKEND>:8080/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
      });

      if (!response.ok) {
        Alert.alert('Erro', 'Erro ao cadastrar');
        return;
      }

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.logoContainer}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} resizeMode="contain" />
      </View>
      <Text style={styles.title}>Cadastro</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Nome</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} />
        <Text style={styles.label}>E-mail</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <Text style={styles.label}>Senha</Text>
        <TextInput style={styles.input} value={senha} onChangeText={setSenha} secureTextEntry />
        <Text style={styles.label}>Telefone</Text>
        <TextInput style={styles.input} value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />
        <Text style={styles.label}>Bairro</Text>
        <TextInput style={styles.input} value={bairro} onChangeText={setBairro} />
        <Text style={styles.label}>Cidade</Text>
        <TextInput style={styles.input} value={cidade} onChangeText={setCidade} />
        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 30,
    backgroundColor: '#dddbd9',
    alignItems: 'center',
    flexGrow: 1,
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
    marginBottom: 10,
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
    width: '100%',
    maxWidth: 320,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 6,
    marginTop: 12,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#1e293b',
  },
  button: {
    backgroundColor: '#1e40af',
    borderRadius: 8,
    marginTop: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
