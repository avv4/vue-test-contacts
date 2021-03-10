<template>
  <div class="edit-contact">
    <div class="edit-contact__buttons">
      <a class="button" @click="addNewItem">Add new item</a>
      <a class="button button--info" :disabled="isDisabled" @click="stepBack">Step back</a>
    </div>

     <table class="table edit-contact__table">
      <thead>
        <tr>
          <th class="table__th">Name</th>
          <th class="table__th">Value</th>
          <th class="table__th">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!editableItemTemp.list.length">
          <td colspan="100" class="table__tdBig">Table is empty</td>
        </tr>
        <tr v-else v-for="item in editableItemTemp.list" :key="item.id"> 
          <td class="table__td">
            <input type="text" v-model="item.name">
          </td>
          <td class="table__td">
            <input type="text" v-model="item.val">
          </td>
          <td class="table__td">
            <a @click="showModal(item)" class="table__deleteItem">Delete</a>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="edit-contact__buttons">
      <a @click="saveContactInfo(editableItemTemp)" class="button button--info">Save</a>
      <router-link class="button button--danger" to="/">Cancel</router-link>
    </div>

    <Modal
      v-if="modalVisible"
      :deleted-name="deletedItem.name"
      @agree="deleteItem(deletedItem.id);modalVisible = false"
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
  props: ['editableItem'],

  data() {
    return {
      modalVisible: false,
      deletedItem: {},
      editableItemTemp: {},
      historyArr: [],
      isDisabled: true
    }
  },
  computed: {
    ...mapGetters(['getAllContacts']),
  },

  created() {
    //create copy of editableItem object
    this.editableItemTemp = JSON.parse(JSON.stringify(this.editableItem));
  },

  methods: {
    ...mapActions(['saveContactInfo']),
    showModal(deletedItem) {
      this.modalVisible = true;
      this.deletedItem = deletedItem
    },

    //add a new item to the copied object
    addNewItem() {
      let currId = Date.now();
      let newItemObj = {
        'id': currId,
        'name': '',
        'val': '',
      }
      this.editableItemTemp.list.push(newItemObj);
      this.historyArr.push({
        'id': currId,
        'type': 'addingItem',
      })

      this.isDisabled = false

    },

    //delete item from copied object
    deleteItem(id) {
      this.editableItemTemp.list = this.editableItemTemp.list.filter((el, index)=> {
        if (el.id==id) {
          this.historyArr.push({
            'elem': el,
            'index': index,
            'type': 'removeItem',
          })
        }
        else {
          return el
        }
      });

      this.isDisabled = false
    },

    stepBack() {
      if (this.isDisabled == true) {
        return false
      }

      let lastAction = this.historyArr[this.historyArr.length-1];
      switch (lastAction.type) {
        case 'addingItem':
          this.editableItemTemp.list = this.editableItemTemp.list.filter((el)=> {
            return el.id!=lastAction.id
          })
        break;
        case 'removeItem':
          this.editableItemTemp.list.splice(lastAction.index, 0, lastAction.elem);
        break;
      }

      //remove last elem from historyArr
      this.historyArr.pop()
      if (!this.historyArr.length) {
        this.isDisabled = true
      }

    }
  },
}

</script>

<style lang="scss">
  .edit-contact {
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 600px;
    max-width: 100%;

    &__table {
      margin: 20px 0;
      padding: 10px;
    }

    &__buttons {
      display: flex;
      align-items: center;
      justify-content: center;

      * {
        margin-right: 5px;
      }
    }
  }
</style>