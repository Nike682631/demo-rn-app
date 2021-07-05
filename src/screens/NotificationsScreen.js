import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Button from '../components/Button'
import { AuthContext } from '../navigation/AuthProvider'
import { windowHeight, windowWidth } from '../utils/Dimensions'

const NotificationsScreen = () => {
    const { user, logout } = useContext(AuthContext)
    return (
        <View>
            <Button buttonTitle="Logout" onPress={() => logout()} />
            <View style={styles.redbuttonContainer}>
                <TouchableOpacity style={styles.buttonContainer} onPress = {() => {alert('I am pressed')}}>
                    <Text style={styles.buttonText}>Press me</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderWidth: 1,
        borderColor: '#e51e1a',
        backgroundColor: '#e51e1a',
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        fontFamily: 'Lato-Regular',
    },
    redbuttonContainer: {
        height: "80%",
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default NotificationsScreen
