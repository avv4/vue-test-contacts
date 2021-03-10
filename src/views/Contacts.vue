<template>
  <div class="contacts">
    <div class="contacts__search">
      <a class="button contacts__searchBtn" @click="addContact($store.state.contacts.newContactText)">Add contact</a>
      <input type="text" v-model="$store.state.contacts.newContactText">
    </div>
    <table class="table contacts__table">
      <thead>
        <tr>
          <th class="table__th">Name</th>
          <th class="table__th">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!getAllContacts.length">
          <td colspan="100" class="table__tdBig">Table is empty</td>
        </tr>
        <tr v-else v-for="item in getAllContacts" :key="item.id"> 
          <td class="table__td">{{ item.name }}</td>
          <td class="table__td">
            <router-link :to="{ name: 'EditContact', params: {editableItem: item} }">Edit</router-link>
            <a @click="showModal(item)" class="table__deleteItem">Delete</a>
          </td>
        </tr>
      </tbody>
    </table>

    <Modal
      v-if="modalVisible"
      :deleted-name="deletedItem.name"
      @agree="deleteContact(deletedItem.id);modalVisible = false"
      @close="modalVisible = false">
    </Modal>

  </div>
</template>

<script>

import { mapGetters, mapActions, mapMutations } from "vuex";
import Modal from "@/components/Modal";

export default {
  components: {
    Modal
  },

  data() {
    return {
      modalVisible: false,
      deletedItem: {},
    }
  },

  computed: {
    ...mapGetters(['getAllContacts']),
  },

  methods: {
    ...mapActions(['addContact', 'deleteContact']),
    showModal(deletedItem) {
      this.modalVisible = true;
      this.deletedItem = deletedItem
    }
  },
}

</script>

<style lang="scss" scoped>
  .contacts {
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 600px;
    max-width: 100%;

    &__table {
      margin-top: 20px;
    }

    &__search {
      display: flex;
      align-items: center;
    }

    &__searchBtn {
      margin-right: 10px;
    }
  }
</style>