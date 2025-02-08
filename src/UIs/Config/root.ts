import uiManager from "Libraries/uiManager";
import config from "Config";
import { ActionForm } from "Libraries/prismarineDb";

uiManager.addUI(config.uiNames.Config.Root, 'Config Root', (player)=>{
    let form = new ActionForm();
    form.title(`§b${config.details.name} §dConfig`)
    form.button('§dMain Settings\n§7View main settings', 'textures/azalea_icons/Settings', (player) => {
        uiManager.open(player, config.uiNames.Config.Main)
    })
    form.button(`§bCredits\n§7Credits for the addon`, 'textures/blossom_icons/credits', (player) => {
        uiManager.open(player, config.uiNames.Config.Credits)
    })
    form.show(player)
})