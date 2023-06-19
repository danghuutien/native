import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Text, TextInput, View, FlatList } from "react-native";
import { StyleSheet } from "react-native";
import { getApi, create, edit, remove } from "../api/api";
import { dataTypes } from "../types/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Geolocation from 'react-native-geolocation-service';

export const Home = ({ navigation }: any) => {
    const [datas, setDatas] = useState<dataTypes[]>([])
    const [values, setValues] = useState('')
    const [formStatus, setFormStatus] = useState('Thêm mới')
    const [rowId, setRowId] = useState('')
    const onChangeUsername = (value: string) => {
        setValues(value);
    }

    const insert = async () => {
        if (formStatus == 'Chỉnh sửa') {
            const response = await edit('/api/edit-test', { id: rowId, name: values })

            setDatas((current) => current.map((element) => {
                if (element.id === rowId) {
                    element.name = response.name;
                }

                return element;
            }))
        } else {
            const response = await create('/api/save-test', { name: values })

            setDatas([...datas, response])

        }
    }

    useEffect(() => {

        const fetchData = async () => {
            const response = await getApi('/api/get-test');
            const data: Array<dataTypes> = response
            setDatas(data)
            // console.log(datas);
            data.map((_ele) => {

            })
        }
        fetchData()
    }, [])

    const editdata = async (data: dataTypes) => {
        setValues(data.name)
        setFormStatus('Chỉnh sửa')
        setRowId(data.id)

    }

    const deletedata = async (id: string) => {
        const response = await remove('/api/delete-test', id)
        console.log(response);
        setDatas((current) => current.filter((element) => {
            return element.id !== id;
        }))
    }

    const logout = async () => {
        await AsyncStorage.clear();
        navigation.navigate('Login')
    }

    const getGps =()=>{
        Geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              // Lưu vị trí vào CSDL
              try {
                const response = await edit('/api/save-gps', { latitude: latitude.toString(), longitude: longitude.toString() })
                console.log(response);
              } catch (error) {
                console.log('Lỗi khi lưu vị trí vào CSDL: ', error);
              }
            },
            (error) => {
              console.log('Lỗi khi lấy vị trí GPS: ', error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
    }

    return (
        <View style={styles.container}>
            <View style={styles.border} >
                <TextInput
                    style={inputStyles.input}
                    onChangeText={onChangeUsername}
                    value={values}
                    placeholder="values"

                />

                <Button onPress={insert} title={formStatus} />
            </View>
            <FlatList
                data={datas}
                renderItem={({ item }) =>
                    <View style={{ flexDirection: "row", justifyContent: 'space-around' }}>
                        <Text>{item.name}</Text>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                            <Button
                                onPress={() => editdata(item)}
                                title="sửa"
                                // color="#841584"}

                                accessibilityLabel="sửa"
                            />
                            <Button
                                onPress={() => deletedata(item.id)}
                                title="xóa"
                                // color="#841584"
                                accessibilityLabel="sửa"
                            />
                        </View>
                    </View>}
                keyExtractor={item => item.id}

            />
            <View>
                <Button onPress={getGps}
                    title="lấy vị trí"
                    // color="#841584"
                    
                    accessibilityLabel="sửa" />
                <Text style={{marginBottom:10}}></Text>
            </View>
            <Button onPress={logout}
                title="đăng xuất"
                // color="#841584"
                accessibilityLabel="sửa" />
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    container: {
        flex: 1,

        backgroundColor: '#fff',
        //   alignItems: 'center',
        //   justifyContent: 'center',

    },
    border: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        //   borderWidth: 1,
        //   borderColor: 'gray',
        //   borderStyle: 'solid',
        //   padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 25
    },
    button: {
        borderRadius: 2
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
