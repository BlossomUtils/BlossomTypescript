import * as mc from '@minecraft/server';
class WorldPersistentStorage {
    constructor() { }
    load(collection) {
        let val;
        try {
            val = mc.world.getDynamicProperty(`_WATERCOLLECTION:${collection}`);
        }
        catch {
            val = ``;
        }
        if (!val)
            val = `[]`;
        let data = [];
        try {
            data = JSON.parse(val);
        }
        catch {
            data = [];
        }
        return data;
    }
    save(collection, data) {
        mc.world.setDynamicProperty(`_WATERCOLLECTION:${collection}`, JSON.stringify(data));
        return true;
    }
}
export default new WorldPersistentStorage();
