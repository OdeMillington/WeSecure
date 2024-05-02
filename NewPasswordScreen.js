import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Pressable, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import DropDownPicker from 'react-native-dropdown-picker';
import * as SQLite from 'expo-sqlite/next'

const db = SQLite.openDatabaseAsync('userdata', {
    useNewConnection: true  // Stops 'NativeDatabase.prepareAsync' has been rejected error
})

export default function NewPasswordScreen({ navigation }) {



    let [fontsLoaded] = useFonts(
        {
            'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
            'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
            'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf')
        }
    )

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('device');
    const [items, setItems] = useState([
        { label: 'Device', value: 'device' },
        { label: 'Online Service', value: 'Online Service' }
    ])

    const [type, setType] = useState(value)
    const [serviceName, setServiceName] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const [verPassword, setverPassword] = useState('')

    function reset() {
        setServiceName('')
        setPassword('')
        setUsername('')
        setverPassword('')
    }

    const submit = async () => {

        setServiceName(serviceName.trim())
        setUsername(username.trim())

        if (serviceName === '' || password === '' || username === '' || verPassword === '') {
            alert("Incomplete Field!")

        } else {
            if (password === verPassword) {

                (await db).runAsync('INSERT INTO passwords (service_name, username, password, type) VALUES (?, ?, ?, ?)', [serviceName, username, password, type])
                alert("Password Saved!")
                reset()

            } else {
                alert("Passwords do not match!")
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.formContainer}>

                    <View style={styles.picker}>
                        <Text style={styles.descriptionText}>Password Type</Text>
                        <View style={{ width: "85%" }}>
                            <DropDownPicker
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                                onChangeValue={(val) => setType(val)}
                                listMode='SCROLLVIEW'
                                dropDownDirection="BOTTOM">
                            </DropDownPicker>
                        </View>
                    </View>


                    <View style={styles.picker}>

                        <Text style={styles.descriptionText}>{value[0].toUpperCase() + value.slice(1)} Name</Text>
                        <TextInput style={styles.textInput}
                            value={serviceName}
                            onChangeText={(rea) => setServiceName(rea)}
                        />
                    </View>

                    <View>
                        <Text style={styles.descriptionText}>Username</Text>
                        <TextInput style={styles.textInput}
                            value={username}
                            onChangeText={(usern) => setUsername(usern)}
                        />

                    </View>

                    <View>
                        <Text style={styles.descriptionText}>Password</Text>
                        <TextInput style={styles.textInput}
                            secureTextEntry
                            value={password}
                            onChangeText={(pwd) => setPassword(pwd.trim())} />
                    </View>

                    <View>
                        <Text style={styles.descriptionText}>Verify Password</Text>
                        <TextInput style={styles.textInput} secureTextEntry
                            value={verPassword}
                            onChangeText={(verpwd) => setverPassword(verpwd.trim())} />
                    </View>

                    <View>
                        <TouchableOpacity style={styles.button} onPress={submit}>
                            <Text style={styles.buttonText}>SAVE</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button, { backgroundColor: 'crimson', marginTop: 10 }]} onPress={reset}>
                            <Text style={styles.buttonText}>RESET</Text>
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
    formContainer: {
        flex: 1,
        gap: 25,
        alignItems: 'center'
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