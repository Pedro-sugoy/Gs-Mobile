import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';

export default function TelaDesliza({ usuarioId = 1, enderecoId = 1 }) {
  const [chuva, setChuva] = useState('');
  const [umidade, setUmidade] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [vento, setVento] = useState('');
  const [nuvens, setNuvens] = useState('');
  const [pressao, setPressao] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState(null);

  const validarNumero = (value, min, max) => {
    const num = parseFloat(value);
    return !isNaN(num) && num >= min && num <= max;
  };

  const calcularAlertaLocal = (dados) => {
    let pontos = 0;

    if (dados.chuva >= 10) pontos += 3;
    else if (dados.chuva >= 5) pontos += 2;
    else if (dados.chuva >= 1) pontos += 1;

    if (dados.umidade > 80) pontos += 2;
    else if (dados.umidade >= 60) pontos += 1;

    if (dados.vento > 10) pontos += 2;
    else if (dados.vento >= 5) pontos += 1;

    if (dados.nuvens > 70) pontos += 1;
    if (dados.pressao < 1000) pontos += 1;

    let nivel, descricao, probabilidade;

    if (pontos <= 2) {
      nivel = 'MUITO_BAIXO';
      descricao = 'Sem riscos. Condições estáveis.';
      probabilidade = 5;
    } else if (pontos <= 4) {
      nivel = 'BAIXO';
      descricao = 'Chuvas leves. Nenhum risco visível.';
      probabilidade = 15;
    } else if (pontos <= 6) {
      nivel = 'MODERADO';
      descricao = 'Condições que merecem atenção.';
      probabilidade = 40;
    } else if (pontos <= 8) {
      nivel = 'ALTO';
      descricao = 'Risco relevante de deslizamento.';
      probabilidade = 70;
    } else {
      nivel = 'CRITICO';
      descricao = 'Risco crítico. Ações imediatas recomendadas.';
      probabilidade = 90;
    }

    return { nivel, descricao, probabilidade };
  };

  const handleCalcular = async () => {
    if (
      !validarNumero(chuva, 0, 500) ||
      !validarNumero(umidade, 0, 100) ||
      !validarNumero(temperatura, -50, 60) ||
      !validarNumero(vento, 0, 150) ||
      !validarNumero(nuvens, 0, 100) ||
      !validarNumero(pressao, 800, 1100)
    ) {
      Alert.alert('Erro', 'Preencha todos os campos com valores válidos');
      return;
    }

    setLoading(true);
    setResultado(null);

    const dados = {
      chuva: parseFloat(chuva),
      umidade: parseFloat(umidade),
      temperatura: parseFloat(temperatura),
      vento: parseFloat(vento),
      nuvens: parseFloat(nuvens),
      pressao: parseFloat(pressao),
      usuarioId,
      enderecoId,
    };

    const alerta = calcularAlertaLocal(dados);


    setLoading(false);
    setResultado(alerta.nivel);

    Alert.alert(
      `Nível: ${alerta.nivel}`,
      `Descrição: ${alerta.descricao}\nProbabilidade: ${alerta.probabilidade}%`
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Calcular Chance de Deslizamento</Text>

      <Text style={styles.label}>Chuva (0 a 500)</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a quantidade de chuva"
        keyboardType="numeric"
        value={chuva}
        onChangeText={setChuva}
      />

      <Text style={styles.label}>Umidade (0 a 100)</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a umidade"
        keyboardType="numeric"
        value={umidade}
        onChangeText={setUmidade}
      />

      <Text style={styles.label}>Temperatura (-50 a 60)</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a temperatura"
        keyboardType="numeric"
        value={temperatura}
        onChangeText={setTemperatura}
      />

      <Text style={styles.label}>Vento (0 a 150)</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a velocidade do vento"
        keyboardType="numeric"
        value={vento}
        onChangeText={setVento}
      />

      <Text style={styles.label}>Nuvens (0 a 100)</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a porcentagem de nuvens"
        keyboardType="numeric"
        value={nuvens}
        onChangeText={setNuvens}
      />

      <Text style={styles.label}>Pressão (800 a 1100)</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a pressão atmosférica"
        keyboardType="numeric"
        value={pressao}
        onChangeText={setPressao}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#1e40af" style={{ marginTop: 20 }} />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleCalcular}>
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>
      )}

      {resultado !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Nível calculado:</Text>
          <Text style={styles.resultValue}>{resultado}</Text>
        </View>
      )}
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 6,
    marginTop: 12,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  input: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#1e293b',
    width: '100%',
  },
  button: {
    backgroundColor: '#1e40af',
    borderRadius: 8,
    marginTop: 20,
    paddingVertical: 12,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 25,
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 18,
    color: '#475569',
    fontWeight: '700',
  },
  resultValue: {
    fontSize: 24,
    color: '#ef4444',
    fontWeight: '700',
    marginTop: 8,
  },
});
