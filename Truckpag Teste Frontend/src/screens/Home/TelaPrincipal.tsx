import { useDispatch} from 'react-redux';
import { setAnotacao } from '../../provider/store';
import { FaEye} from "react-icons/fa";
import { MdFavoriteBorder, MdOutlineSearch } from "react-icons/md";
import { LuNotebook } from "react-icons/lu";
import Lista from './components/ListagemFilmes';
import { useFilmes } from '../../hooks/useFilmes';
import imgEncontrado from '../../assets/semConteudo.gif'

function TelaPrincipal(){

    const {
        dados,
        setDados,
        dadosFiltrados,
        setDadosFiltrados,
        inputFiltros,
        setInputFiltros,
        filtroCheck,
        setFiltroCheck,
        loading,
      } = useFilmes();

    const FiltradorTitle = (e:any)=>{
        
        setInputFiltros(e.target.value)
        
    }

    const ValidacaoCheckbox =(e:any)=>{
        
        const {value, checked} = e.target
       
        setFiltroCheck(prev=>({
            ...prev,
            [value.toLowerCase()]:checked
        }))

    }

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
          setDados(assitido)
           
    }

    function handleMarcadoFavorito(index: number){

        const favorito = dados.map((marcado,i)=>{
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
         
         setDados(favorito)
         
    }

    const dispatch = useDispatch();

    const salvarAnotacao = (id: string, anotacao: string) => {
        
        dispatch(setAnotacao({ id, anotacao }));

        const AtualizandoAnotacoes = dados.map((filme)=>{
            if(filme.id === id){
                return {...filme, anotacao_descricao:anotacao}
            }else{
                return filme
            }
            
        })
       
        const checkanotacao = AtualizandoAnotacoes.map((marcado)=>{
            if(id===marcado.id){
                if(!marcado.check_anotacao){
                    return {...marcado,
                        check_anotacao:true
                    }
                }else if(marcado.check_anotacao && marcado.anotacao_descricao ===''){
                    return {...marcado,
                        check_anotacao:false}
                } else{
                    return {...marcado};
                }
            }else{
                return {...marcado};
            }
         })
         setDadosFiltrados(checkanotacao)
         setDados(checkanotacao)

      };
    
    return(
        <div className='flex flex-col '>

                <div className='flex items-center flex-col'>
                    <h1 className='text-3xl'>Studio Ghibli Collection</h1>
                    <p>Explore o mundo magico do Studio Ghibli Filmes. Marque seus favoritos e marque seus assitidos</p>
                </div>

                <div className='flex flex-col items-center'>
                        <div className='flex items-center justify-items-start mt-[10px] w-[100%] max-w-[1250px]'>
                            <MdOutlineSearch className='absolute'/>
                            <input className=' w-full  focus pl-5 focus:outline
                                focus:border-sky-500 border-[#c0c0c0] border-1 rounded-[3px]'
                                onChange={FiltradorTitle} value={inputFiltros} placeholder='Busque Filmes por títulos..'>
                            </input>
                        </div>

                        <div className='flex items-center justify-items-start mt-[25px] 
                            mb-[25px] w-[80%] max-w-[1250px] gap-[6px]'>
                            <b>Filtros:</b>
                            
                           
                            <div>
                                <input className='peer hidden' type="checkbox" onChange={ValidacaoCheckbox} value='Assistido' id='Assistido' ></input> 
                                <label htmlFor='Assistido' className=' flex items-center gap-[3px] select-none
                                    cursor-pointer px-3  rounded-lg border 
                                    peer-checked:bg-green-200 peer-checked:text-green-900 peer-checked:border-green-400 
                                    transition-colors duration-200'>  <FaEye /> Assitidos 
                                </label>
                            </div>
                            <div>
                                <input className='peer hidden' onChange={ValidacaoCheckbox} type="checkbox" value='Favorito' id='Favorito'  ></input>
                                <label htmlFor='Favorito' className=' flex items-center gap-[3px] select-none
                                    cursor-pointer px-3  rounded-lg border 
                                    peer-checked:bg-red-200 peer-checked:text-red-900 peer-checked:border-red-400 
                                    transition-colors duration-200'>  <MdFavoriteBorder /> Favoritos
                                </label>
                            </div>
                            <div>
                                <input className='peer hidden' onChange={ValidacaoCheckbox} type="checkbox" value='check_anotacao' id='check_anotacao'></input>
                                <label htmlFor='check_anotacao' className=' flex items-center gap-[3px] select-none
                                    cursor-pointer px-3  rounded-lg border 
                                    peer-checked:bg-yellow-200 peer-checked:text-yellow-900 peer-checked:border-yellow-400 
                                    transition-colors duration-200'>  <LuNotebook /> Anotações
                                </label>
                           </div>
                        </div>
                </div>

                <div className='flex justify-center'>
                    <div className='flex columns flex-wrap gap-5 justify-center pl-40 pr-40 max-w-[1600px]' >

                            {loading && <p>Carregando..</p>}
                            {!loading && dadosFiltrados.length === 0 ?
                                <div className='flex flex-col items-center'>
                                    <p className='text-[24px]'>Nenhum Filme Encontrado...</p>
                                    <img className='rounded-[130px]' src={imgEncontrado}></img>
                                </div>
                                : dadosFiltrados.map((dadosfilmes,i) =>{
                                    return(  
                                        <Lista pId={dadosfilmes.id} pTitle={dadosfilmes.title} pImage={dadosfilmes.image}
                                            pDescription={dadosfilmes.description} pDirector={dadosfilmes.director} pProducer={dadosfilmes.producer} pRelease_date={dadosfilmes.release_date}
                                            pRunning_time={dadosfilmes.running_time} pRt_score={dadosfilmes.rt_score}
                                            pFavorito={dadosfilmes.favorito} pAssistido={dadosfilmes.assistido}
                                            ativarAssitidos={() => {handleMarcadoAssitido(i); } } ativarFavorito={() => { handleMarcadoFavorito(i); } }  pAnotacao={dadosfilmes.anotacao_descricao}                                            
                                            SalvarNote={(id: string, anotacao: string) => salvarAnotacao(id, anotacao)} checkNote={dadosfilmes.check_anotacao}>
                                        </Lista>
                                    )
                                })
                            }
                    </div>
                </div>
        </div>
    )
}

export default TelaPrincipal