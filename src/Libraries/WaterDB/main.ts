import * as mc from "@minecraft/server";
import worldpersistentstorage from "./Storage/WorldPersistentStorage";

let wdbinfo = {
    version: "0.1",
};

function isMatch(object2: any, attrs: any): boolean {
    let keys = Object.keys(attrs), length = keys.length;
    if (object2 == null) return !length;
    let obj = Object(object2);
    for (let i = 0; i < length; i++) {
        let key = keys[i];
        if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
}

class WaterDBKeyvals {
    set(kv: string, data: any): any {
        mc.world.setDynamicProperty(`_WATER:${kv}`, data);
        return mc.world.getDynamicProperty(`_WATER:${kv}`);
    }
    get(kv: string): any {
        return mc.world.getDynamicProperty(`_WATER:${kv}`);
    }
}

class waterDBCollection {
    name: string;
    storage: any;
    data: any[];

    constructor(name: string, storage: any) {
        if (!name) throw new Error("Failed to create table: Invalid name!");
        if (!storage) throw new Error("Storage is required to create a WaterDB Collection.");

        this.name = name;
        this.storage = storage;
        this.data = storage.load(name) || [];
    }

    save(data: any[]): void {
        this.storage.save(this.name, data);
    }

    random(): number {
        return Math.floor(8000000 + Math.random() * 1000000);
    }

    deleteDocumentByID(id: number): boolean {
        let docIndex2 = this.data.findIndex((document) => document.id === id);
        if (docIndex2 < 0) return false;
        this.data.splice(docIndex2, 1);
        this.save(this.data);
        return true;
    }

    clear(): void {
        this.data = [];
        this.save(this.data);
    }

    insertDocument(data: any): void {
        let id2 = this.random();
        this.data.push({
            id: id2,
            data: data,
            created: Date.now(),
            updated: Date.now(),
        });
        this.save(this.data);
    }

    findDocumentByID(id: number): any {
        let docIndex = this.data.findIndex((document) => document.id === id);
        if (docIndex < 0) return null;
        return this.data[docIndex];
    }

    findDocuments(query: any): any[] {
        return this.data.filter(doc2 => query == null || isMatch(doc2.data, query));
    }

    findFirst(query: any): any {
        return this.findDocuments(query)[0] || null;
    }

    overwriteDataByID(id: number, data: any): any {
        let docIndex = this.data.findIndex((document) => document.id === id);
        if (docIndex < 0) return null;
        this.data[docIndex].data = data;
        this.data[docIndex].updated = Date.now();
        this.save(this.data);
        return data;
    }
}

class WaterDB {
    collection(name: string) {
        return new waterDBCollection(name, worldpersistentstorage);
    }
    keyvals() {
        return new WaterDBKeyvals();
    }
}

var waterDB = new WaterDB();
export { waterDB, wdbinfo };
