import Vue from 'vue'

export default {
  state: {
    allContacts: [],
    newContactText: ''
  },

  getters: { 
    getAllContacts(state) {
      return state.allContacts
    },
  },

  mutations: {
    addContact(state, contacts) {
      state.allContacts.push(contacts)
    },

    clearAddingInput(state, val) {
      state.newContactText = val;
    },

    deleteContact(state, id) {
      state.allContacts = state.allContacts.filter(i => i.id != id)
    },

    saveContactInfo(state, info) {
      //if the 'id' are the same, we overwrite the array of the current contact element
      for (let c in state.allContacts) {
        if (state.allContacts[c].id == info.id) {
          state.allContacts[c].list = info.list
        }
      }
    }
  },

  actions: {
    async addContact({commit}, contact) {
      if (contact.length) {
        let newContact = {
          'id': Date.now(),
          'list': [],
        }
        Vue.set(newContact, 'name', contact)
        commit('addContact', newContact)
        commit('clearAddingInput', '')
      }
    },

    async deleteContact({commit}, id) {
      commit('deleteContact', id)
    },

    async saveContactInfo({commit}, item) {
      for (let key in item.list) {
        if (item.list[key].name.length == 0 || item.list[key].val.length == 0) {
          alert('Fill in all the fields')
          return false
        }
      }
      commit('saveContactInfo', item);
      alert('Saved')
    }
  }
}