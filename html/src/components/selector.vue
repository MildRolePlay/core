<template>
    <div class="h-screen !w-full relative">
        <div v-if="result.hit" class="w-full flex-col justify-center text-center items-center text-white">
            <p>X: {{ result.endCoords.x }} | Y: {{ result.endCoords.y }} | Z: {{ result.endCoords.z }}</p>
            <p>Entity: {{ result.entity }}</p>
        </div>
        <div v-if="enablePoint" class="absolute h-[8px] w-[8px] rounded-full bg-base-content border border-base-200 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"></div>

        <div v-if="enablePoint" v-for="(point, i) in entityPoints" :key="i" @click.prevent="handleClick(i)" class="absolute rounded-full bg-secondary border border-base-200 -translate-y-1/2 -translate-x-1/2 h-[16px] w-[16px] hover:!bg-accent" @click="" :style="{'top': point.y+'px', 'left': point.x+'px'}"></div>

        <i-menu v-if="enableMenu" :items="entityPoints[indexSelected].menu.items" :entity="entityPoints[indexSelected].entity"/>
    </div>
</template>

<script setup lang="ts">
    interface EntityPoint {
        x: number,
        y: number,
        menu: {items: {label: string, client?:string, server?:string, metadata: any}[]},
        entity: number
    }

    import {onMounted, ref, Ref} from 'vue'
    import { NUIEventManager } from '../utils/events';
    import { fetchNUI } from '../utils/fetch';
    import IMenu from './selections/menu.vue';

    const enablePoint: Ref<boolean> = ref(true);
    const enableMenu: Ref<boolean> = ref(false);
    const indexSelected: Ref<number> = ref(0);

    type TResult = {
        hit: boolean,
        endCoords: {x: number, y: number, z: number},
        entity: number,
    };

    const result: Ref<TResult> = ref({hit: false, endCoords: {x: 0, y: 0, z: 0}, entity: 0, model: ""});

    const entityPoints: Ref<EntityPoint[]> = ref([])
    
    NUIEventManager.addEventListener<TResult>('ray_result', (data) => {
        result.value = data;
    });

    NUIEventManager.addEventListener<{points: EntityPoint[]}>('points', ({points}) => {
        entityPoints.value = points;
    });

    const handleClick = async (index: number) => {
        enablePoint.value = false;

        if(entityPoints.value[index].menu.items.length > 1) {
            enableMenu.value = true;
            indexSelected.value = index;
        }
        else {
            const item = entityPoints.value[index].menu.items[0];
            await fetchNUI<{item: {label: string, client?: string, server?: string, metadata: any}, entity: number}, boolean>('target:selectMenuItem', {item: item, entity: entityPoints.value[index].entity});
        }
        

        await fetchNUI('target:selected', null);
    };

    onMounted(() => {
        enableMenu.value = false;
        indexSelected.value = 0;

        enablePoint.value = true;
    })
</script>