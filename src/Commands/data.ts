// import commandManager from "Libraries/commandManager";
import { world, ChatSendBeforeEvent, Player } from "@minecraft/server";
/** 
commandManager.addCommand('data', { description: 'Get all data from PrismarineDB' }, ({ msg, args }) => {
    let player: Player = msg.sender
    if(!player.hasTag('dev')) return;
    for(const dp of world.getDynamicPropertyIds()) {
        player.sendMessage(`${dp}: ${world.getDynamicProperty(dp)}`)
    }
})
    */