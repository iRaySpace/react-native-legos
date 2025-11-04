import { SQLiteDatabase } from "expo-sqlite";

export interface Item {
    id: number;
    name: string;
}

export async function handleInit(db: SQLiteDatabase) {
    await db.execAsync(`
PRAGMA journal_mode = 'wal';
CREATE TABLE IF NOT EXISTS item (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL);
`);
}

export function addItem(name: string) {
    console.log("adding item", name);
}
