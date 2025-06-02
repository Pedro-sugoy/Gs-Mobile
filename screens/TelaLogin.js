import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, StatusBar, Image, Alert, ScrollView } from 'react-native';

export default function TelaLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loadingUserData, setLoadingUserData] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      const response = await fetch('http://192.168.0.8:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        Alert.alert('Erro', 'Usuário ou senha inválidos');
        return;
      }

      const data = await response.json();
      setToken(data.token);
      setUserId(data.id);

      await fetchUserData(data.id, data.token);
    } catch (error) {
      Alert.alert('Erro', 'Erro de conexão com o servidor');
    }
  };

  const fetchUserData = async (id, jwtToken) => {
    setLoadingUserData(true);
    try {
      const response = await fetch(`http://192.168.0.8:8080/usuarios/${id}`, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        Alert.alert('Erro', 'Não foi possível obter os dados do usuário');
        setLoadingUserData(false);
        return;
      }

      const user = await response.json();
      setUserData(user);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar dados do usuário');
    }
    setLoadingUserData(false);
  };

  const handleLogout = () => {
    setToken(null);
    setUserId(null);
    setUserData(null);
    setEmail('');
    setSenha('');
  };

  const handleDeletar = () => {
    if (!userId || !token) {
      Alert.alert('Erro', 'Você precisa estar logado para deletar o usuário.');
      return;
    }

    Alert.alert(
      'Confirmação',
      'Certeza que quer deletar seu usuário?',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim',
          onPress: async () => {
            try {
              const response = await fetch(`http://192.168.0.8:8080/usuarios/${userId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
              });

              if (!response.ok) {
                Alert.alert('Erro', 'Não foi possível deletar o usuário.');
                return;
              }

              Alert.alert('Deletado', 'Usuário deletado com sucesso.');
              handleLogout();
            } catch (error) {
              Alert.alert('Erro', 'Erro ao se conectar com o servidor.');
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.topBar}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} resizeMode="contain" />
        {token && (
          <View style={styles.topButtons}>
            <TouchableOpacity style={styles.smallButton} onPress={handleDeletar}>
              <Text style={styles.smallButtonText}>Deletar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.smallButton, { backgroundColor: '#a00' }]} onPress={handleLogout}>
              <Text style={styles.smallButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {!token && (
        <>
          <Text style={styles.title}>Login</Text>

          <View style={styles.card}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

            <Text style={styles.label}>Senha</Text>
            <TextInput style={styles.input} value={senha} onChangeText={setSenha} secureTextEntry />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <Text style={styles.cadastroText}>
              Caso não tenha um cadastro ou queira atualizá-lo:
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate('TelaCadas')}>
              <Text style={styles.linkText}>Cadastro / Atualizar</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {token && userData && (
        <View style={styles.card}>
          <Text style={styles.title}>Informações do Usuário</Text>
          <Text style={styles.infoText}>Nome: {userData.nome}</Text>
          <Text style={styles.infoText}>E-mail: {userData.email}</Text>
          <Text style={styles.infoText}>Telefone: {userData.telefone}</Text>
          {loadingUserData && <Text>Carregando dados...</Text>}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#dddbd9',
    paddingTop: 20,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    marginLeft: 8,
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
    marginBottom: 20,
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
  infoText: {
    fontSize: 18,
    marginBottom: 8,
    color: '#1e293b',
  },
});
