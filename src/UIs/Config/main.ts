import { ActionForm } from "Libraries/prismarineDb";
import config from "Config";
import uiManager from "Libraries/uiManager";
import { Player } from "@minecraft/server";

uiManager.addUI(config.uiNames.Config.Main, 'config main', (player: Player) => {
    let form = new ActionForm();
    form.title('§bMain Settings')
    form.button(`§bUI Builder\n§7Make stunning custom UIs`, `textures/azalea_icons/GUIMaker/FormsV2`, (player: Player) => {

    })
    form.button(`§dRanks\n§7Make custom chat ranks`, 'textures/blossom_icons/rank', (player: Player) => {
        uiManager.open(player, config.uiNames.Ranks.Root)
    })
    form.show(player, {})
})