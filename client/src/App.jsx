import './App.css'
import { TaskManagement } from './pages/manage-task.jsx'
import { BrowserRouter,Routes, Route } from 'react-router-dom'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
         
      <Route path="/" element={<TaskManagement/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
