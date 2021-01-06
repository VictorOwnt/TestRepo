import React, { useEffect, useState } from 'react';
import {SafeAreaView, TextInput, View, Text, TouchableOpacity } from 'react-native';
import dek from '../../encryption/dataEncryption';
import kek from '../../encryption/keyEncryption';
import styles from './styles';


export default function HomeScreen({route, navigation}) {
  const [value, setValue] = useState('');
  const [generatedKey, setGeneratedKey] = useState();
  const [dekData, setDekData] = useState({cipher: '', iv: ''});
  const [encryptedObj, setEncryptedObj] = useState({data: '', key: ''});
  const [encryptedData, setEncryptedData] = useState({cipher: '', iv: ''});
  const [encryptedKey, setEncryptedKey] = useState();
  const [valueAfterDecrypt, setValueAfterDecrypt] = useState('');
  
  useEffect(() => {
    setEncryptedData(encryptedObj.data);
    setEncryptedKey(encryptedObj.key);
  }, [encryptedObj])

  const uid = 'unieke sleutel voor user';

  const encrypt = () => {
    try {
      dek.generateKey(uid).then((key) => {
        setGeneratedKey(key);
        dek.encryptData(value, key).then(async (dekdata) => {
          setDekData(dekdata);
          await kek.encrypt(key).then(async (kekdata) => {
            //Data encypted met Aes, key om te ontcijferen encrypted met google KMS.
            console.log('encrypted!');
            setEncryptedObj({data: dekdata, key: kekdata});
          })
        })
      })
    } catch (e) {
      console.error(e);
    }
  }

  const decrypt = async () => {
    try {
      await kek.decrypt(encryptedKey).then(async (key) => {
        console.log(encryptedData);
        await dek.decryptData(encryptedData, key).then((res) => {
          setValueAfterDecrypt(res);
        })
      })
    } catch (e) {
      console.error(e);
    }
  }
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexGrow: 1,
            border: 'solid',
            borderWidth: 2,
            borderColor: '#ccc',
          }}
        >
        <TextInput style={styles.text} value={value} onChangeText={(value) => setValue(value)}/>
        <TouchableOpacity style={styles.button} onPress={() => encrypt()}>
          <Text>Encrypt!</Text>
        </TouchableOpacity>
        <Text style={styles.text}>{'DATA ENC: cipher: ' + dekData.cipher + ' iv: '  + dekData.iv}</Text>
        <Text style={styles.text}>{'GEN KEY: ' + generatedKey}</Text>
        <Text style={styles.text}>{'AFTER KEY ENC: data:' + 'cipher: ' + encryptedData.cipher + ' iv: ' + encryptedData.iv}</Text>
        <Text style={styles.text}>{'AFTER KEY ENC: key:' + encryptedKey}</Text>
        <TouchableOpacity style={styles.button} onPress={() => decrypt()}>
          <Text>Decrypt!</Text>
        </TouchableOpacity>
        <Text style={styles.text}>{'VALUE AFTER DEC: ' + valueAfterDecrypt}</Text>
        </View>
      </SafeAreaView>
  )
}