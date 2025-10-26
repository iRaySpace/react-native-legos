import { loadDatabase } from "@/services/database";
import { useState } from "react";
import { Button, Text, View } from "react-native";

export default function Index() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoadDatabase = async () => {
    await loadDatabase();
    setIsLoaded(true);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button title="Load Database" onPress={handleLoadDatabase} />
      {isLoaded && (
        <Text>Database is loaded.</Text>
      )}
    </View>
  );
}
