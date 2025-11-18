import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex min-h-svh bg-black text-white flex-col items-center justify-center">
      <button>Click me</button>
    </div>
  )
}

export default App
