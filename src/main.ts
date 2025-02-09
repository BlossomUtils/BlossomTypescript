import { world, Player, World, system } from "@minecraft/server";
import config from "Config";
import uiManager from "Libraries/uiManager";
import './UIs/index'
import './Commands/index'
import Modules from "Modules/Modules";
import { ranks } from "Modules/Ranks";
import BlossomFormatter from "Modules/BlossomFormatter";
// import commandManager from "Libraries/commandManager";

world.sendMessage('§dBlossom §bTypescript §7- §dLoaded!')

declare module "@minecraft/server" {
    interface Player {
        error(message: string): void;
        success(message: string): void;
        info(message: string): void;
    }

    interface World {
        criticalError(message: string): void;
    }
}

(Player.prototype as any).error = function (message: string) {
    this.sendMessage(`§c§lERROR §8>> §r§7${message}`);
};
(Player.prototype as any).success = function (message: string) {
    this.sendMessage(`§l§aSUCCESS §8>> §r§7${message}`);
};
(Player.prototype as any).info = function (message: string) {
    this.sendMessage(`§l§bINFO §8>> §r§7${message}`);
};
(World.prototype as any).criticalError = function (message: string) {
    this.sendMessage(`§l§4CRITICAL ERROR §8>> §r§7${message}`);
};

system.afterEvents.scriptEventReceive.subscribe((e) => {
    uiManager.open(e.sourceEntity, e.message)
})

world.afterEvents.itemUse.subscribe((e) => {
    if(e.itemStack.typeId == 'blossom:config') {
        if(!e.source.hasTag('admin')) return e.source.error(`You don't have permission to use the Config UI! Add the tag 'admin' to yourself to use this!`)
        uiManager.open(e.source, config.uiNames.Config.Root)
    }
})

world.beforeEvents.chatSend.subscribe((msg) => {
    // if(msg.message.startsWith(commandManager.prefix)) {
        // commandManager.run(msg)
        // msg.cancel = true;
        // return;
    // }
    // @ts-ignore
    if(!Modules.get('ranks')) return;

    msg.cancel = true;
    let allranks = ranks.getFromPlayer(msg.sender)
    if (allranks.length === 0) {
        if (msg.sender.name === "FruitKitty7041") {
            allranks.push("§dDeveloper")
        } else {
            allranks.push("§bMember")
        }
    }
    let joined = allranks.join('§r§8] [§r');
    let newmsg = BlossomFormatter.format(msg.message, msg.sender)
    let nc;
    let cc;
    let docs = ranks.db.findDocuments({});
    for (const doc of docs) {
        let tags = msg.sender.getTags();
        for (const tag of tags) {
            if (tag === doc.data.tag) {
                nc = doc.data.nc
                cc = doc.data.cc
                break;
            }
        }
    }
    if(!nc) nc = "§7"
    if(!cc) cc = "§7"
    world.sendMessage(`§8[§r${joined}§r§8]${nc} ${msg.sender.name}§8 >>${cc} ${newmsg}`);
})