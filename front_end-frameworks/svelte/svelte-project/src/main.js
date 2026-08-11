import { mount } from 'svelte'
import App from './App.svelte'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './global.css'

const app = mount(App, {
  target: document.getElementById('app'),
})

export default app
