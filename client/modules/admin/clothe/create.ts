import { requestModel } from '../../../modules/stream/requestModel';
import * as NativeUI from '../../native-ui/NativeUi';
import { ClotheComponentType, clothe, components } from './types';
import { getApplyFunction, getApplyIndex, getMaxDrawableFunction, getMaxTextureFunction } from './functions'

let menu: NativeUI.Menu|undefined = undefined;
let componentMenu: {submenu: NativeUI.Menu, button: NativeUI.UIMenuItem, type: ClotheComponentType}[] = []
let confirmButton: NativeUI.UIMenuItem|undefined = undefined;

let createComponentItem: NativeUI.UIMenuListItem|undefined;

let clothe: clothe = {
    gender: false,
    name: '',
    type: 'leg',
    isCreateCharacterAvailable: false,
    price: 500,
    clothes: []
}

let inputTick = 0;

const openMenu = () => {
    if(menu) {
        return;
    }

    menu = new NativeUI.Menu('Vêtement', 'Créer un enssemble de vêtement', new NativeUI.Point(50, 50));
    menu.CloseableByUser = false;

    const onDynamicSexeChange = () => {
        clothe.gender = !clothe.gender;

        const model = clothe.gender ? 'mp_f_freemode_01' : 'mp_m_freemode_01';
    
        requestModel(model, async (hash) => {

            SetModelAsNoLongerNeeded(model);
            SetPlayerModel(PlayerId(), hash);

            //await Delay(100);
            setTimeout(() => {
                reset();
            }, 500);
        });

        return clothe.gender ? 'Femme' : 'Homme';
    }

    const basePriceChange = (item: NativeUI.UIMenuDynamicListItem, selectedValue: string, changeDirection: NativeUI.ChangeDirection) => {
        switch(changeDirection) {
            case NativeUI.ChangeDirection.Left:
                clothe.price--;
                break;
            case NativeUI.ChangeDirection.Right:
                clothe.price++;
                break;
        }

        if(clothe.price < 0) {
            clothe.price = 0;
        }

        return `${clothe.price}$`
    }
    
    
    menu.AddItem(new NativeUI.UIMenuDynamicListItem('Sexe', onDynamicSexeChange, '', () => {onDynamicSexeChange(); return clothe.gender ? 'Femme' : 'Homme'}));
    menu.AddItem(new NativeUI.UIMenuItem(`Nom:`, '', {id: 'name'}));
    menu.AddItem(new NativeUI.UIMenuListItem('type:', '', new NativeUI.ItemsCollection(["leg",'top','shoes','mask','bag','kevlar','hat','glasses','ears','watch','bracelet']), 0));
    menu.AddItem(new NativeUI.UIMenuCheckboxItem('Création de perso...', clothe.isCreateCharacterAvailable, "Rendre se vêtement disponible dans la création de personnage ?"))
    menu.AddItem(new NativeUI.UIMenuDynamicListItem('Prix:', basePriceChange, 'Prix de base du vêtement (~h~Gratuit a la création de personnage~h~).', () => `${clothe.price}$`));

    createComponentItem = new NativeUI.UIMenuListItem('Créer un composant:', 'Appuyer sur Entrée pour valider\n~r~Vous ne pouvez en créer qu\'un par type', new NativeUI.ItemsCollection(['mask','torso','leg','bag','shoes','accessory','undershirt','kevlar','badge','torso_2','hat','glass','ear','watch','bracelet']), 0);

    menu.AddItem(createComponentItem);

    confirmButton = new NativeUI.UIMenuItem('~g~Confirmer', '');
    menu.AddItem(confirmButton);

    menu.ItemSelect.on((selectedItem: NativeUI.UIMenuDynamicListItem | NativeUI.UIMenuListItem | NativeUI.UIMenuSliderItem | NativeUI.UIMenuCheckboxItem | NativeUI.UIMenuAutoListItem, selectedItemIndex: number) => {
        if(selectedItemIndex == 1) {
            DisplayOnscreenKeyboardWithLongerInitialString(0, 'Nom du vêtement', clothe.name, '', '', '', '', '', '', '', 255);

            inputTick = setTick(() => {
                if(UpdateOnscreenKeyboard() == -1 || UpdateOnscreenKeyboard() == 2) {
                    clearTick(inputTick);
                }
                else if(UpdateOnscreenKeyboard() == 1) {
                    clothe.name = GetOnscreenKeyboardResult();
                    selectedItem.SetRightLabel(clothe.name)
                }
            });
        }
        else if(selectedItemIndex == 2) {
            clothe.type = (selectedItem as NativeUI.UIMenuDynamicListItem).SelectedValue as ClotheComponentType;
        }
        else if(selectedItemIndex == 5) {
        
            if(clothe.clothes.findIndex((c) => c.type == createComponentItem.SelectedValue) != -1) {
                return;
            }

            const componentButton = new NativeUI.UIMenuItem(createComponentItem.SelectedValue);

            const idx = -1 + componentMenu.push({
                submenu: new NativeUI.Menu(createComponentItem.SelectedValue, '', new NativeUI.Point(50,50)),
                button: componentButton,
                type:  (createComponentItem.SelectedValue as ClotheComponentType),
            });

            const c: components = {
                type: (createComponentItem.SelectedValue as ClotheComponentType),
                draw: 0,
                texture: 0,
                palette: 0
            }

            menu.AddSubMenu(componentMenu[idx].submenu, componentButton);

            componentMenu[idx].submenu.AddItem(new NativeUI.UIMenuDynamicListItem('Drawable',(item, value, direction) => {return updateDrawable(c.type, direction);}, '', () => c.draw.toString()));
            componentMenu[idx].submenu.AddItem(new NativeUI.UIMenuDynamicListItem('Texture',(item, value, direction) => {return updateTexture(c.type, direction);}, '', () => c.texture.toString()));
            componentMenu[idx].submenu.AddItem(new NativeUI.UIMenuDynamicListItem('Palette',(item, value, direction) => {return updatePalette(c.type, direction);}, '', () => c.palette.toString()));

            componentMenu[idx].submenu.AddItem(new NativeUI.UIMenuItem('~r~Supprimer'));
            componentMenu[idx].submenu.AddItem(new NativeUI.UIMenuItem('Retour'));
            componentMenu[idx].submenu.ItemSelect.on((selectedItem: NativeUI.UIMenuDynamicListItem | NativeUI.UIMenuListItem | NativeUI.UIMenuSliderItem | NativeUI.UIMenuCheckboxItem | NativeUI.UIMenuAutoListItem, selectedItemIndex: number) => {

                if(selectedItemIndex < 3) {
                    return;
                }

                if(selectedItemIndex == 4) {
                    componentMenu[idx].submenu.Close();
                    menu.Open();
                    return;
                }

                const i = clothe.clothes.findIndex((c) => c.type == componentMenu[idx].type);

                componentMenu[idx].submenu.Close();
                menu.RemoveItem(componentMenu[idx].button);

                clothe.clothes.splice(i, 1);

                delete componentMenu[idx]
                reset();

                clothe.clothes.forEach((co) => {
                    apply(co);
                });

                menu.Open();
            });

            clothe.clothes.push(c);
        }
        else if(selectedItem.Id == confirmButton.Id) {
            emitNet('client:core:admin:clothe:created', JSON.stringify(clothe));
            
            componentMenu = [];
            clothe = {
                gender: false,
                name: '',
                type: 'leg',
                isCreateCharacterAvailable: false,
                price: 500,
                clothes: []
            }

            menu.Clear();
            menu.Close();

            menu = undefined;
        }
    });

    menu.CheckboxChange.on((item: NativeUI.UIMenuCheckboxItem, checked: boolean) => {
    
        clothe.isCreateCharacterAvailable = checked;
    })

    menu.Open();    
}

