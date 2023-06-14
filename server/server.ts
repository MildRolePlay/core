on('onResourceStart', (resource: string) => {
    if(resource === GetCurrentResourceName()) {
        console.log('vue-boilerplate ready !')
    }
});