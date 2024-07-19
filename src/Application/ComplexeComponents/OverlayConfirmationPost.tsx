import { Loader } from '@mantine/core'
import {IoCheckmarkCircle, IoCloseCircleSharp} from 'react-icons/io5'
import { useEffect, useState } from 'react'
import { NavLinkButton } from '../Components/NavLinkButton'
import { useResponseAxios } from '../../Module/HTTP/axiosResponse.hook'
import { axiosResponseServices } from '../../Module/HTTP/axiosResponse.services'

export const OverlayConfirmationPost:React.FC = () => {
    const {responseServer} = useResponseAxios()
    const [stepOne, setStepOne] = useState<boolean>(false)
    const [msg, setMsg] = useState<string>("Création en cours")
    const[err, setErr] = useState<string>("")
    const [finish, setFinish]=useState<boolean>(false)

    useEffect((() => {
        if(responseServer === 201){
            setStepOne(true)
            setFinish(true)
            setMsg("La création du lieu c'est correctement déroulée")
        }else if(responseServer=== 405){
            setErr("des champs requis n'ont pas été renseignés")
        }else if(responseServer=== 500){
            setErr("une erreur c'est produite avec la base de données")
        }
        return()=> {
            axiosResponseServices.updateAxiosResponse(0)
        }
    }),[responseServer])

    return(
        <div>
            <div className='flex gap-3'>
                {
                    stepOne?
                        <IoCheckmarkCircle className=' fill-green-500 size-6' />
                        :err.length!==0? <IoCloseCircleSharp className='fill-red-500 size-6' /> : <Loader color="#D98D30" size="sm" 
                        />
                } 
                <p>Création du lieu </p>
            </div>
            <p>{err.length===0?msg:err}</p>
            <NavLinkButton to='/' disabled={!finish} size="xs">Ok</NavLinkButton>
        </div>
    )
}