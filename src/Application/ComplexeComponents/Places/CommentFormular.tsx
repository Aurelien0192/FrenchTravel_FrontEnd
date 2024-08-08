import { HotelCategorieOrNotationSelector } from "./HotelCategorieOrNotationSelector"
import { TextArea } from "../../Components/General/TextArea"
import { Button, Checkbox } from "@mantine/core"
import { useState } from "react"
import { comment } from "../../../Module/Comment/comment.type"
import { FormularServices } from "../../../Module/FormularGeneralServices/formularServices"
import { CommentService } from "../../../Module/Comment/comment.service"
import { Place } from "../../../Module/Place/Place.class"
import { useSelector } from "../../../Module/HotelCategorieOrNotationSelector/HotelCategorieSelectorOrNotation.hook"
import { DatePickerCalendar } from "../../Components/General/DatePickerCalendar"

type CommentFormularProps = {
    dataOnePlace: Place
}

export const CommentFormular:React.FC<CommentFormularProps> = (props) =>{

    const [msg, setMsg] = useState<string>("")
    const [submitDisabled, setSubmitDisabled] = useState<boolean>(true)
    const {selectedNoteOrHotelCategorie} = useSelector()

    const changeMsgComment = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const formData = new FormData(form)
        const comment:comment = JSON.parse(JSON.stringify(Object.fromEntries(formData.entries())))

      const newMsgComment = await FormularServices.addResponseOfServer(CommentService.postNewComment(comment, props.dataOnePlace!.getId(), props.dataOnePlace!.getCategorie(), selectedNoteOrHotelCategorie), "comment")
      setMsg(newMsgComment)
    }

    function changeDisabled(checkboxAccept:  React.ChangeEvent<HTMLInputElement>){
        console.log(checkboxAccept.currentTarget.checked)
        setSubmitDisabled(!checkboxAccept.currentTarget.checked)

    }

    return(
        <form onSubmit={(e) => changeMsgComment(e)} className="w-full flex flex-col gap-8 items-end">
            <div className="w-full flex flex-col gap-3">
                <h2 className="text-2xl font-bold">Comment qualifiez-vous votre expérience?</h2>
                <HotelCategorieOrNotationSelector type="circle" labelHidden={true} />
            </div>
            <div className="relative w-full flex flex-col gap-3">
                <h2 className="text-2xl font-bold">Quand y êtes-vous allé?</h2>
                <DatePickerCalendar />
            </div>
            <div className="flex flex-col gap-3 w-full">
                <h2 className="text-2xl font-bold">Ajouter un commentaire</h2>
                <TextArea flexDirection="flex-col" size="md" placeholder="J'ai adoré ce lieu. Tout était parfait. Je recommande fortement..." name="comment"/>
            </div>
            <div className="flex gap-4">
                <Checkbox onChange={(e)=>{changeDisabled(e)}} name="accept" color="#D98D30" variant="outline" size="md"/>
                <p>Je certifie que cet avis reflète ma propre expérience et mon opinion authentique. Je certifie également que je n’ai aucun lien professionnel ou personnel avec cet organisme et que je n’ai reçu aucune compensation financière ou autre de sa part pour rédiger cet avis. </p>
            </div>
            <p className="text-red-500">{msg}</p>
            <Button disabled={submitDisabled} type="submit">Envoyer l'avis</Button>
        </form>
    )
}