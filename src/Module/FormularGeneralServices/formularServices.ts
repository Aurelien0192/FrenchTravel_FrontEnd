import { AxiosResponseError } from "../HTTP/axiosResponseError.dto"
import { AxiosResponseServices, axiosResponseServices } from "../HTTP/axiosResponse.services"

export class FormularServices{

    static addResponseOfServer= async (responseServer:Promise<AxiosResponseError>,typePost:"user"|"place"):Promise<string>=>{
    const responseAxios = await responseServer
    axiosResponseServices.updateAxiosResponse(responseAxios)
    if(responseAxios.getStatus()=== 201){
            setTimeout(()=>{
                window.location.reload()
            },2000)
        }else{
            responseAxios!.getFieldsWithError()?.forEach((e) =>{
                FormularServices.showError(e)
            })
        }
        const msg = typePost === "user"?await AxiosResponseServices.responseServerPostUser(responseAxios.getStatus()) : await AxiosResponseServices.responseServerPostPlace(responseAxios.getStatus())
        return (msg)
  }

    static showError(name:string){
        const input = document.getElementsByName(name)
            if(input[0]){
                const inputClasseNameDefault:string = input[0].className
                input[0].className = `${input[0].className} errorInit`
                setTimeout(()=> {
                    input[0].className = `${input[0].className} errorTransition `
                },500)
                setTimeout(()=>{
                    input[0].className = inputClasseNameDefault
                    console.log(input[0].className)
                },3000)
            }
        }
}