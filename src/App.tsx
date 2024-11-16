import { BuscadorViajes } from "./components/buscadorViajes"
import Header from "./components/header"
import Menu from "./components/menu"
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';

function App(){
    return(<>
    <Header></Header>
    <BuscadorViajes></BuscadorViajes>
    <Menu></Menu>
    </>) 
}

export default App