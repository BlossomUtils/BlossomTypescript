import { Vector3, world } from "@minecraft/server";

export class SegmentedStoragePrismarine {
    load(table) {
        let segmentCount: string | boolean | number | Vector3 = 0;
        try {
            segmentCount = world.getDynamicProperty(`segmentedstorage:segment_count_${table}`);
        } catch { segmentCount = 0 }
        if(!segmentCount) segmentCount = 0;
        if(segmentCount as number <= 0) return [];
        if(typeof segmentCount !== "number") {
            world.setDynamicProperty(`segmentedstorage:segment_count_${table}`, 0);
            return [];
        }
        let val = ``;
        for(let i = 0;i < segmentCount;i++) {
            let valToAppend: string | boolean | number | Vector3 = ``;
            try {
                valToAppend = world.getDynamicProperty(`segmentedstorage_${i}:${table}`);
            } catch {valToAppend = ``}
            if(!valToAppend) valToAppend = ``;
            val += valToAppend;
        }
        try {
            return JSON.parse(val);
        } catch {
            return [];
        }
    }
    save(table, data) {
        let data2 = JSON.stringify(data).match(/.{1,31000}/g);
        for(let i = 0;i < data2.length;i++) {
            world.setDynamicProperty(`segmentedstorage_${i}:${table}`, data2[i]);
        }
        world.setDynamicProperty(`segmentedstorage:segment_count_${table}`, data2.length);
    }
}