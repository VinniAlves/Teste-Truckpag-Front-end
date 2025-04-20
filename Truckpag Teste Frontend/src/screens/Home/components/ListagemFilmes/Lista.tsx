import { FaEye,FaRegStar } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { LuNotebook } from "react-icons/lu";
import Anotacoes from "../Anotacoes";
import { useState } from "react";
import { Props } from "../../../../interfaces/PropsLista";


function Lista({pId,pTitle,pImage,pDescription,pDirector,pProducer,pRelease_date,pRunning_time,
    pRt_score,pFavorito,pAssistido,ativarAssitidos,ativarFavorito,SalvarNote,pAnotacao,checkNote}:Props){


        const [modal,setModal] = useState(false)
        
        function AbrireFecharModal(){
            if(modal){
               
                setModal(false)
            }else{
                setModal(true)
            }
            
        }

        const [deletar,setDeletar] = useState(false)

       


return(
    <>
        <div className=' rounded-xl shadow-[0px_1px_8px_0px_#696969b0] ' key={pId}>
            
            <div>
                    <div className='flex justify-evenly absolute w-[300px] mt-[15px] gap-15 text-amber-50'>
                    
                   {pAssistido !== false?
                        <div className='bg-[#21a015] w-[100px] h-[20px] rounded-[8px]
                            flex justify-evenly items-center p-[10px]
                            text-[13px]
                        'onClick={ativarAssitidos}><FaEye />Assitido</div>
                        : <div className=' w-[100px] h-[20px] rounded-[8px]'></div>} 
                
                    <div className='flex flex-col gap-2'>
                    {pFavorito !== false?
                        
                                <div  className='bg-red-400 w-[100px] h-[20px] rounded-[8px]
                                    flex justify-evenly items-center p-[10px]
                                    text-[13px]'> <MdFavoriteBorder /> Favorito</div>
                            : <div  className=' w-[100px] h-[20px] rounded-[8px]'></div> }


                    {checkNote !== false?
                        
                        <div  className='bg-[#94efffdc] w-[100px] h-[20px] rounded-[8px]
                            flex justify-evenly items-center p-[10px]
                            text-[13px]'> <LuNotebook /> Nota</div>
                    : <div  className=' w-[100px] h-[20px] rounded-[8px]'></div> }
                    </div>
                </div>

                <img className='w-[300px] h-[400px] rounded-t-xl' src={pImage}>
                    
                </img>
            </div>
            
            <div className="flex flex-col p-[15px] gap-[5px] rounded-b-xl "> 

                <b className='text-lg'>{pTitle}</b>
                
                <div className='text-gray-500 text-sm'>
                    <b >{`${pRelease_date} • `}</b>
                    
                    <b > {pRunning_time}</b>
                </div>
                
                <div className='flex gap-[4px] items-center'>
                    <FaRegStar className="text-amber-300"/> 
                    <p>{`${pRt_score}%`}</p>
                </div>
                
                <p className='max-w-[250px] line-clamp-4 text-base'>{pDescription}</p>
                
                <p className='text-gray-500 text-sm' >{`Director: ${pDirector}`}</p>
                
                <p className='text-gray-500 text-sm max-w-[200px]  line-clamp-1' 
                >{`Producer: ${pProducer}`}</p>

                <div className='flex gap-[10px] text-amber-50'>
                  
                   
                {pAssistido !==true?
                    <button className='bg-black w-[50%] h-[40px] rounded-[8px]
                    flex justify-evenly items-center p-[10px]
                    hover:bg-[#000000ab] cursor-pointer transition-colors duration-200'onClick={ativarAssitidos}>
                        <FaEye />Não Assitido</button>
                    :
                    <button className='bg-black w-[50%] h-[40px] rounded-[8px]
                    flex justify-evenly items-center p-[10px]
                    hover:bg-[#000000ab] cursor-pointer transition-colors duration-200'onClick={ativarAssitidos}>
                        <FaEye />Assistido</button>
                    }

                {pFavorito!==true?
                    <button  className='bg-red-400 w-[50%] h-[40px] rounded-[8px] 
                    flex justify-evenly items-center p-[10px]
                    hover:bg-[#d35f5f] cursor-pointer transition-colors duration-200
                ' onClick={ativarFavorito}> <MdFavoriteBorder /> Favorito</button>
                :
                    <button  className='bg-red-400 w-[50%] h-[40px] rounded-[8px] 
                    flex justify-evenly items-center p-[10px]
                    hover:bg-[#d35f5f] cursor-pointer transition-colors duration-200
                ' onClick={ativarFavorito}> <MdFavoriteBorder /> Favoritado</button>

                }
                    
                    
                    
                 
                </div>
                
                                {
                                    checkNote?
                                        <div>
                                            <div className='flex flex-col bg-[#94efffa3] p-[5px] rounded-[8px]'>
                                                <div className='flex items-center gap-2 text-[#001aff]'>
                                                <LuNotebook /> <b >Sua Anotação:</b>
                                                </div>
                                                <p className=' text-[15px] max-w-[300px]'>{pAnotacao} </p>
                                            </div>  

                                            <button onClick={AbrireFecharModal} className='mt-4 flex justify-center items-center w-full h-[40px]
                                                border border-[#afafafa3] rounded-[8px] 
                                                hover:bg-[#fdff94a3] cursor-pointer transition-colors duration-200
                                                '> <LuNotebook /> <b>Edt. Anotação</b></button>


                                        </div>

                                                                                    

                                    :<>
                                        <button onClick={AbrireFecharModal} className='flex justify-center items-center w-full h-[40px]
                                            border border-[#afafafa3] rounded-[8px] 
                                            hover:bg-[#94efffa3] cursor-pointer transition-colors duration-200
                                            '> <LuNotebook /> <b>Add Anotação</b></button>
                                    </>
                                }


               

            
                </div>
                       
        </div>
        {
                            
                            modal ?
                            <Anotacoes titulo={pTitle} idFilm={pId}
                abrirFecharModal={AbrireFecharModal} salvarAnotacao={SalvarNote} descricao={pAnotacao} ></Anotacoes>
                            :
                            <></>
            }

    </>
)

}

export default Lista