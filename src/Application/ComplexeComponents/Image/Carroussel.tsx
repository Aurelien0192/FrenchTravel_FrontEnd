import { useCarroussel } from "../../../Module/Carroussel/Carroussel.hook"
import { image } from "../../../Module/Image/Image.type"
import { CarrousselController } from "../../Components/Image/CarrousselController"

type carrousselProps = {
    imagesTab: Array<image>
}

export const Carroussel:React.FC<carrousselProps> = (props) => {

    const {imagePosition, index, indexUp, indexDown} = useCarroussel()

    return(
        <div className=" w-full h-64 md:w-[776px] md:h-[407px]">
            <div className="relative w-full overflow-scroll md:overflow-clip h-64 md:w-[776px] md:h-[407px]">
                <div style={{
                    left:`-${imagePosition}px`,
                    transition : "left ease-in-out 0.5s"
                }} 
                className={`w-fit h-fit overflow-scroll absolute flex md:pl-[30px] gap-5 `}
                >
                    {props.imagesTab.map((image, index) => {
                        return(
                            <div key={index} className=" w-96 h-56 md:w-[716px] md:h-[402px] rounded-xl">
                                <img className=" rounded-xl object-cover size-full" src={image.path}></img>
                            </div>
                        )
                    })}
                </div>
                <div className="hidden md:block">
                    <CarrousselController direction="left" disabled={index===0} onClick={indexDown} />
                </div>
                <div className="hidden md:block">
                    <CarrousselController direction="right" disabled={index === props.imagesTab.length-1} onClick={()=>indexUp(props.imagesTab.length-1)} />
                </div>
            </div>
        </div>
    )
}