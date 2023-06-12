import { StatusBar } from 'expo-status-bar';
import { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import axios from 'axios';
export default function App() {

  const [password, setPassword] = useState('')
  const [username, setUserName] = useState('')
  const onChangeUsername = (value)=>{
    // console.log(e);
    setUserName(value)
  }
  const onChangePassword = (value)=>{
    setPassword(value)
  }
  const login = () =>{
    console.log(username + ' ' + password);
    // axios.post('http://127.0.0.1:8000/')
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
        <TextInput
          style={inputStyles.input}
          onChangeText={onChangePassword}
          placeholder="Password"
          value={password}
          secureTextEntry={true}
        />
        <StatusBar style="auto" />
        <Button onPress={login} style = {styles.button} title='ĐĂNG NHẬP'/>
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
