import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, StatusBar, Image, Alert } from 'react-native';

export default function TelaLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    Alert.alert('Login', `Email: ${email}\nSenha: ${senha}`);
  };

  const handleAtualizar = () => {
    Alert.alert('Atualizar', 'Função de atualização acionada.');
  };

  const handleDeletar = () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha o usuário antes de deletar.');
      return;
    }

    Alert.alert(
      'Confirmação',
      'Certeza que quer deletar?',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim',
          onPress: () => {
            // Aqui entra a lógica de deleção real
            Alert.alert('Deletado', 'Usuário deletado com sucesso.');
          },
          style: 'destructive'
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.topBar}>
        <Image
          source={require('../assets/Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.topButtons}>
          <TouchableOpacity style={styles.smallButton} onPress={handleAtualizar}>
            <Text style={styles.smallButtonText}>Atualizar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallButton} onPress={handleDeletar}>
            <Text style={styles.smallButtonText}>Deletar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.title}>Login</Text>

      <View style={styles.card}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <Text style={styles.cadastroText}>
          Caso não tenha um cadastro:
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate('TelaCadas')}>
          <Text style={styles.linkText}>Clique aqui para se cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dddbd9',
    paddingTop: 20,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  topBar: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  topButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  smallButton: {
    backgroundColor: '#334155',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  smallButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
  cadastroText: {
    marginTop: 20,
    fontSize: 15,
    color: '#475569',
    textAlign: 'center',
  },
  linkText: {
    marginTop: 5,
    color: '#1e40af',
    fontSize: 15,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});
