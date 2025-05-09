import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Patients from './components/patients/Patients.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Patients></Patients>
    </>
  )
}

export default App
