import { FaEye,FaRegStar } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { LuNotebook } from "react-icons/lu";


interface Props{
    pId: string
    pTitle: string
    pImage: string
    pDescription: string
    pDirector: string
    pProducer: string
    pRelease_date: string
    pRunning_time: string
    pRt_score: string
    pFavorito:boolean
    pAssistido:boolean
    pAnotação:string
    ativarAssitidos:any
    ativarFavorito:any
}


function Lista({pId,pTitle,pImage,pDescription,pDirector,pProducer,pRelease_date,pRunning_time,
    pRt_score,pFavorito,pAssistido,pAnotação,ativarAssitidos,ativarFavorito}:Props){

return(
    <>
        <div className=' rounded-xl shadow-[0px_1px_8px_0px_#696969b0] ' key={pId}>
            
            <div>

                
                
                    <div className='flex justify-evenly absolute w-[300px] mt-[15px] gap-15 text-amber-50'>
                    
                   {
                        pAssistido !== false?
                        <div className='bg-[#21a015] w-[100px] h-[20px] rounded-[8px]
                            flex justify-evenly items-center p-[10px]
                            text-[13px]
                        '
                        onClick={ativarAssitidos}
                        ><FaEye />Assitido</div>
                        :
                        <> <div  className=' w-[100px] h-[20px] rounded-[8px]'></div></>
                   } 
                    {
                    pFavorito !== false?
                    
                            <div  className='bg-red-400 w-[100px] h-[20px] rounded-[8px]
                                flex justify-evenly items-center p-[10px]
                                text-[13px]
                            '> <MdFavoriteBorder /> Favorito</div>
                        
                        :
                        <>
                            <div  className=' w-[100px] h-[20px] rounded-[8px]'></div>
                        </>
                                }
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
                    {/* <button onClick={()=>{handleMarcadoAssitido(i)}} className='bg-amber-300'><FaEye />Assitido</button> */}
                   
                    <button className='bg-black w-[50%] h-[40px] rounded-[8px]
                        flex justify-evenly items-center p-[10px]
                        hover:bg-[#000000ab] cursor-pointer transition-colors duration-200
                    '
                    onClick={ativarAssitidos}
                    ><FaEye />Assitido</button>
                    
                    <button  className='bg-red-400 w-[50%] h-[40px] rounded-[8px] 
                        flex justify-evenly items-center p-[10px]
                        hover:bg-[#d35f5f] cursor-pointer transition-colors duration-200
                    ' onClick={ativarFavorito}> <MdFavoriteBorder /> Favorito</button>
                </div>
                
                <button className='flex justify-center items-center w-full h-[40px]
                border border-[#afafafa3] rounded-[8px] 
                hover:bg-[#94efffa3] cursor-pointer transition-colors duration-200
                '> <LuNotebook /> <b>Add Anotação</b></button>
            </div>
            
        
                                    
        </div>
    </>
)

}

export default Lista