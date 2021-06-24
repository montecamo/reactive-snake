<script lang="ts">
  import { onMount } from 'svelte';
  import Field from './components/RxField.svelte';
  import { start } from './rx-models/core';

  onMount(start);
</script>

<Field />

<style>
  :global(html, body) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
