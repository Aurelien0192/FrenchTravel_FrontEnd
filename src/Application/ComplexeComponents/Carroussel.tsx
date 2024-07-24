import { useCarroussel } from "../../Module/Carroussel/Carroussel.hook"
import { image } from "../../Module/Image/Image.type"
import { CarrousselController } from "../Components/CarrousselController"

type carrousselProps = {
    imagesTab: Array<image>
}

export const Carroussel:React.FC<carrousselProps> = (props) => {

    const {imagePosition, index, indexUp, indexDown} = useCarroussel()

    return(
        <div className="w-[776px] h-[407px]">
            <div className="relative w-[776px] h-[407px] overflow-clip">
                <div style={{
                    left:`-${imagePosition}px`,
                    transition : "left ease-in-out 0.5s"
                }} 
                className={`absolute flex gap-5 `}
                >
                    {props.imagesTab.map((image) => {
                        return(
                            <div className="w-[716px] h-[402px] rounded-xl">
                                <img className=" rounded-xl object-cover size-full" src={image.path}></img>
                            </div>
                        )
                    })}
                </div>
                <CarrousselController direction="left" disabled={index===0} onClick={indexDown} />
                <CarrousselController direction="right" disabled={index === props.imagesTab.length-1} onClick={()=>indexUp(props.imagesTab.length-1)} />
            </div>
        </div>
    )
}