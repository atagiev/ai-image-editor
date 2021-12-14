<template>
  <transition name="modal-fade">>
    <div class="modal-backdrop">
      <div class="modal">
        <div class="modal-body">
          {{ msg }}
        </div>

        <div class="modal-footer">
          <button
                type="button"
                class="btn-green"
                @click="submit"
              >
                Ок
          </button>
          <button
                type="button"
                class="btn-green"
                @click="cancel"
              >
                Отмена
            </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'modal',
  props: ['msg'],
  methods: {
    cancel () {
      this.$emit('close')
    },
    submit () {
      this.$emit('')
    }
  }
}
</script>

<style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: rgba(25, 27, 24, 0.94);
    /* overflow-x: auto; */
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 20px 40px;
  }

  .modal-footer {
    /* border-top: 1px solid #eeeeee; */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* justify-content: flex-end; */
  }

  .modal-body {
    /* padding: 30px 10px; */
    padding-bottom: 30px;
    width: auto;
    text-align: start;
    /* height: 60px; */
  }

  /* .btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  } */

  .btn-green {
    color: white;
    background: #31A265;
    border: 1px solid #31A265;
    border-radius: 2px;
    width: 70px;
    padding: 7px 10px;
  }
  .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease
  }
</style>
