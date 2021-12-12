<template>
  <div class="effect-text">
    Эффект: {{ CUR_EFFECT }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default ({
  name: 'EffectText',
  computed: {
    ...mapGetters(['CUR_EFFECT'])
  }
})
</script>

<style scoped>
  .effect-text{
    display: inline-block;
    font-size: 20px;
    background-color: rgba(0, 0, 0, 0.329);
    max-width: 50%;
    margin: auto;
    padding: 5px 20px;
    border-radius: 20px;
    margin-top: 10px;
  }
</style>
