import { world, Player, World, system } from "@minecraft/server";
import config from "Config";
import uiManager from "Libraries/uiManager";
import './UIs/index';
world.sendMessage('§dBlossom §bTypescript §7- §dLoaded!');
Player.prototype.error = function (message) {
    this.sendMessage(`§c§lERROR §8>> §r§7${message}`);
};
World.prototype.moduleError = function (message) {
    this.sendMessage(`§cMODULE ERROR §8>> §r§7${message}`);
};
system.afterEvents.scriptEventReceive.subscribe((e) => {
    uiManager.open(e.sourceEntity, e.message);
});
world.afterEvents.itemUse.subscribe((e) => {
    if (e.itemStack.typeId == 'blossom:config') {
        uiManager.open(e.source, config.uiNames.Config.Root);
    }
});
