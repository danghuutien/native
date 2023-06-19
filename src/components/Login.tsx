import { StatusBar } from 'expo-status-bar';
import { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface typeLogin{
  email:string,
  password: string,
  device_name: string
}
export default function Login({ navigation }: any) {

  const [password, setPassword] = useState('')
  const [errPassword, setErrPassword] = useState('')
  const [username, setUserName] = useState('')
  const [errUsername, setErrUserName] = useState('')
  const onChangeUsername = (value:string)=>{
    // console.log(e);
    setUserName(value)
    setErrUserName('')

  }
  const onChangePassword = (value: string)=>{
    setPassword(value)
    setErrPassword('')

  }
  const saveToken = async (token:string) => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.log(error);
    }
  };
  const login = () => {
    if(username.trim() == ''){
      setErrUserName('Trường này không được để trống')
      return
    }else{
      if(password.trim() == ''){
        setErrPassword('Trường này không được để trống')
        return
      }

    }
    const data:typeLogin = { email: username, password : password, device_name: 'app' } 
    axios.post('/api/login', data)
      .then((response) => {
        if(response.data.token != null){
          console.log(response.data);
          saveToken(response.data.token)
          navigation.navigate('Home')

        }
      })
      .catch(error => {
        console.log(error)
      })
  }
  return (
    <View style={styles.container}>
      <View style={styles.border}>
        <Text style={styles.heading}>ĐĂNG NHẬP</Text>
        <TextInput
          style={inputStyles.input}
          onChangeText={onChangeUsername}
          value={username}
          placeholder="username"
          
        />
        <Text style={{color:'red', textAlign:'left'}}>{errUsername}</Text>
        <TextInput
          style={inputStyles.input}
          onChangeText={onChangePassword}
          placeholder="Password"
          value={password}
          secureTextEntry={true}
        />
        <Text style={{color:'red'}}>{errPassword}</Text>

        <StatusBar style="auto" />
        <Button onPress={login} title='ĐĂNG NHẬP' />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  border:{
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderStyle: 'solid',
    padding: 10,
    borderRadius:5
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 25
  },
  button:{
    borderRadius:2
  }
});

const inputStyles = StyleSheet.create({
  input: {
    height: 40,
    minWidth: 250,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

})
