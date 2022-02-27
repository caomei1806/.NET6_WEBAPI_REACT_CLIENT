import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.css'
import { AuthProvider } from './context/AuthProvider'
ReactDOM.render(
	<AuthProvider>
		<App />
	</AuthProvider>,

	document.getElementById('root')
)
