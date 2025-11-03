import { useAuth } from '@/state/AuthContext';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

const LoginScreen: React.FC = () => {
    const { logIn } = useAuth();

    return (
        <View style={styles.container}>
            <Button title="login" onPress={logIn} />
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
});