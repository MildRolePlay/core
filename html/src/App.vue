<script setup lang="ts">
  import {ref, Ref} from 'vue'
import { NUIEventManager } from './utils/events';

  const toggle: Ref<boolean> = ref(true);

  NUIEventManager.addEventListener<{show?: boolean}>('toggle', (data) => {
    if(data.show) {
      toggle.value = data.show;
    } else {
      toggle.value = !toggle.value;
    }
  });
</script>

<template>
  <section v-show="toggle" class="window">
      <h3>Content</h3>
  </section>
</template>
