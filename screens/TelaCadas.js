import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
  StatusBar, Image, Alert, ScrollView
} from 'react-native';

export default function TelaCadas() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [usuarioId, setUsuarioId] = useState(null);

  const formatarTelefone = (numero) => {
    const limpo = numero.replace(/\D/g, '');
    if (limpo.length !== 11 || limpo[2] !== '9') return null;
    const ddd = limpo.slice(0, 2);
    const parte1 = limpo.slice(2, 7);
    const parte2 = limpo.slice(7);
    return `(${ddd}) ${parte1}-${parte2}`;
  };

  const buscarUsuarioPorEmail = async () => {
  try {
    const response = await fetch(`https://geoalertac.onrender.com/api/Usuario/ObterPorEmail/${email}`);
    if (!response.ok) {
      Alert.alert('Erro', 'Usuário não encontrado');
      return;
    }

    const usuarioData = await response.json();
    setNome(usuarioData.userName);
    setSenha(usuarioData.senha);
    setTelefone(usuarioData.telefone);
    setUsuarioId(usuarioData.id);

    const enderecoResponse = await fetch(`https://geoalertac.onrender.com/api/Endereco`);
    let bairroStr = 'Não encontrado';
    let cidadeStr = 'Não encontrada';

    if (enderecoResponse.ok) {
      const enderecos = await enderecoResponse.json();
      const enderecoDoUsuario = enderecos.find(e => e.usuarioId === usuarioData.id);
      if (enderecoDoUsuario) {
        setBairro(enderecoDoUsuario.bairro);
        setCidade(enderecoDoUsuario.cidade);
        bairroStr = enderecoDoUsuario.bairro;
        cidadeStr = enderecoDoUsuario.cidade;
      } else {
        setBairro('');
        setCidade('');
      }
    }

    Alert.alert(
      'Usuário encontrado',
      `Nome: ${usuarioData.userName}\nE-mail: ${usuarioData.email}\nTelefone: ${usuarioData.telefone}\nBairro: ${bairroStr}\nCidade: ${cidadeStr}`
    );
  } catch (err) {
    Alert.alert('Erro', 'Falha ao buscar usuário');
  }
};



  const handleCadastro = async () => {
    if (!nome || !email || !senha || !telefone || !bairro || !cidade) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const telefoneFormatado = formatarTelefone(telefone);
    if (!telefoneFormatado) {
      Alert.alert('Erro', 'Telefone inválido. Use o formato (11) 91234-5678');
      return;
    }

    const usuario = {
      userName: nome,
      email,
      senha,
      telefone: telefoneFormatado,
    };

    try {
      const userResponse = await fetch('https://geoalertac.onrender.com/api/Usuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario),
      });

      if (!userResponse.ok) {
        const msg = await userResponse.text();
        console.log('Erro ao cadastrar:', msg);
        Alert.alert('Erro', 'Erro ao cadastrar usuário');
        return;
      }

      const novoUsuario = await userResponse.json();
      setUsuarioId(novoUsuario.id);

      const endereco = {
        bairro,
        cidade,
        usuarioId: novoUsuario.id,
      };

      const enderecoResponse = await fetch('https://geoalertac.onrender.com/api/Endereco', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(endereco),
      });

      if (!enderecoResponse.ok) {
        Alert.alert('Erro', 'Usuário cadastrado, mas falha no endereço');
        return;
      }

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao conectar ao servidor');
    }
  };

  const handleAtualizar = async () => {
  if (!email) {
    Alert.alert('Erro', 'Informe o e-mail para buscar o usuário');
    return;
  }

  const telefoneFormatado = formatarTelefone(telefone);
  if (!telefoneFormatado) {
    Alert.alert('Erro', 'Telefone inválido');
    return;
  }

  try {
    const usuarioResponse = await fetch(`https://geoalertac.onrender.com/api/Usuario/ObterPorEmail/${email}`);
    if (!usuarioResponse.ok) {
      Alert.alert('Erro', 'Usuário não encontrado');
      return;
    }

    const usuario = await usuarioResponse.json();
    const usuarioId = usuario.id;

    const usuarioAtualizado = {
      id: usuarioId,
      userName: nome,
      email,
      senha,
      telefone: telefoneFormatado,
    };

    const atualizarUsuario = await fetch(`https://geoalertac.onrender.com/api/Usuario/${usuarioId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuarioAtualizado),
    });

    if (!atualizarUsuario.ok) {
      Alert.alert('Erro', 'Erro ao atualizar usuário');
      return;
    }

    const enderecoResponse = await fetch(`https://geoalertac.onrender.com/api/Endereco/${usuarioId}`);
    if (!enderecoResponse.ok) {
      Alert.alert('Erro', 'Endereço não encontrado para o usuário');
      return;
    }

    const endereco = await enderecoResponse.json();
    const enderecoId = endereco.id;

    const enderecoAtualizado = {
      id: enderecoId,
      bairro,
      cidade,
      usuarioId: usuarioId,
    };

    const atualizarEndereco = await fetch(`https://geoalertac.onrender.com/api/Endereco/${enderecoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enderecoAtualizado),
    });

    if (!atualizarEndereco.ok) {
      Alert.alert('Erro', 'Usuário atualizado, mas erro ao atualizar endereço');
      return;
    }

    Alert.alert('Sucesso', 'Usuário e endereço atualizados com sucesso!');
  } catch (error) {
    Alert.alert('Erro', 'Erro ao conectar ao servidor');
  }
};


  const handleDeletar = async () => {
    if (!usuarioId) {
      Alert.alert('Erro', 'Busque um usuário para deletar');
      return;
    }

    try {
      const response = await fetch(`https://geoalertac.onrender.com/api/Usuario/${usuarioId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        Alert.alert('Erro', 'Erro ao deletar usuário');
        return;
      }

      setNome('');
      setEmail('');
      setSenha('');
      setTelefone('');
      setBairro('');
      setCidade('');
      setUsuarioId(null);
      Alert.alert('Sucesso', 'Usuário deletado');
    } catch {
      Alert.alert('Erro', 'Erro de conexão');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.logoContainer}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
      </View>

      <View style={styles.topButtons}>
        <TouchableOpacity style={[styles.smallButton]} onPress={buscarUsuarioPorEmail}>
          <Text style={styles.smallButtonText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.smallButton]} onPress={handleAtualizar}>
          <Text style={styles.smallButtonText}>Atualizar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.smallButton]} onPress={handleDeletar}>
          <Text style={styles.smallButtonText}>Deletar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.smallButton, styles.cadastrarButton]} onPress={handleCadastro}>
          <Text style={styles.smallButtonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Cadastro</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Nome</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} />
        <Text style={styles.label}>E-mail</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" />
        <Text style={styles.label}>Senha</Text>
        <TextInput style={styles.input} value={senha} onChangeText={setSenha} secureTextEntry />
        <Text style={styles.label}>Telefone</Text>
        <TextInput style={styles.input} value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" placeholder="(11) 91234-5678" />
        <Text style={styles.label}>Bairro</Text>
        <TextInput style={styles.input} value={bairro} onChangeText={setBairro} />
        <Text style={styles.label}>Cidade</Text>
        <TextInput style={styles.input} value={cidade} onChangeText={setCidade} />
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
    marginBottom: 20,
    width: '100%',
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 6,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  smallButton: {
    backgroundColor: '#334155',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  cadastrarButton: {
    backgroundColor: '#1e40af',
  },
  smallButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 20,
    textAlign: 'center',
    width: '100%',
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
    padding: 10,
    borderRadius: 6,
    fontSize: 16,
  },
});
