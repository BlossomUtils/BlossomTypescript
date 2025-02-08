import commandManager from "Libraries/commandManager";
import { prismarineDb } from "Libraries/prismarineDb";
import config from "Config";

commandManager.addCommand("help", {description: `Get help with ${config.details.name}`, category: "Help"}, ({msg,args})=>{
    let commands = commandManager.cmds.findDocuments(null);
    let commandData = {};
    for(const command of commands) {
        let category = command.data.category ? command.data.category : "Development";
        if(commandData[category]) commandData[category].push(command.data)
        else commandData[category] = [command.data];
    }
    let text = [];
    for(const category of Object.keys(commandData)) {
        text.push(`§8----------- §a${category} §r§8-----------`)
        for(const command of commandData[category]) {
            text.push(`§e${command.format ? `${command.format}` : `${commandManager.prefix}${command.name}`} §r§7${command.description ? command.description : "No Description"} §8(By ${command.author ? command.author : "FruitKitty"})`)
            let subcommands = commandManager.getSubCommandsFromCommand(command.name);
            if(subcommands.length) {
                for(const subcommand of subcommands) {
                    text.push(`§f- §b${subcommand.format ? `${subcommand.format}` : `${commandManager.prefix}${command.name} ${subcommand.name}`} §r§7${subcommand.description ? subcommand.description : "No Description"}`)
                }
            }
        }
    }
    msg.sender.sendMessage(text.join('\n§r'))
})

commandManager.addSubcommand("help", "setup", {description: `Get help setting up ${config.details.name}`}, ({msg})=>{
    msg.sender.sendMessage(`§dView our Documentation at blossom.amethystdev.com`)
})
commandManager.addSubcommand("help", "version", {description: `Get help setting up ${config.details.name}`}, ({msg})=>{
    let text = [];
    text.push(`§8------------ §d${config.details.name} §8------------`)
    text.push(`§eVersion Name: §f${config.details.version}`)
    text.push(`§d------------ §bPrismarineDB §d------------`)
    text.push(`§eVersion: §fV${prismarineDb.version.toFixed(1)}`)
    msg.sender.sendMessage(text.join('\n§r'))
})