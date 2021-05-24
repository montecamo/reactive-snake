<script lang="ts">
  import { onMount } from 'svelte';
  import Field from './components/Field.svelte';
  import { start } from './models/core';

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
