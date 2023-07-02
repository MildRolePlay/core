<template>
    <section v-show="toggle" class="h-screen !w-full relative">
        <need/>
    </section>
</template>

<script setup lang="ts">
    import {ref, Ref} from 'vue'
    import { NUIEventManager } from './utils/events';
    import need from './components/need.vue';

    const toggle: Ref<boolean> = ref(false);

    NUIEventManager.addEventListener<{show?: boolean}>('toggle', (data) => {
        if(data.show) {
            toggle.value = data.show;
        } else {
            toggle.value = !toggle.value;
        }
    });
</script>