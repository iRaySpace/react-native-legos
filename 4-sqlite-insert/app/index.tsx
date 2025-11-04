import { Item, handleInit } from "@/db/item";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

interface ItemFormProps {
  onRefresh: () => void;
}

function ItemForm({ onRefresh } : ItemFormProps) {
  const db = useSQLiteContext();
  const nameRef = useRef(null);
  const [name, setName] = useState("");

  async function handleAdd() {
    await db.runAsync("INSERT INTO item (name) VALUES (?)", name);
    nameRef.current?.clear();
    onRefresh();
  }

  return (
    <View style={styles.formView}>
      <TextInput placeholder="Name..."
        style={styles.nameInput}
        ref={nameRef}
        onChangeText={setName}
      />
      <Button title="Add" onPress={handleAdd} />
    </View>
  );
}

interface ItemListProps {
  data: Item[];
  onRefresh: () => void;
}

function ItemList({ data, onRefresh } : ItemListProps) {
  const db = useSQLiteContext();

  async function handleDelete(id: number) {
    await db.runAsync("DELETE FROM item WHERE id = $id", { $id: id })
    onRefresh();
  }

  return (
    <View>
      {data.map((item: Item, _) => (
        <View key={item.id} style={styles.itemView}>
          <Text style={styles.nameText}>{item.name}</Text>
          <Button title="X" onPress={() => handleDelete(item.id)} />
        </View>
      ))}
    </View>
  )
}

function ItemView() {
  const db = useSQLiteContext();
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    handleRefresh();
  }, []);

  async function handleRefresh() {
    const result = await db.getAllAsync<Item>("SELECT * FROM item");
    setItems(result);
  }

  return (
    <View style={styles.container}>
      <ItemForm onRefresh={handleRefresh} />
      <ItemList data={items} onRefresh={handleRefresh} />
    </View>
  )
}

export default function Index() {
  return (
    <SQLiteProvider databaseName="test.db" onInit={handleInit}>
      <ItemView />
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  formView: {
    flexDirection: "row",
  },
  nameInput: {
    flex: 1,
  },
  itemView: {
    flexDirection: "row",
  },
  nameText: {
    flex: 1,
  },
});