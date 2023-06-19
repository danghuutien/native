import Login from "./components/Login"
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from "./components/Home";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const Navigation = ({ navigation }: any) => {
    const [token, setToken] = useState('')
    const [user, setUser] = useState({})
    useEffect(() => {
        const getToken = async () => {
            try {
                const temp = await AsyncStorage.getItem('token');
                temp != null ? setToken(temp) : setToken('')

            } catch (error) {
                setToken('')
            }
            
        };
        getToken()
        
    }, [token])
    
    // axios.defaults.headers.common['Authorization'] = `Bearer ${token == '' ? 'đasadasdasdasdasdas':token}`
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    axios.defaults.baseURL = 'http://d2.ivinh.com'
    // const checkUser = await axios.get('/api/me');
    useEffect(() => {
        const getMe = async () => {
            const checkUser = await axios.get('/api/me');
            setUser(checkUser["data"]['data'])

        }
        getMe()

    }, [])
    console.log(token)
    return (
        <NavigationContainer>
            {
                
                token != '' ?

                    <Stack.Navigator>
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="Login" component={Login} />
                    </Stack.Navigator> 
                    :
                    <Stack.Navigator>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Home" component={Home} />
                    </Stack.Navigator>

            }

        </NavigationContainer>
    );
}
export default Navigation