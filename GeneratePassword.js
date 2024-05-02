import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Pressable, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import LoginScreen from './LoginScreen';

export default function NewPasswordScreen({ navigator }) {

    let [fontsLoaded] = useFonts(
        {
            'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
            'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
            'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf')
        }
    )


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formContainer}>

                <View>
                    <Text style={styles.descriptionText}>New Username</Text>
                    <TextInput style={styles.textInput}

                    />
                </View>

                <View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>GENERATE</Text>
                    </TouchableOpacity>
                </View>

                
                <View>
                    <Text style={styles.descriptionText}>Password</Text>
                    <TextInput style={styles.textInput}
                    />
                </View>

            </View>
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
        borderWidth: 2,
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
    }
});