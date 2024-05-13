import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Pressable, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';

export default function NewPasswordScreen({ navigator }) {

    let [fontsLoaded] = useFonts(
        {
            'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
            'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
            'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf')
        }
    );

    const [passwordLength, setPasswordLength] = useState(12); // Default password length

    const generatePassword = () => {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'; // Characters to include in the password
        let password = '';
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    };

    const refresh = () => {
        const newPassword = generatePassword();
        setPassword(newPassword);
    }

    const [password, setPassword] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.formContainer}>

                <View style={styles.descriptionBox}>
                    <Image
                            style={styles.homeImg}
                            source={require('./assets/lock.png')}
                        />
                        <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 20}}>Create Secure Password</Text>
                    </View>


                    <View>
                        <Text style={styles.descriptionText}>Enter Desired Length</Text>
                        <TextInput
                            style={styles.textInput}
                            value={String(passwordLength)}
                            onChangeText={text => setPasswordLength(parseInt(text) || 0)}
                            keyboardType="numeric"
                        />
                    </View>

                    <View>
                        <Text style={styles.descriptionText}>Password</Text>
                        <TextInput
                            style={styles.textInput}
                            value={password}
                        />
                    </View>
                    

                    <TouchableOpacity style={[styles.homeButtons, {marginTop: 15}]} onPress={refresh}>
                            <Text style={styles.homeText}>Refresh</Text>
                    </TouchableOpacity>

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
    }, 
    
    descriptionBox: {
        marginTop: 20,
        marginBottom: 15,
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
        height: 60,
        width: 40
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
