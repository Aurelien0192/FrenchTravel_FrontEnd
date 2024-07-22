import { Checkbox } from "@mantine/core"
import { Input } from "../Components/Input"
import { Button } from "../Components/Button"

export const ConnectionFormular: React.FC = () => {
    return(
        <form className="flex flex-col gap-5 items-center">
            <h1 className="text-2xl font-bold w-full text-center">Heureux de vous revoir !</h1>
            <div className=" flex flex-col gap-5 w-full">
                <Input label="Adresse E-mail" placeholder="henry.dupont@mail.com" name="username" flexDirection="flex-col" />
                <Input label="Mot de passe" type="password" placeholder="*********" name="password" flexDirection="flex-col" />
            </div>
            <p className="text-brown underline underline-offset-2">mot de passe oublié?</p>
            <Checkbox name="save" label="se souvenir de moi" color="#D98D30" variant="outline" size="md"/>
            <Button size="md">Se connecter</Button>
            <p className="text-center">Vous n'avez pas de compte? inscrivez-vous pour pouvoir accéder au meilleur de French TRAVEL</p>
        </form>
    )
}