import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function Signin() {
    return (
        <React.Fragment>
            <View style={styles.container}>
                <Text>This is the login page</Text>
            </View>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
