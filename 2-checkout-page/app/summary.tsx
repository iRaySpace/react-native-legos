import { router } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";
import { Appbar, Button, List, Text } from "react-native-paper";

const data = [
    {
        "id": "1",
        "name": "Biscuit",
        "qty": 1,
        "rate": 1,
    },
    {
        "id": "2",
        "name": "Ivanoff Biscuit",
        "qty": 1,
        "rate": 1,
    },
    {
        "id": "3",
        "name": "Simple Biscuit",
        "qty": 1,
        "rate": 1,
    },
];

export default function Summary() {
    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => router.back()} />
                <Appbar.Content title="Summary" />
            </Appbar.Header>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <List.Item
                        title={item.name}
                        description={item.qty + " x " + item.rate}
                        right={_ => <Text>{item.qty * item.rate}</Text>}
                    />
                )}
            />
            <Button
                mode="contained"
                style={styles.payButton}
                onPress={_ => router.replace("/pay")}>
                Pay
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    payButton: {
        margin: 15,
    },
})