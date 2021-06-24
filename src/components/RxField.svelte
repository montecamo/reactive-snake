<script lang="ts">
  import { snake$ as snake } from '../rx-models/snake';
  import { apple$ as apple } from '../rx-models/apple';
  import { FIELD_SIZE } from '../constants';
  import { clock$ as clock } from '../rx-models/core';
  import { speed$ as speed } from '../rx-models/speed';
  import { vector$ as vector } from '../rx-models/vector';

  const rows = new Array(FIELD_SIZE).fill(0);
  const columns = new Array(FIELD_SIZE).fill(0);

  $: field = rows.map((_, y) => {
    return columns.map((_, x) => {
      if ($apple.x === x && $apple.y === y) {
        return 'apple';
      }

      if (Boolean($snake.find((s) => s.x === x && s.y === y))) {
        return 'snake';
      }

      return false;
    });
  });
</script>

<div class="count">snake: {$snake.length}</div>
<div class="count">clock: {$clock}</div>
<div class="count">speed: {$speed}</div>
<div class="count">vector: {$vector}</div>
<div class="field">
  {#each field as row}
    <div class="row">
      {#each row as type}
        <div
          class="column"
          class:apple={type === 'apple'}
          class:snake={type === 'snake'}
        />
      {/each}
    </div>
  {/each}
</div>

<style>
  .field {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
  }

  .row {
    display: flex;
  }

  .column {
    width: 20px;
    height: 20px;
    margin: 2px;

    background: lightgrey;
  }

  .snake {
    background: green;
  }
  .apple {
    background: red;
  }
</style>
