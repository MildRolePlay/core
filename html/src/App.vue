<template>
    <section class="h-screen !w-full relative overflow-hidden">
        <need v-show="toggle"/>
        <selector v-if="toggleSelector"/>
    </section>
</template>

<script setup lang="ts">
    import {ref, Ref} from 'vue'
    import { NUIEventManager } from './utils/events';

    import need from './components/need.vue';
    import selector from './components/selector.vue';

    const toggle: Ref<boolean> = ref(false);
    const toggleSelector: Ref<boolean> = ref(false);

    NUIEventManager.addEventListener<{show?: boolean}>('toggle', (data) => {
        if(data.show) {
            toggle.value = data.show;
        } else {
            toggle.value = !toggle.value;
        }
    });

    NUIEventManager.addEventListener<{show?: boolean}>('toggleSelector', (data) => {
        toggleSelector.value = typeof data.show === 'boolean' ? data.show : !toggleSelector.value
    });
</script>