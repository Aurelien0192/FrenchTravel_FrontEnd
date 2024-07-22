import { AxiosResponseError } from "../HTTP/axiosResponseError.dto"
import { AxiosResponseServices, axiosResponseServices } from "../HTTP/axiosResponse.services"

export class FormularServices{

    /* foction ayant pour rôle de récupérer la réponse du serveur pour méthode post. Si post succès, on reload la page. Sinon on appelle la fonction shwowError en lui
    donnant les noms des champs en erreur (présent dans la réponse server dans la propriété Fields_with_error)
    cette fonction retourne un message d'erreur via une fonction différente par rapport au type de post:
        - pour un lieu : via la fonction responseServerPostPlace de la class AxiosResponseServices
        - pour un utilisateur : via la fonction responseServerPostUser de la class AxiosResponseServices
    */

    static addResponseOfServer= async (responseServer:Promise<AxiosResponseError>,typePost:"user"|"place"|"login"):Promise<string>=>{
    const responseAxios: AxiosResponseError = await responseServer
    axiosResponseServices.updateAxiosResponse(responseAxios)
    if(responseAxios.getStatus()=== 201 || responseAxios.getStatus()=== 200){
            setTimeout(()=>{
                window.location.reload()
            },responseAxios.getStatus() === 201 ?2000 : 0)
        }else{
            responseAxios!.getFieldsWithError()?.forEach((e) =>{
                FormularServices.showError(e)
            })
        }
        let msg: string =""
        switch (typePost){
            case 'user':
                msg= await AxiosResponseServices.responseServerPostUser(responseAxios.getStatus())
                break
            case 'place':
                msg= await AxiosResponseServices.responseServerPostPlace(responseAxios.getStatus())
                break
            case 'login':
                msg = await AxiosResponseServices.responseServerLogin(responseAxios.getStatus())   
        }
        return (msg)
  }


  /* Cette fonction à pour rôle de mettre en évidence les champs dans les formulaires étant en erreur. Cette fonction à en argument le nom de l'input étant en défaut
  fourni par le server*/

    static showError(name:string){
        const input = document.getElementsByName(name)                              //récupération de l'input en erreur via son nom
            if(input[0]){                                                           //si input trouvé
                const inputClasseNameDefault:string = input[0].className            //on sauvegarde sa classname précédente : correspondant au style appliqué via Tailwind
                input[0].className = `${input[0].className} errorInit`              //on y ajoute le style errorInit : bordure rouge sur l'input
                setTimeout(()=> {                                                   //au bout de 500ms
                    input[0].className = `${input[0].className} errorTransition `   //on applique le style errorTransition : permet estompage de la bordure
                },500)
                setTimeout(()=>{                                                    //au bout de 3 secondes
                    input[0].className = inputClasseNameDefault                     //on raffecte à la classe de l'input sa classe initial via la sauvegarde.
                },3000)
            }
        }
}