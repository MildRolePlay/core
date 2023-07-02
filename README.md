# MildRoleplay Core resource

- [MildRoleplay Core resource](#mildroleplay-core-resource)
- [Documentation client-side](#documentation-client-side)
  - [Streamer](#streamer)
    - [Exports](#exports)
  - [HUD](#hud)
    - [Classe:](#classe)
    - [Export:](#export)
- [Documentation server-side](#documentation-server-side)
  - [Newswire](#newswire)
    - [Object:](#object)
    - [Exports:](#exports-1)
        - [fetchNewswire](#fetchnewswire)
  - [Player:](#player)
    - [Classe:](#classe-1)
      - [Player:](#player-1)
      - [Players:](#players)
    - [Exports:](#exports-2)
    - [Evenements:](#evenements)
      - [Evenement emits:](#evenement-emits)
      - [Evenements attendu:](#evenements-attendu)
  - [Character:](#character)
    - [Types:](#types)
    - [Classe:](#classe-2)
    - [Evenements:](#evenements-1)
      - [Emits:](#emits)
      - [Attendu:](#attendu)
  - [Configuration server.cfg](#configuration-servercfg)

# Documentation client-side
---
## Streamer

### Exports
```ts
    globalThis.exports.core.requestModel(model: number|string, onLoaded: (model: string) => void): Promise<void>
    globalThis.exports.core.requestAnimDict(name: string): Promise<string>
    globalThis.exports.core.requestAnimSet(name: string): Promise<string>
```

---

## HUD

### Classe:
```ts
class HUD {
    public minimap: boolean = true;

    public chat: boolean = true;
    public serverHud: boolean = true;

    private tick: number;

    private minimapScaleform: number;

    constructor() {}
    public displayMinimap(toggle: boolean) {}
    public displayServerHud(toggle: boolean) {}
}
```

### Export:

```ts
    globalThis.exports.core.HUDDisplayMinimap(toggle: boolean)
    globalThis.exports.core.HUDDisplayServerHud(toggle: boolean)
    globalThis.exports.core.HUDDisplayPlayerLabel(toggle: boolean)

    globalThis.exports.core.HUDHasMinimap();
    globalThis.exports.core.HUDHasServerHud();
    globalThis.exports.core.HUDHasPlayerLabel();
```
---
# Documentation server-side
---

##  Newswire

### Object:

```ts
    type NewswireObject = {
        id: number,
        title: string,
        image: string,
        thumb: string,
        content: string,
        createdAt: number,
        updatedAt: number,
        inGame: boolean
    }
```

### Exports:

##### fetchNewswire
```ts
    global.exports.core.fetchNewswire(): Promise<NewswireObject[]>
```

---
## Player:

### Classe:

#### Player:
```ts
    class Player {
        public accountId: number;
        public pseudo: string;

        public character: Character;
        
        constructor(readonly source: number, pseudo: string, accountId: number) {};

        public addCharacter(character: Character): void {};
        public setRoutingBucket(bucket: number): void {};
    };
```

#### Players:
```ts
    class _Players {
        public players: Player[] = [];

        constructor() {}


        public add(player: Player): void {}
        public remove(playerOrSource: Player|number): boolean {}
        public find(source: number): Player|undefined
    }
```

### Exports:
```ts
    global.exports.core.GetPlayerObject(source: number): typeof Player
```

### Evenements:
#### Evenement emits:
| Nom                              |                              Argument                               |                              Résultat attendu |
| :------------------------------- | :-----------------------------------------------------------------: | --------------------------------------------: |
| client:core:auth:request         |                                 N/A                                 | Ouverture du formulaire inscription/connexion |
| client:core:auth:login:response  | [`success: boolean`, `errorType: string?`, `errorContent: string?`] |                                           N/A |
| client:core:auth:signin:response |               [`success: boolean`, `error: string?`]                |                                           N/A |

#### Evenements attendu:

| Nom                     |                            Argument                            |            Résultat attendu |
| :---------------------- | :------------------------------------------------------------: | --------------------------: |
| server:core:auth:login  |             [`pseudo: string`,`password: string`]              | ID de connexion a un compte |
| server:core:auth:signin | [`pseudo: string`, `password: string`, `confirmation: string`] | ID de connexion a un compte |

---
## Character:

### Types:

```ts
    interface CharacterDTO {
        id: number,
        accountId: number,
        firstName: string,
        lastName: string,
        sexe: boolean,
        birth: Date,
        lastX: number,
        lastY: number,
        lastZ: number,
        lastRot: number,
        createdAt: Date,
        updatedAt: Date
    }

    type CharacterInsertDB = Omit<CharacterDTO, 'id'|'lastX'|'lastY'|'lastZ'|'lastRot'|'createdAt'|'updatedAt'>
```

### Classe:

```ts
class Character {
    public id: number;

    public firstName: string;
    public lastName: string;
    public sexe: boolean;
    public birth: Date;

    public lastX: number;
    public lastY: number;
    public lastZ: number;
    public lastRot: number;

    public createdAt: Date;
    public updatedAt: Date;

    constructor(character: CharacterDTO) {}

    public getLastPosition(): [number, number, number, number] {}
}
```

### Evenements:
#### Emits:
| Nom                         |                      Argument                       |                         Résultat attendu |
| :-------------------------- | :-------------------------------------------------: | ---------------------------------------: |
| server:core:character:empty |                 [`source: number`]                  | Lancement de la création d'un personnage |
| server:core:character:found | [`source: number`, `character: JSON<CharacterDTO>`] |             Initialisation du personnage |
| client:core:character:init  |          [`character: JSON<CharacterDTO>`]          | Initialisation du personnage coté client |

#### Attendu:
| Nom                          |                        Argument                         |                              Résultat attendu |
| :--------------------------- | :-----------------------------------------------------: | --------------------------------------------: |
| server:core:character:create | [`source: number`,`character: JSON<CharacterInsertDB>`] | Création du personnage dans la base de donnée |
| server:core:character:spawn  |                   [`source: number`]                    | Téléporte le personnage au point d'apparition |

---

## Configuration server.cfg

```cfg
# Only change the IP if you're using a server with multiple network interfaces, otherwise change the port only.
endpoint_add_tcp "0.0.0.0:30120"
endpoint_add_udp "0.0.0.0:30120"

# These resources will start by default.
ensure oxmysql
ensure chat
ensure spawnmanager
ensure rconlog

ensure core
ensure loadingscreen
ensure auth

# This allows players to use scripthook-based plugins such as the legacy Lambda Menu.
# Set this to 1 to allow scripthook. Do note that this does _not_ guarantee players won't be able to use external plugins.
sv_scriptHookAllowed 0

# Uncomment this and set a password to enable RCON. Make sure to change the password - it should look like rcon_password "YOURPASSWORD"
#rcon_password ""

# A comma-separated list of tags for your server.
# For example:
# - sets tags "drifting, cars, racing"
# Or:
# - sets tags "roleplay, military, tanks"
sets tags "roleplay"

# A valid locale identifier for your server's primary language.
# For example "en-US", "fr-CA", "nl-NL", "de-DE", "en-GB", "pt-BR"
sets locale "fr-FR" 
# please DO replace root-AQ on the line ABOVE with a real language! :)

# Set an optional server info and connecting banner image url.
# Size doesn't matter, any banner sized image will be fine.
#sets banner_detail "https://url.to/image.png"
#sets banner_connecting "https://url.to/image.png"

# Set your server's hostname. This is not usually shown anywhere in listings.
sv_hostname "FXServer, but unconfigured"

# Set your server's Project Name
sets sv_projectName "My FXServer Project"

# Set your server's Project Description
sets sv_projectDesc "Default FXServer requiring configuration"

# Nested configs!
#exec server_internal.cfg

# Loading a server icon (96x96 PNG file)
#load_server_icon myLogo.png

# convars which can be used in scripts
set temp_convar "hey world!"

# Remove the `#` from the below line if you want your server to be listed as 'private' in the server browser.
# Do not edit it if you *do not* want your server listed as 'private'.
# Check the following url for more detailed information about this:
# https://docs.fivem.net/docs/server-manual/server-commands/#sv_master1-newvalue
#sv_master1 ""

# Add system admins
add_ace group.admin command allow # allow all commands
add_ace group.admin command.quit deny # but don't allow quit
add_principal identifier.fivem:1 group.admin # add the admin to the group

# enable OneSync (required for server-side state awareness)
set onesync on

# Server player slot limit (see https://fivem.net/server-hosting for limits)
sv_maxclients 48

# Steam Web API key, if you want to use Steam authentication (https://steamcommunity.com/dev/apikey)
# -> replace "" with the key
set steam_webApiKey ""

# License key for your server (https://keymaster.fivem.net)
sv_licenseKey 

set mysql_connection_string ""
```