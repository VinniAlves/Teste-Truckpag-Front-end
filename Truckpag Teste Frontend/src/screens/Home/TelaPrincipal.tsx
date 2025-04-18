
import { SetStateAction, useEffect, useState } from 'react'
import { ListagemFilmes } from '../../interfaces'

import { FaEye,FaRegStar } from "react-icons/fa";
import { MdFavoriteBorder, MdOutlineSearch } from "react-icons/md";
import { LuNotebook } from "react-icons/lu";
import Lista from './components/ListagemFilmes';




function TelaPrincipal(){

// Dados Master - Sempre atualizar os valores
const [dados,setData] = useState<ListagemFilmes[]>([])

const [dadosFiltrados,setDadosFiltrados] = useState<ListagemFilmes[]>([])

const [inputFiltros, setInputFiltros] = useState('')
const [filtroCheck, setFiltroCheck] = useState({
    assistido:false,
    favorito:false,
    anotacao:false
})

const [loading, setLoading] = useState(true)






// Ver se é possivel utilizar o await e Async

useEffect(() => {
    
    fetch('https://ghibliapi.vercel.app/films',{
        method:'GET',
        headers: {
  
        }
      })
      .then(response => response.json())
      

      .then(data => {
            
            
            const dadosModificados = data.map((dadosOriginais: any) =>{
                return{
                    ...dadosOriginais,
                    assistido: false,
                    favorito:false,
                    anotação:''
                }
            })
            

            setData(dadosModificados)
            setDadosFiltrados(dadosModificados)
           
            
      })

      .catch(err => {
            console.log(err)
            
      })
      .finally(()=>{
        setLoading(false)
      })
  }, [])



//TEM ERROS AQUI AJUSTAR

function AplicarFiltros(){
    let resultados = dados;

    if(inputFiltros.trim() !== ''){
        resultados = resultados.filter(filtros => filtros.title.toLowerCase().includes(inputFiltros.toLowerCase()))
    }


    if(filtroCheck.assistido){
        resultados= resultados.filter(filtros=> filtros.assistido)
    }

    if(filtroCheck.favorito){
        resultados= resultados.filter(filtros=> filtros.favorito)
    }

    if(filtroCheck.anotacao){
        resultados= resultados.filter(filtros=> filtros.anotação)
    }

    setDadosFiltrados(resultados)


}

const FiltradorTitle = (e:any)=>{
    
    setInputFiltros(e.target.value)
    
}

useEffect(()=>{
    AplicarFiltros()
},[inputFiltros,filtroCheck])

// Funciona!!
    const ValidacaoCheckbox =(e:any)=>{
       
        const {value, checked} = e.target
        setFiltroCheck(prev=>({
            ...prev,
            [value.toLowerCase()]:checked
        }))

    }



    // Replicar a funcionalidade para favorito

    function handleMarcadoAssitido(index: number){
        console.log(index)
        const assitido = dados.map((marcado,i)=>{
            if(i===index){
               
                if(marcado.assistido==false){
                    return {...marcado,
                        assistido:true}
                }else{
                    return {...marcado,
                        assistido:false}
                }
               
            }else{
                return {...marcado};
            }
         })
         
          setDadosFiltrados(assitido)
          setData(assitido)
          
    }

    function handleMarcadoFavorito(index: number){
        console.log(index)
        
        const favorito = dadosFiltrados.map((marcado,i)=>{
            if(i===index){
                if(marcado.favorito==false){
                    return {...marcado,
                        favorito:true}
                }else{
                    return {...marcado,
                        favorito:false}
                }

               
            }else{
                return {...marcado};
            }
         })
         
         setDadosFiltrados(favorito)
         setData(favorito)
          
    }


    // Vou usar isso para converter o Min do filme
    const TempoFilme = (total:number)=>{
        console.log(total)
        const horas = Math.floor(total / 60)
        const minutos = total%60
        console.log(`${horas}h, ${minutos}m`)
        return {horas,minutos}
        
    }

    

    return(
        <div className='flex flex-col'>
        
                <div className='flex items-center flex-col'>
                    
                    <h1 className='text-3xl'>Studio Ghibli Collection</h1>
                    <p>Explore o mundo magico do Studio Ghibli Filmes. Marque seus favoritos e marque seus assitidos</p>
                </div>

                <div className='flex items-center justify-center mt-[10px] '>
                    <MdOutlineSearch />
                    <input className='max-w-[700px] w-full border-[#c0c0c0] border-1 rounded-[3px] focus
                        focus:border-sky-500 focus:outline
                    '
                     onChange={FiltradorTitle} value={inputFiltros} placeholder='Busque Filmes por títulos..'></input>
                </div>

                <div className='flex items-center justify-center mt-[25px] mb-[25px] '>
                    <b>Filtros:</b>
                    <FaEye /> <input type="checkbox" onChange={ValidacaoCheckbox} value='Assistido' id='Assistido' ></input> <p>Assitidos</p>

                    <MdFavoriteBorder /><input onChange={ValidacaoCheckbox} type="checkbox" value='Favorito' id='Favorito'  ></input> <p>Favoritos</p>

                    <LuNotebook /><input onChange={ValidacaoCheckbox} type="checkbox" value='Anotacao' id='Anotacao'></input> <p>Com Anotações</p>
                </div>

                <div>

            <div className='flex columns flex-wrap gap-5 justify-center pl-40 pr-40 ' >

                    {loading && <p>Carregando..</p>}
                    {!loading && dadosFiltrados.length === 0
                        ?
                        <p>Nenhum Dado Encontrado</p>
                        :
                        dadosFiltrados.map((dadosfilmes,i) =>{
                        
                            return(
                                
                                <Lista pId={dadosfilmes.id} pTitle={dadosfilmes.title} pImage={dadosfilmes.image} 
                                pDescription={dadosfilmes.description} pDirector={dadosfilmes.director} pProducer={dadosfilmes.producer} pRelease_date={dadosfilmes.release_date} 
                                pRunning_time={dadosfilmes.running_time} 
                                pRt_score={dadosfilmes.rt_score} pFavorito={dadosfilmes.favorito} pAssistido={dadosfilmes.assistido} pAnotação={''} 
                                ativarAssitidos={()=>{handleMarcadoAssitido(i)} } ativarFavorito={()=>{handleMarcadoFavorito(i)}}
                                
                                ></Lista>
                            

                            )
                        })
                    }
            </div>
                    
                    

                </div>

        </div>
    )

}

export default TelaPrincipal