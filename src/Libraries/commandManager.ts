import { system } from "@minecraft/server";
import { prismarineDb, PrismarineDBTable } from "./prismarineDb";
import modules from "Modules/Modules";

class CommandManager {
    prefix: string
    cmds: InstanceType<typeof PrismarineDBTable>
    subcmds: InstanceType<typeof PrismarineDBTable>
    constructor() {
        this.prefix = modules.get('chatPrefix');
        this.cmds = prismarineDb.table("Commands")
        this.subcmds = prismarineDb.table("SubCommands")
        this.cmds.clear()
        this.subcmds.clear()
    }
    update() {
        this.prefix = modules.get('chatPrefix')
    }
    addCommand(name, data, callback) {
        let cmd = this.cmds.findFirst({name});
        if(cmd) {
            this.cmds.deleteDocumentByID(cmd.id);
        }
        this.cmds.insertDocument({
            name,
            ...data,
            callback
        })
    }
    addSubcommand(parent, name, data, callback) {
        this.subcmds.insertDocument({
            parent,
            name,
            ...data,
            callback
        });
    }
    removeCommand(name) {
        let command = this.cmds.findFirst({name: name})
        if (command) {
            this.cmds.deleteDocumentByID(command.id)
        }
    }
    getSubCommandsFromCommand(name) {
        return this.subcmds.findDocuments({parent:name}).map(_=>_.data);
    }
    run(msg) {
        system.run(()=>{
            if(!msg.message.startsWith(this.prefix)) return;
            let data = msg.message.replaceAll(this.prefix, "").split(" ");
            let cmdName = data[0];
            let args = data.slice(1);
            let cmd = this.cmds.findFirst({name: cmdName});
            if(!cmd) return msg.sender.error("Command not found")
            if(data.length > 1) {
                let subcmd = this.subcmds.findFirst({name: data[1], parent: data[0]})
                if(subcmd) {
                    return subcmd.data.callback({msg, args: args.slice(1)});
                }
            }
            return cmd.data.callback({msg, args});
    
        })
    }
}

export default new CommandManager();