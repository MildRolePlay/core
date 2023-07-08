<template>
    <div class="h-screen !w-full relative">
        <div class="menu bg-base-200 w-56 rounded-box top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute text-neutral-content overflow-hidden">
            <li v-for="(item, i) in items" :key="`menu_${i}`" @click="handle(i)"><a>{{ item.label }}</a></li>
        </div>
    </div>
</template>

<script setup lang="ts">
import { fetchNUI } from '../../utils/fetch';

    const {entity, items} = defineProps<{
        items: {label: string, client?: string, server?: string, metadata: any}[],
        entity: number
    }>();

    console.log(items);

    const handle = async (index: number) => {
        await fetchNUI<{item: {label: string, client?: string, server?: string, metadata: any}, entity: number}, boolean>('target:selectMenuItem', {item: items[index], entity: entity});
    }
</script>