import { ActionForm } from "Libraries/prismarineDb";
import config from "Config";
import uiManager from "Libraries/uiManager";
import { Player } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";
import { ranks } from "Modules/Ranks";

uiManager.addUI(config.uiNames.Ranks.Root, 'ranks root', (player: Player) => {
    let form = new ActionForm();
    form.title('§dRanks')
    form.button(`§aAdd\n§7Add a rank`, `textures/blossom_icons/addrank`, (player: Player) => {
        uiManager.open(player, config.uiNames.Ranks.Add)
    })
    for(const r of ranks.getAll()) {
        form.button(`§a${r.data.name}\n§7${r.data.tag}`, `textures/blossom_icons/editrank`, (player: Player) => {
            uiManager.open(player, config.uiNames.Ranks.View, r.data.tag)
        })
    }
    form.show(player, {})
})