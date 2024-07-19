import { Checkbox } from "@mantine/core"
import { Input } from "../Components/Input"
import { Button } from "../Components/Button"
import { useState } from "react"

export const SubscriptionFormular:React.FC = () => {

    const [isProfessional, setIsProfessionnel] = useState<boolean>(false)

    return(
        <form className="flex flex-col gap-5 items-center">
            <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                    <Input name="firstName" placeholder="John" flexDirection="flex-col" label={`Prénom${isProfessional ? "*":""}`}></Input>
                    <Input name="lastName" placeholder="Doe" flexDirection="flex-col" label={`Nom${isProfessional? "*":""}`}></Input>
                </div>
                <Input name="email" placeholder="john.doe@mail.fr" flexDirection="flex-col" label="Adresse E-mail*"></Input>
                <Input name="email" placeholder="john.doe@mail.fr" flexDirection="flex-col" label="Adresse E-mail*"></Input>
                <Input name="password" placeholder="********" type="password" flexDirection="flex-col" label="Mot de passe*"></Input>
                <Input name="password" placeholder="********" type="password" flexDirection="flex-col" label="Mot de passe*"></Input>
                <Checkbox checked={isProfessional} onChange={(e)=> setIsProfessionnel(e.currentTarget.checked)}label="Compte Professionnel" color="#D98D30" variant="outline" size="md"/>
            </div>
            <p className="w-full">*Champs Obligatoires</p>
            <Button size="md">S'inscrire</Button>
            <p className="w-5/6 text-center"> En Poursuivant, vous acceptez nos Conditions d'utilisation et vous confirmez que vous avez lu notre Politique de confidentialité et d'utilisation des cookies.</p>
        </form>
    )
}