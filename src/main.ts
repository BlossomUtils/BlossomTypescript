import { world, Player, World, system } from "@minecraft/server";
import config from "Config";
import uiManager from "Libraries/uiManager";
import './UIs/index'

world.sendMessage('§dBlossom §bTypescript §7- §dLoaded!')

declare module "@minecraft/server" {
    interface Player {
        error(message: string): void;
    }

    interface World {
        moduleError(message: string): void;
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

system.afterEvents.scriptEventReceive.subscribe((e) => {
    uiManager.open(e.sourceEntity, e.message)
})

world.afterEvents.itemUse.subscribe((e) => {
    if(e.itemStack.typeId == 'blossom:config') {
        uiManager.open(e.source, config.uiNames.Config.Root)
    }
})
