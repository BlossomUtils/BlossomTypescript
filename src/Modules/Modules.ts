import { prismarineDb, PrismarineDBTable, KeyValTemplate } from "Libraries/prismarineDb";
import { SegmentedStoragePrismarine } from "Libraries/prismStorages/segmented";

class Modules { 
    db: InstanceType<typeof PrismarineDBTable>
    kv: InstanceType<typeof KeyValTemplate>
    constructor() {
        this.db = prismarineDb.customStorage('Modules', SegmentedStoragePrismarine)
        this.kv = this.db.keyval('Modules')
        if(this.get('ranks') == undefined || this.get('ranks') == null) this.set('ranks', true)
        if(this.get('chatPrefix') == undefined || this.get('chatPrefix') == null) this.set('chatPrefix', '!')
    }
    set(key: string, val: any) {
        this.kv.set(key, val)
        return this.kv.get(key)
    }
    get(key: string) {
        return this.kv.get(key)
    }
    delete(key: string) {
        return this.kv.delete(key)
    }
    has(key: string) {
        return this.kv.has(key)
    }
}
export default new Modules();