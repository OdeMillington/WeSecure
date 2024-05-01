import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Pressable, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import * as SQLite from 'expo-sqlite/next'

const db = SQLite.openDatabaseAsync('userdata', {
    useNewConnection: true
})

export default function ViewPasswords({ navigation }) {

    const [search, setSearch] = useState('')

    let [fontsLoaded] = useFonts(
        {
            'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
            'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
            'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf')
        }
    )

    const getPasswords = async () => {
        allRows = await (await db).getAllAsync('SELECT * FROM passwords WHERE service_name = ? ', search.trim());

        for (const row of allRows) {
            console.log(row.password)
            // INSERT CODE TO DISPLAY IT FORMATTED
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View>
                    <TextInput
                        placeholder='Enter Service'
                        value = {search}
                        onChangeText = {setSearch}
                    >
                    </TextInput>

                    <TouchableOpacity onPress={getPasswords}>
                        <Text>Search</Text>
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

});