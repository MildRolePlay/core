<template>
    <div class="absolute bottom-1 right-1 2xl:w-1/12 xl:w-2/12 w-4/12 flex flex-col space-y-2">
        <div class="need bg-gradient-to-l from-base-200 to-transparent rounded-md w-full p-2 flex flex-row justify-start items-center prose space-x-2">
            <div class="flex flex-col justify-between items-end flex-1">
                <h6>{{needs.food}}%</h6>
                <progress class="progress progress-info w-full" :value="needs.food" max="100"></progress>
            </div>
            <food class="w-[32px]"/>
        </div>

        <div class="need bg-gradient-to-l from-base-200 to-transparent rounded-md w-full p-2 flex flex-row justify-start items-center prose space-x-2">
            <div class="flex flex-col justify-between items-end flex-1">
                <h6>{{needs.drink}}%</h6>
                <progress class="progress progress-warning w-full" :value="needs.drink" max="100"></progress>
            </div>
            <water class="w-[32px]"/>
        </div>

        <div class="need bg-gradient-to-l from-base-200 to-transparent rounded-md w-full p-2 flex flex-row justify-start items-center prose space-x-2">
            <div class="flex flex-col justify-between items-end flex-1">
                <h6>{{needs.health}}%</h6>
                <progress class="progress progress-error w-full" :value="needs.health" max="100"></progress>
            </div>
            <heart class="w-[32px]"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import food from './icons/food.vue';
import water from './icons/water.vue';
import heart from './icons/heart.vue'
import { NUIEventManager } from '../utils/events';
import {ref} from 'vue'

const needs = ref({
    health: 100,
    food: 100,
    drink: 100
});

NUIEventManager.addEventListener<{health: number, food: number, drink: number}>('updateNeed', (data) => {
    needs.value = data;
})
</script>