import { useState, useEffect } from "react"

export const useCarroussel = () => {
    const [imagePosition, setImagePosition] = useState<number>(0)
    const [index, setIndex] = useState<number>(0)

    useEffect(()=> {
        setImagePosition(736*index)
        console.log(index)
    },[index])

    function indexUp(max:number):void{
        if (index < max)
            return setIndex(index + 1)
    }

    function indexDown():void{
        if ( index > 0)
            return setIndex(index - 1)
    }

    return {imagePosition, index, indexUp, indexDown}
}