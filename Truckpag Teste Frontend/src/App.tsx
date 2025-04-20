import { BrowserRouter, Route,Routes } from 'react-router-dom'
import useRoutes from './routes'
import { Provider } from 'react-redux';
import { store } from '../src/provider/store';

function App() {
  
  const routes = useRoutes();

  return(
    <Provider store={store}>
        <BrowserRouter>
          <Routes>
              {
                routes.map((route,index)=>(
                  <Route key={index} path={route.path} element={route.element}/>
                ))
              }
          </Routes>
        </BrowserRouter>
      </Provider>
  )
  
  
}

export default App
