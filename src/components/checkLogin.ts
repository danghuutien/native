import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect, useState } from 'react'
export default async function userApi({ navigation }: any) {
    const [token, setToken] = useState('')

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

    })
    if (token) {
        axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
        axios.defaults.baseURL = 'https://f5e4-14-229-79-91.ap.ngrok.io'
        // Get user detail
        const checkUser = await axios.get('/api/me');

        if (!checkUser) {
            navigation.replace('Login')
            return {status: false}
        }

        // if(!user.data.data.username) {
        //     throw redirect("/onboarding");
        // }

        return {status: true, user: checkUser.data.data };
    } else {
        navigation.replace('Login')
        return {status: false}
    }
}