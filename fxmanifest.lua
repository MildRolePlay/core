fx_version 'cerulean'

game 'gta5'

name 'core'

client_script {
   'dist/client/*.client.js'
}

server_script 'dist/server/*.server.js'

ui_page {
    "ui/index.html"
 }
 
 files {
    "ui/index.html",
    "ui/assets/index.js",
    "ui/assets/*.css",
    "ui/assets/*.*",
    "ui/*.*"
 }