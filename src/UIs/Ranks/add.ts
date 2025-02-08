import uiManager from "Libraries/uiManager";
import { Ranks, ranks } from "Modules/Ranks";
import config from "Config";
import { ModalFormData } from "@minecraft/server-ui";
import { Player } from "@minecraft/server";
import { colors } from "Libraries/prismarineDb";

uiManager.addUI(config.uiNames.Ranks.Add, 'ranks add', (player: Player) => {
    let form = new ModalFormData();
    form.title('§aAdd Rank')
    form.textField('Display', 'Enter rank display..', null)
    form.textField('Tag', 'Enter rank tag..', null)
    form.dropdown(`Name Color`, colors.getColorNamesColored(), 7)
    form.dropdown(`Chat Color`, colors.getColorNamesColored(), 7)
    form.show(player).then((res) => {
        let[display,tag,nci,cci]=res.formValues;
        if(!display) return player.error('Please add a display!');
        if(!tag) return player.error('Please add a tag!');
        let nc = colors.getColorCodes()[nci as number]
        let cc = colors.getColorCodes()[cci as number]
        let r = ranks.add(display as string,tag as string,nc,cc)
        if(!r) return player.error('Could not create rank');
        player.success('Created rank')
        uiManager.open(player, config.uiNames.Ranks.Root)
    })
})