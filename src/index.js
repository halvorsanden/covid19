import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'
import './css/main.css'

const container = document.querySelector('#main')
const root = createRoot(container)
root.render(<App />)
