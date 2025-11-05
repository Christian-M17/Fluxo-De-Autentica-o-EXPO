import { useAuth } from '@/state/AuthContext';
import { loginCheck } from '@/state/logincheck';
import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

const LoginScreen: React.FC = () => {
    const { logIn } = useAuth();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const isLoggedIn = await loginCheck(user, password);
        if (isLoggedIn) {
            logIn(user);
        }
        else {
            alert('Credenciais inválidas');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={user}
                onChangeText={setUser}
                autoCapitalize="none"
                keyboardType="default"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                keyboardType="default"
                secureTextEntry
            />
            <Button title="login" onPress={handleLogin} />
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
    input: {
        width: '90%',
        height: 48,
        borderWidth: 1,
        color: '#FFF',
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 12,
        paddingHorizontal: 10,
        fontSize: 16,
    },
});