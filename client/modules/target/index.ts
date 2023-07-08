import { TargetClass } from "./target.class";

RegisterKeyMapping('+playerSelector', 'Active/Désactive le sélécteur 3D', 'keyboard', 'LMENU');

RegisterCommand('+playerSelector', () => {
    TargetClass.toggle(!TargetClass.active);
}, false);


TargetClass.addBoxZone({x: -1066.48, y: -2695.6, z: -7.41}, 1.2, 1.2, {heading: 320.0, debugPoly: true, maxZ: -6.4, minZ: -10.4}, {items: [{label: 'test 1', metadata: {}, client: 'interact:test_1'}, {label: 'test 2', metadata: {}, client: 'interact:test_2'}]});
TargetClass.AICivilianMenu = {
    items: [
        {
            label: 'Saluer',
            client: 'target:interact:ai:hello',
            metadata: {}
        },
        {
            label: 'Insulter',
            client: 'target:interact:ai:insult',
            metadata: {}
        }
    ]
}

TargetClass.addPropsInteract(['prop_vend_snak_01', 'prop_vend_snak_01_tu', 'prop_vend_soda_01'], {items: [{label: 'Acheter', client: 'target:interact:vendingmachine:buy', metadata: {}}, {label: 'Voler', client: 'target:interact:vendingmachine:thief', metadata: {}}, ]})