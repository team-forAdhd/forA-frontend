import 'intl-pluralrules'
import { StatusBar } from 'expo-status-bar'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import i18n from '../public/locales/i18n'
import { useEffect } from 'react'

export default function App() {
    const { t } = useTranslation('login-join')

    useEffect(() => {
        i18n
    }, [])

    return (
        <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app!</Text>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
