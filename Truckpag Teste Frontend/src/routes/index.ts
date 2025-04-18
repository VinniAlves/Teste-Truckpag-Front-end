import { useMemo } from "react";
import PATHTelaPrincipal from "./TelaPrincipal.route";

function useRoutes(){
    const routes = useMemo(()=>[
        ...PATHTelaPrincipal
    ],[])
    return routes
}

export default useRoutes