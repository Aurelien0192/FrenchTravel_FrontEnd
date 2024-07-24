type TypePlaceLabelProps = {
    labelName:string
}

export const TypePlaceLabel: React.FC<TypePlaceLabelProps> = (props) => {
    const labelToDisplay = props.labelName.charAt(0).toUpperCase() + props.labelName.slice(1)

    return(
        <div className=" flex w-fit items-center h-[22px] rounded-xl px-[5px] border-2 border-orange">
            <p className=" text-orange font-bold ">{labelToDisplay}</p>
        </div>
    )
}