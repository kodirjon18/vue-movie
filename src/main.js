import { createApp } from 'vue'
import App from './components/app/App.vue'
import './index.css'
import Box from './ui-components/Box.vue'
import PrimaryButton from './ui-components/PrimaryButton.vue'
import Input from './ui-components/Input.vue'

const app = createApp(App)

app.component('box', Box)
app.component('primary-button', PrimaryButton)
app.component('k-input', Input)

app.mount('#app')
