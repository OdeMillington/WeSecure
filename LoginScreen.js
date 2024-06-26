import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Pressable, ScrollView, SafeAreaView, Alert, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import * as SQLite from 'expo-sqlite'
import * as SecureStore from 'expo-secure-store'

const db = SQLite.openDatabaseAsync('userdata', {
    useNewConnection: true // Stops 'NativeDatabase.prepareAsync' has been rejected error
})


export default function LoginScreen({ navigation }) {

    const createTable = async () => {
        // PRAGMA journal_mode = WAL allows multiple DB transaction to happen at once
        (await db).execAsync('PRAGMA journal_mode = WAL;  CREATE TABLE IF NOT EXISTS passwords (service_name TEXT, username TEXT, password TEXT, type TEXT)')
    }

    createTable()

    const setData = async () => {
        await SecureStore.setItemAsync("username", username);
        await SecureStore.setItemAsync("password", password)
        alert("Account Successfully created!");
        setUsername("")
        setPassword("")
    }

    const clearData = async () => {
        (await db).runAsync('DELETE FROM passwords')
        setData()
    }

    const register = async () => {
        try {

            if (username.trim() == '' || password.trim() == '') {
                alert("Incomplete Fields!")
            } else {

            let stored_user = await SecureStore.getItemAsync("username")
                
            if (stored_user) {
                Alert.alert('Create New Account', 'You already have an account stored. Creating a new account will clear all stored data!',
                    [
                        {text:'Cancel', style: 'cancel'},
                        {text: 'Proceed', onPress: clearData}
                    ], {cancelable: true}
                )
            } else {
                setData()
            }
        }
        } catch (error) {
            alert("Error Registering Account. Try again!");
        }
    }

    const login = async () => {
        try {
            let stored_pass = await SecureStore.getItemAsync("password")
            let stored_user = await SecureStore.getItemAsync("username")
            if (stored_user === username.trim() && stored_pass === password.trim()) {
                navigation.navigate('Tabs')
                setUsername('')
                setPassword('')
            } else {
                alert("Incorrect Username/Password");
            }
        } catch (error) {
            alert("Error Logging in. Try again!");
        }
    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let [fontsLoaded] = useFonts(
        {
            'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
            'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
            'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf')
        }
    )

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={'transparent'} translucent/>
            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.homeImg}
                        source={require('./assets/image.png')}
                        resizeMode="center"
                    />
                </View>

                
                <Text style={styles.mainText}>WeSecure</Text>
                <Text style={styles.subText}>Never forget your passwords!</Text>
                

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Username'
                        placeholderTextColor='white'
                        value={username}
                        onChangeText={(username) => setUsername(username)}
                    />
                    <TextInput
                        style={[styles.textInput, { marginTop: 25 }]}
                        placeholder='Password'
                        placeholderTextColor='white'
                        value={password}
                        secureTextEntry
                        onChangeText={(password) => setPassword(password)}
                    />
                </View>

                <View style={styles.buttonsContainer}>
                    <Pressable style={styles.homeButtons} onPress={login}>
                        <Text style={styles.homeText}>Login</Text>
                    </Pressable>
                    <Pressable style={[styles.homeButtons, { backgroundColor: '#4169E1', marginTop: 15 }]} onPress={register}>
                        <Text style={styles.homeText}>Register</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        justifyContent: 'center'
    },
    imageContainer: {
        marginTop: 25,
        alignItems: 'center',
        borderRadius: 25
    },
    homeImg: {
        height: 250,
        width: 230,
    },
    mainText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 55,
        fontFamily: 'Montserrat-Bold',
    },
    subText: {
        marginBottom: 25,
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'Montserrat-Light',
    },
    inputContainer: {
        alignItems: 'center',
    },
    textInput: {
        borderWidth: 1,
        height: 50,
        width: 275,
        borderColor: 'white',
        borderRadius: 20,
        color: 'white',
        fontFamily: 'Montserrat-Regular',
        paddingLeft: 25,
        fontSize: 15,
    },
    buttonsContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    homeButtons: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#CCCCFF',
    },
    homeText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 20,
        fontWeight: 'bold',
    },
});