const updateDrawable = (type: ClotheComponentType, direction: NativeUI.ChangeDirection): string => {

    const i = clothe.clothes.findIndex((c) => c.type == type);

    if(direction == NativeUI.ChangeDirection.Right) {
        clothe.clothes[i].draw++;
    } else {
        clothe.clothes[i].draw--;
    }

    const getMax = getMaxDrawableFunction(clothe.clothes[i].type);

    const max = getMax(PlayerPedId(), getApplyIndex(clothe.clothes[i].type)) - 1;

    if(clothe.clothes[i].draw > max) {
        clothe.clothes[i].draw = 0;
    } else if(clothe.clothes[i].draw < 0) {
        clothe.clothes[i].draw = max
    }

    clothe.clothes[i].texture = 0;
    clothe.clothes[i].palette = 0;

    apply(clothe.clothes[i]);
    
    return clothe.clothes[i].draw.toString()
}

const updateTexture = (type: ClotheComponentType, direction: NativeUI.ChangeDirection): string => {

    const i = clothe.clothes.findIndex((c) => c.type == type);

    if(direction == NativeUI.ChangeDirection.Right) {
        clothe.clothes[i].texture++;
    } else {
        clothe.clothes[i].texture--;
    }

    const getMax = getMaxTextureFunction(clothe.clothes[i].type);

    const max = getMax(PlayerPedId(), getApplyIndex(clothe.clothes[i].type));

    if(clothe.clothes[i].texture > max) {
        clothe.clothes[i].texture = 0;
    } else if(clothe.clothes[i].texture < 0) {
        clothe.clothes[i].texture = max
    }

    clothe.clothes[i].palette = 0;

    apply(clothe.clothes[i]);
    
    return clothe.clothes[i].texture.toString()
}

