import { useState } from "react"

export const useImage = () => {

    const[hidden, setHidden] = useState<boolean>(false)

    const handleHoverImgEnter = () => {
        setHidden(true)
    }

  const handleHoverImgExit= () => {
        setHidden(false)
    }

    return {hidden, handleHoverImgEnter, handleHoverImgExit}
}