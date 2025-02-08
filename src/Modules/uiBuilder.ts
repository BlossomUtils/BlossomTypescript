import { prismarineDb, PrismarineDBTable } from "Libraries/prismarineDb";
import { SegmentedStoragePrismarine } from "Libraries/prismStorages/segmented";

class UIBuilder {
    db: InstanceType<typeof PrismarineDBTable>;
    constructor() {
        this.db = prismarineDb.customStorage('uis', SegmentedStoragePrismarine);
    }
    addUI(name: string, scriptevent: string, type: number, body: string | undefined) {
        if(!name) throw new Error('No name defined');
        if(!scriptevent) throw new Error('No scriptevent defined');
        if(!type) throw new Error('No type defined');
        if(this.db.findFirst({scriptevent})) throw new Error('Scriptevent is conflicting with other UI scriptevent');
        if(this.db.findFirst({name})) throw new Error('Name is conflicting with other UI name');
        let ui = this.db.insertDocument({
            name,
            scriptevent,
            type,
            body,
            buttons: []
        })
        return ui;
    }
    editUI(id: number, name: string, scriptevent: string, type: number, body: string | undefined) {
        let ui = this.db.getByID(id)
        if(!ui) throw new Error('No UI found');
        ui.data.name = name
        ui.data.scriptevent = scriptevent
        ui.data.type = type
        ui.data.body = body
        this.db.overwriteDataByID(id, ui.data)
        return true;
    }
}
