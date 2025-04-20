import { useEffect, useState } from "react"
import { setAnotacao } from "../../../../provider/store"
import { useDispatch } from 'react-redux';
import { Props } from "../../../../interfaces/PropsAnotacoes";



function Anotacoes({titulo, abrirFecharModal,idFilm,salvarAnotacao,descricao}:Props){
    
    useEffect(() => {
        document.body.classList.add('no-scroll')
        document.body.style.overflow = 'hidden'
      
        return () => {
          document.body.classList.remove('no-scroll')
          document.body.style.overflow= ''
        }
      }, [])
    
     const dispatch = useDispatch();

      const [armazenarAnotacao, setArmazenarAnotacao] = useState('')
      
      const Salvar = ()=>{
            dispatch(setAnotacao({id:idFilm, anotacao:armazenarAnotacao}))

            abrirFecharModal()
            console.log(idFilm)
            console.log(armazenarAnotacao)
            salvarAnotacao(idFilm,armazenarAnotacao)
      }

      

    return(
        <>
            <div className='col-40 fixed inset-0 bg-black/50 flex items-center justify-center z-50 '> 
                <div className='p-[20px] bg-white max-w-[500px] w-full h-[380px] rounded-lg shadow-lg'>

                    <b className='text-[20px]' > Adicionar Anotação para "{titulo}"</b>
                    <textarea  id='caixaTexto' onChange={(e)=> setArmazenarAnotacao(e.target.value)} className='mt-4 mb-4 rounded-lg resize border-1 p-2 
                    w-full h-full max-w-[450px] max-h-[200px] border-[#afafafa3] focus:border-[#afafafa3]
                    ' placeholder="Escreva sua opinão sobre o Filme..."/>
        
                    <div className='flex justify-end w-full gap-5'> 
                    
                    <button onClick={abrirFecharModal}
                        className=' w-[100px] h-[40px] rounded-[8px] 
                        flex justify-evenly items-center p-[10px] border-1 border-[#afafafa3]
                        hover:bg-[#d35f5f] cursor-pointer transition-colors duration-200'>Fechar</button>
                    
                    <button onClick={Salvar} 
                        className='bg-[#94efffa3] w-[100px] h-[40px] rounded-[8px]
                        flex justify-evenly items-center p-[10px]
                        hover:bg-[#6fcedda3] cursor-pointer transition-colors duration-200'>Salvar</button>
                    </div>
        
                </div>
            </div>
        </>
    )
}

export default Anotacoes