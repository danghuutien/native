// import Login from "./src/components/Login"
// import { useState, useEffect } from 'react'
// import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { Home } from "./src/components/Home";
// import axios from "axios";
// import AsyncStorage from '@react-native-async-storage/async-storage';

import Navigation from "./src/Navigation";

// const Stack = createStackNavigator();
export default function App() {
    // const [token, setToken] = useState('')
    // const [user, setUser] = useState({})
    // useEffect(() => {
    //     const getToken = async () => {
    //         try {
    //             const temp = await AsyncStorage.getItem('token');
    //             temp != null ? setToken(temp) : setToken('')

    //         } catch (error) {
    //             setToken('')
    //         }
    //     };
    //     getToken()

    // }, [])
    // // axios.defaults.headers.common['Authorization'] = `Bearer ${token == '' ? 'đasadasdasdasdasdas':token}`
    // axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    // axios.defaults.baseURL = 'https://566d-14-228-248-147.ap.ngrok.io'
    // // const checkUser = await axios.get('/api/me');
    // useEffect(() => {
    //     const getMe = async () => {
    //         const checkUser = await axios.get('/api/me');
    //         console.log(token)

    //         setUser(checkUser["data"].data)

    //     }
    //     getMe()
    // }, [])
    return (
        <>
            <Navigation />
        </>
    );
}


