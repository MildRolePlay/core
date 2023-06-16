# MildRoleplay Core resource

- [MildRoleplay Core resource](#mildroleplay-core-resource)
  - [Documentation server-side](#documentation-server-side)
  - [Newswire](#newswire)
    - [Object:](#object)
    - [Exports:](#exports)
        - [fetchNewswire](#fetchnewswire)
  - [Player](#player)
    - [Classe:](#classe)
      - [Player:](#player-1)
      - [Players:](#players)
    - [Evenements:](#evenements)
      - [Evenement emits:](#evenement-emits)
      - [Evenements attendu:](#evenements-attendu)
  - [Configuration server.cfg](#configuration-servercfg)


## Documentation server-side
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
## Player
---

### Classe:

#### Player:
```ts
    class Player {
        private accountId: number;
        public pseudo: string;
        
        constructor(readonly source: number, pseudo: string, accountId: number) {};
    };
```

#### Players:
```ts
    class _Players {
        public players: Player[] = [];

        constructor() {}


        public add(player: Player): void {}

        public remove(playerOrSource: Player|number): boolean {}
    }
```

---
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


## Configuration server.cfg

---

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