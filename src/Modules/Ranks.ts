import { Player } from "@minecraft/server";
import { prismarineDb, PrismarineDBTable } from "Libraries/prismarineDb";
import { SegmentedStoragePrismarine } from "Libraries/prismStorages/segmented";

class Ranks {
    db: InstanceType<typeof PrismarineDBTable>
    constructor() {
        this.db = prismarineDb.customStorage('Ranks', SegmentedStoragePrismarine)
    }
    add(name: string, tag: string, nc: string, cc: string) {
        if(this.db.findFirst({tag})) return false;
        this.db.insertDocument({
            name,
            tag,
            nc,
            cc
        })
        return true;
    }
    getFromPlayer(player: Player) {
        let rs = [];
        for(const rank of this.db.findDocuments({})) {
            for(const tag of player.getTags()) {
                if(rank.data.tag == tag) {
                    rs.push(rank.data.name)
                }
            }
        }
        return rs;
    }
    getAll() {
        let docs = this.db.findDocuments({});
        if(!docs) return [];
        return docs;
    }
    get(tag: string) {
        let rank = this.db.findFirst({tag})
        if(!rank) 
            return false;
        return rank;
    }
    remove(tag: string) {
        let rank = this.get(tag)
        if(!rank)
            return false;
        this.db.deleteDocumentByID(rank.id)
        return true;
    }
    edit(id: number, name: string, tag: string, nc: string, cc: string) {
        let rank = this.db.getByID(id)
        rank.data.name = name
        rank.data.tag = tag
        rank.data.nc = nc
        rank.data.cc = cc
        this.db.overwriteDataByID(id, rank.data)
    }
}
var ranks = new Ranks;
export { Ranks, ranks }