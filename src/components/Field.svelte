<script lang="ts">
  import { snake } from '../models/snake';
  import { apple } from '../models/apple';
  import { FIELD_SIZE } from '../constants';

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

<div class="count">{$snake.length}</div>
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
    background: lightcoral;
  }
  .apple {
    background: lightblue;
  }
</style>
