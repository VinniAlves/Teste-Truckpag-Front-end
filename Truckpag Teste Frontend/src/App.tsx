import './App.css'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import useRoutes from './routes'




function App() {
  

  const routes = useRoutes();


  return(
    
       <BrowserRouter>
        <Routes>

          {
            routes.map((route,index)=>(
              <Route key={index} path={route.path} element={route.element}/>
            ))
          }
        </Routes>
      </BrowserRouter>
    
  )
  
  
}





export default App
