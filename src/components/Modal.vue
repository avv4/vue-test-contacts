<template>
  <div class="modal">
    <h6>Are you sure you want to delete {{ deletedName }} ?</h6>
    <button class="modal__agree" @click="$emit('agree')">OK</button>
    <button class="modal__cancel" @click="$emit('close')">Cancel</button>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import Modal from "@/components/Modal";

export default {
  props: ['deletedName'],
}
</script>

<style lang="scss" scoped>
  .modal {
    width: 500px;
    position: fixed;
    top: 40%;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgb(0 0 0 / 33%);
    transition: all 0.3s ease;
  }
</style>