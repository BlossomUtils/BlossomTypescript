import { ActionForm, colors } from "Libraries/prismarineDb";
import { ModalFormData } from "@minecraft/server-ui";
import config from "Config";
import uiManager from "Libraries/uiManager";
import { ranks } from "Modules/Ranks";
import { Player } from "@minecraft/server";

uiManager.addUI(config.uiNames.Ranks.View, 'Ranks View', (player: Player, tag: string) => {
    let rank = ranks.get(tag);
    let form = new ActionForm();
    form.title('View Rank')
    form.button(`§bEdit Values\n§7Edit values of this rank`, 'textures/blossom_icons/editrank', (player: Player)=>{
        let f = new ModalFormData();
        f.title('§aAdd Rank')
        f.textField('Display', 'Enter rank display..', rank.data.name)
        f.textField('Tag', 'Enter rank tag..', rank.data.tag)
        f.dropdown(`Name Color`, colors.getColorNamesColored(), colors.getColorCodes().findIndex(_=>_==rank.data.nc))
        f.dropdown(`Chat Color`, colors.getColorNamesColored(), colors.getColorCodes().findIndex(_=>_==rank.data.cc))
        f.show(player).then((res) => {
            let[display,tag,nci,cci]=res.formValues;
            if(!display) return player.error('No display entered.');
            if(!tag) return player.error('No tag found');
            let nc = colors.getColorCodes()[nci as number]
            let cc = colors.getColorCodes()[cci as number]
            ranks.edit(rank.id, display as string, tag as string, nc, cc)
            form.show(player, {})
        })
    })
    form.button(`§cDelete\n§7Delete this rank`, `textures/blossom_icons/delrank`, (player: Player) => {
        ranks.remove(rank.data.tag)
        uiManager.open(player, config.uiNames.Ranks.Root)
    })
    form.show(player, {})
})