const updatePalette = (type: ClotheComponentType, direction: NativeUI.ChangeDirection) : string => {
    const i = clothe.clothes.findIndex((c) => c.type == type);

    if(direction == NativeUI.ChangeDirection.Right) {
        clothe.clothes[i].palette++;
    } else {
        clothe.clothes[i].palette--;
    }

    if(clothe.clothes[i].palette > 3) {
        clothe.clothes[i].palette = 0
    } else if(clothe.clothes[i].palette < 0) {
        clothe.clothes[i].palette = 3;
    }

    apply(clothe.clothes[i]);

    return clothe.clothes[i].palette.toString();
}

const apply = (c: components) => {
    const a = getApplyFunction(c.type);
    a(PlayerPedId(), getApplyIndex(c.type), c.draw, c.texture, c.palette);
}

const reset = () => {
    const ped = PlayerPedId();

    ClearPedProp(PlayerPedId(), 0);
    ClearPedProp(PlayerPedId(), 1);
    ClearPedProp(PlayerPedId(), 2);
    ClearPedProp(PlayerPedId(), 6);
    ClearPedProp(PlayerPedId(), 7);
                
    SetPedComponentVariation(ped, 1, 0, 0, 0);
    SetPedComponentVariation(ped, 2, 0, 0, 0);

    SetPedComponentVariation(ped, 3, 15, 0, 0);
    SetPedComponentVariation(ped, 5, 0, 0, 0);
    SetPedComponentVariation(ped, 7, 0, 0, 0);
    SetPedComponentVariation(ped, 9, 0, 0, 0);
    SetPedComponentVariation(ped, 10, 0, 0, 0);
    SetPedComponentVariation(ped, 11, 15, 0, 0);



    if(clothe.gender === true) {
        SetPedComponentVariation(ped, 4, 15, 0, 0)
        SetPedComponentVariation(ped, 8, 15, 0, 0)
        SetPedComponentVariation(ped, 6, 35, 0, 0)
    } else {
        SetPedComponentVariation(ped, 4, 61, 0, 0);
        SetPedComponentVariation(ped, 8, 15, 0, 0);
        SetPedComponentVariation(ped, 6, 34, 0, 0)
    }
    
}

onNet('client:core:admin:clothe:create', () => {
    openMenu()
});