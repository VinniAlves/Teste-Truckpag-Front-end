import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux';
import { setAnotacao } from "../../../../provider/store"
import { Props } from "../../../../interfaces/PropsAnotacoes";

function Anotacoes({titulo, abrirFecharModal,idFilm,salvarAnotacao}:Props){
    
    useEffect(() => {
        document.body.classList.add('no-scroll')
        document.body.style.overflow = 'hidden'
      
        return () => {
          document.body.classList.remove('no-scroll')
          document.body.style.overflow= ''
        }}, [])
    
     const dispatch = useDispatch();

    const [armazenarAnotacao, setArmazenarAnotacao] = useState('')
      
    const Salvar=()=>{
        dispatch(setAnotacao({id:idFilm, anotacao:armazenarAnotacao}))

        abrirFecharModal()
        console.log(idFilm)
        console.log(armazenarAnotacao)
        salvarAnotacao(idFilm,armazenarAnotacao)
    }

    return(
        <>
            <div className='flex items-center justify-center col-40 fixed inset-0 bg-black/50  z-50 '> 
                <div className='p-[20px] bg-white max-w-[500px] w-full h-[380px] rounded-lg shadow-lg'>
                    <b className='text-[20px]' > Adicionar Anotação para "{titulo}"</b>
                    
                    <textarea  id='caixaTexto' onChange={(e)=> setArmazenarAnotacao(e.target.value)} className='mt-4 mb-4 rounded-lg resize border-1 p-2 
                    w-full h-full max-w-[450px] max-h-[200px] border-[#afafafa3] focus:border-[#afafafa3]
                    ' placeholder="Escreva sua opinão sobre o Filme..."/>
        
                    <div className='flex justify-end w-full gap-5'> 
                        <button onClick={abrirFecharModal}
                            className='flex justify-evenly items-center w-[100px] h-[40px]  p-[10px] rounded-[8px] 
                                border-1 border-[#afafafa3]
                                hover:bg-[#d35f5f] cursor-pointer transition-colors duration-200'>Fechar
                        </button>
                        
                        <button onClick={Salvar} 
                            className='flex justify-evenly items-center p-[10px]  w-[100px] h-[40px] 
                                bg-[#94efffa3] rounded-[8px] hover:bg-[#6fcedda3] 
                                cursor-pointer transition-colors duration-200'> Salvar
                        </button>
                    </div>
        
                </div>
            </div>
        </>
    )}

export default Anotacoes