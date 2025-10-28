import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Button, Text, TextInput } from "react-native-paper";

export default function Pay() {
    const [cents, setCents] = useState(0);

    function formatCents() {
        return (cents / 100).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    function handleChange(text: string) {
        const digitsOnly = text.replace(/\D/g, "");
        const newCents = parseInt(digitsOnly || "0", 10);
        setCents(newCents);
    }

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => router.back()} />
                <Appbar.Content title="Pay" />
            </Appbar.Header>
            <View style={styles.contentView}>
                <Text variant="headlineLarge">0.01</Text>
                <Text variant="bodyLarge">Total amount due</Text>
                <TextInput
                    label="Received amount"
                    keyboardType="numeric"
                    onChangeText={handleChange}
                    value={formatCents()}
                    style={{ textAlign: "right" }}
                />
            </View>
            <Button mode="contained" style={styles.payButton}>Pay</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentView: {
        flex: 1,
        alignItems: "center",
        paddingTop: 15,
    },
    payButton: {
        margin: 15,
    },
})