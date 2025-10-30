import React, { useMemo, useState } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";

const NAMES = [
  "Ivan",
  "Maria",
  "Carlos",
  "Zara",
  "Leo",
  "Mika",
  "Ella",
  "Noah",
  "Sofia",
  "Liam",
  "Olivia",
  "Amelia",
  "Lucas",
  "Ava",
  "Isla",
  "Ethan",
  "Chloe",
  "Mason",
  "Emma",
  "Ben",
];

const NameList = React.memo(({ data }: { data: any }) => {
  console.log("NameList re-rendered");
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.text}>{item}</Text>
        </View>
      )}
    />
  )
});

export default function Index() {
  const [search, setSearch] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const [count, setCount] = useState(0);

  const filteredAndSorted = useMemo(() => {
    return NAMES.filter((name) =>
      name.toLowerCase().includes(search.toLowerCase())
    ).sort((a, b) =>
      isAscending ? a.localeCompare(b) : b.localeCompare(a)
    );
  }, [search, isAscending]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter & Sort Optimization</Text>
      <TextInput
        placeholder="Search..."
        style={styles.input}
        value={search}
        onChangeText={setSearch}
      />
      <Button
        title={isAscending ? "Sort Z → A" : "Sort A → Z"}
        onPress={() => setIsAscending(!isAscending)}
      />
      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 16 }}>Counter: {count}</Text>
        <Button title="Re-render app" onPress={() => setCount(count + 1)} />
      </View>
      <NameList data={filteredAndSorted} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fafafa",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  item: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  text: {
    fontSize: 16,
  },
});
