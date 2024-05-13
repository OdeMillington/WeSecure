import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Pressable, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import * as SecureStore from 'expo-secure-store'

export default function NewPasswordScreen({ navigation }) {

    let [fontsLoaded] = useFonts(
        {
            'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
            'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
            'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
            'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf')
        }
    )

    const [currPass, setCurrPass] = useState('')
    const [newUsername, setNewUsername] = useState('')
    const [newPass, setNewPass] = useState('')

    const updateInfo = async () => { 
        currentPasswordValue = await SecureStore.getItemAsync('password')

        if (currPass == '' || newUsername  == '' || newPass == '') {
            alert("Incomplete fields!")
        } else {
            if (currPass === currentPasswordValue) {
                await SecureStore.setItemAsync('username', newUsername);
                await SecureStore.setItemAsync('password', newPass)
                alert("Account Details Updated!");
                navigation.navigate('Login')
            } else {
                alert("Current Password Invalid")
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.formContainer}>

                    <View style={styles.descriptionBox}>
                    <Image
                            style={styles.homeImg}
                            source={require('./assets/warninglogo.webp')}
                        />
                        <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 16}}>CHANGE LOGIN DETAILS</Text>
                    </View>

                    <View>
                        <Text style={styles.descriptionText}>Current Password</Text>
                        <TextInput style={styles.textInput}
                            value={currPass}
                            onChangeText={(pass) => setCurrPass(pass)}
                            secureTextEntry
                        />
                    </View>

                    <View>
                        <Text style={styles.descriptionText}>New Username</Text>
                        <TextInput style={styles.textInput}
                            value={newUsername}
                            onChangeText={(username) => setNewUsername(username)}
                        />
                    </View>

                    <View>
                        <Text style={styles.descriptionText}>New Password</Text>
                        <TextInput style={styles.textInput}
                            value={newPass}
                            onChangeText={(pass) => setNewPass(pass)}
                            secureTextEntry
                        />
                    </View>

                    <View>
                        <TouchableOpacity style={styles.button} onPress={updateInfo}>
                            <Text style={styles.buttonText}>UPDATE</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
        backgroundColor: '#282828',
        alignItems: 'center',
    },
    formContainer: {
        marginTop: 25,
        flex: 1,
        gap: 25,
        alignItems: 'center'
    },
    descriptionText: {
        marginBottom: 5,
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
    textInput: {
        borderWidth: 1,
        height: 50,
        fontSize: 20,
        width: 270,
        borderColor: 'white',
        borderRadius: 9,
        color: 'white',
        fontFamily: 'Montserrat-Regular',
        paddingLeft: 15,
        paddingRight: 12
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        backgroundColor: '#CCCCFF',
    },
    buttonText: {
        fontSize: 20,
        fontFamily: 'Montserrat-Bold'
    },
    descriptionBox: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderWidth: 2,
        paddingHorizontal: 30,
        paddingVertical: 20,
        borderColor: '#282828',
        borderRadius: 10,
        backgroundColor: '#FFFF66'
    },
    homeImg: {
        height: 35,
        width: 35
    },
});