import Vue from 'vue'
import VueRouter from 'vue-router'
import Contacts from '../views/Contacts.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Contacts',
    component: Contacts
  },
  {
    path: '/edit-contact',
    name: 'EditContact',
    props: true,
    component: () => import('../views/EditContact.vue')
  }
]

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
