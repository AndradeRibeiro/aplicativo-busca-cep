import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Keyboard } from 'react-native';
import api from './services/api';

export default function App() {
  const [cep, setCep] = useState('');
  const [enderecoCompleto, setEnderecoCompleto] = useState(null);
  const inputCepRef = useRef(null);


  function limpar() {
    setCep('');
    setEnderecoCompleto(null);
    inputCepRef.current.focus();
  }

  async function buscar() {
    if(cep == '') {
      alert('Informe um cep válido');
      return;
    } 

    try {
      const response = await api.get(`/${cep}/json`);
      setEnderecoCompleto(response.data);
      Keyboard.dismiss();
    }
    catch (error) {
      alert('Ocorreu um erro, por favor tente novamente mais tarde');
    }
    
  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.containerInformeCep}>
        <Text style={styles.textoPrincipal}>
          Digite o cep desejado:
        </Text>

        <TextInput 
          style={styles.campo}
          placeholder="Ex: 00000-000"
          keyboardType="numeric"
          value={cep}
          onChangeText={(texto => setCep(texto))}
        />
      </View>

      <View style={styles.containerBotoes}>

        <TouchableOpacity 
          style={[styles.botao, {backgroundColor: '#32CD32'}]}
          onPress={limpar}
          ref={inputCepRef}
        >
          <Text style={styles.textoBotao}>Limpar</Text>
        </TouchableOpacity> 

        <TouchableOpacity 
          style={[styles.botao, {backgroundColor: '#A020F0'}]}
          onPress={buscar}
        >
          <Text style={styles.textoBotao}>Buscar</Text>
        </TouchableOpacity> 

      </View>

      {enderecoCompleto && 
        <View style={styles.resultadoContainer}>

          <Text style={styles.row}>
            <Text style={[styles.itemResultado, {fontWeight: 'bold'}]}> Cep: </Text>
            <Text style={styles.itemResultado}> {enderecoCompleto.cep} </Text>
          </Text>

          <Text style={styles.row}>
            <Text style={[styles.itemResultado, {fontWeight: 'bold'}]}> Logradouro: </Text>
            <Text style={styles.itemResultado}> {enderecoCompleto.logradouro} </Text>
          </Text>

          <Text style={styles.row}>
            <Text style={[styles.itemResultado, {fontWeight: 'bold'}]}> Bairro: </Text>
            <Text style={styles.itemResultado}> {enderecoCompleto.bairro} </Text>
          </Text>

          <Text style={styles.row}>
            <Text style={[styles.itemResultado, {fontWeight: 'bold'}]}> Cidade: </Text>
            <Text style={styles.itemResultado}> {enderecoCompleto.localidade} </Text>
          </Text>

          <Text style={styles.row}>
            <Text style={[styles.itemResultado, {fontWeight: 'bold'}]}> Estado: </Text>
            <Text style={styles.itemResultado}> {enderecoCompleto.uf} </Text>
          </Text>
        </View>
      }
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  textoPrincipal: {
    marginTop: 25,
    marginBottom: 25,
    fontSize: 25,
    fontWeight: 'bold'
  },
  campo: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    width: '95%',
    padding: 10,
    fontSize: 18,
  },
  containerInformeCep: {
    alignItems: 'center',
    marginTop: 40
  },
  containerBotoes: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 50,
    justifyContent: 'space-around'
  },
  botao: {
    height: 50,
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 25,
  },
  textoBotao: {
    fontSize: 18,
    color: '#FFF',
  },
  resultadoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemResultado: {
    fontSize: 18,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center',
    marginBottom: 10
  }
});