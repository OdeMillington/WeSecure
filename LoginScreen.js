import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import * as SQLite from 'expo-sqlite/next'
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

    const register = async () => {
        try {
            let stored_user = await SecureStore.getItemAsync("username")

            if (username === stored_user) {
                alert("Account already exist!")
            } else {
                await SecureStore.setItemAsync("username", username);
                await SecureStore.setItemAsync("password", password)
                alert("Account Successfully created!");
                setUsername("")
                setPassword("")
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
            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.homeImg}
                        source={require('./assets/image.png')}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.mainText}>WeSecure</Text>
                    <Text style={styles.subText}>Never forget your passwords!</Text>
                </View>

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
        marginTop: 50,
        alignItems: 'center',
    },
    homeImg: {
        height: 250,
        width: 230,
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 50,
    },
    mainText: {
        color: 'white',
        fontSize: 55,
        fontFamily: 'Montserrat-Bold',
    },
    subText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'Montserrat-Light',
    },
    inputContainer: {
        alignItems: 'center',
    },
    textInput: {
        borderWidth: 2,
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