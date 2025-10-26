import * as SQLite from "expo-sqlite";

export async function loadDatabase() {
    try {
        const db = await SQLite.openDatabaseAsync("app.db");
        console.log("Database opened successfully!");
        return db;
    } catch (error) {
        console.error("Error opening database:", error);
        throw error;
    }
}
