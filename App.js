import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, SafeAreaView, Button } from 'react-native';
import axios from 'axios';
import { useState } from 'react';

export default function App() {
  const [text, onChangeText] = React.useState('Useless Text');
  const [number, onChangeNumber] = React.useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);
  const [error, setError] = useState('');

  const buscarEndereco = async () => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        setError('CEP não encontrado.');
        setEndereco(null);
      } else {
        setEndereco(response.data);
        setError('');
      }
    } catch (err) {
      setError('Erro ao buscar endereço.');
      setEndereco(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Digite seu CEP: </Text>
      <TextInput
        style={styles.input}
        onChangeText={setCep}
        value={cep}
        placeholder="00000-000"
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
        keyboardType="numeric"
      />
      <Button title="Buscar Endereço" onPress={buscarEndereco} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {endereco && (
        <View style={styles.result}>
          <Text>Rua: {endereco.logradouro} </Text>
          <Text>Bairro: {endereco.bairro} </Text>
          <Text>Cidade: {endereco.localidade} </Text>
          <Text>Estado: {endereco.uf} </Text>
        </View>
      )}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 12,
    padding: 10,
    width: '80%', 
  },
});
