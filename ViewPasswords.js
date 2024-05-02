import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Pressable, ScrollView, SafeAreaView, TouchableWithoutFeedback, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import * as SQLite from 'expo-sqlite/next'
import Clipboard from '@react-native-community/clipboard';

const db = SQLite.openDatabaseAsync('userdata', {
    useNewConnection: true
})

export default function ViewPasswords({ navigation }) {


    let [fontsLoaded] = useFonts(
        {
            'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
            'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
            'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf')
        }
    )

    

    const getData = async () => {
        return await (await db).getAllAsync('SELECT * FROM passwords')
    }

    const [data, setData] = useState([])
    getData().then(d => setData(d))

    function display() {
        return data.map(({password, service_name, type, username}) => {
            return (
                <View style={styles.box}>
                    <Text style={[styles.sn, styles.title]}>{service_name}</Text>
                    <Text style={styles.subText}>{type.slice(0,1).toUpperCase() + type.slice(1)}</Text>
                    <Text style={styles.text}>Username: {username}</Text>
                    <Text style={styles.text}>Password: {password}</Text>
                    
                </View>
            )
        }) 
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {display()}
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
    title: {
        paddingTop: 5,
        fontFamily: 'Montserrat-Bold',
        textAlign: 'center',
        fontSize: 25
    },
    box: {
        backgroundColor: 'white',
        borderWidth: 2,
        height: 200,
        width: 275,
        borderColor: 'white',
        borderRadius: 20,
        color: 'white',
        fontFamily: 'Montserrat-Regular',
        paddingLeft: 25,
        fontSize: 15,
        marginBottom: 10
    },
    text: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 18,
        paddingTop: 20,
        paddingLeft: 15
    },
    subText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
        textAlign: 'center'
    }

});