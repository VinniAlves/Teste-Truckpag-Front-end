const ROUTE_PATH = "/"

import { JSX } from "react"
import TelaPrincipal from "../screens/Home"

const PATHCadastroPecas: {path:string; element: JSX.Element}[]=[
    {
        path: ROUTE_PATH,
        element:<TelaPrincipal/>
    }
];



const PATHTelaPrincipal: {path:string; element: JSX.Element}[]= [
    {
        path:ROUTE_PATH,
        element:<TelaPrincipal/>
          
        
    }

];

export default PATHTelaPrincipal