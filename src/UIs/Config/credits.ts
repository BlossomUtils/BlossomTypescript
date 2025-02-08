import uiManager from "Libraries/uiManager";
import config from "Config";
import { ActionForm } from "Libraries/prismarineDb";

uiManager.addUI(config.uiNames.Config.Credits, 'config credits', (player)=>{
    let form = new ActionForm();
    form.title('Credits!')
    form.button(`§cBack\n§7Go back to config ui`, 'textures/azalea_icons/2', (player) => {
        uiManager.open(player, config.uiNames.Config.Root)
    })
    for(const c of config.details.credits) {
        form.button(`§b${c.name}\n§7${c.description}`, c.icon ? c.icon : 'icons/icon')
    }
    form.show(player)
})