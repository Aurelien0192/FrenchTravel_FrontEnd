import { Checkbox } from "@mantine/core"
import { HotelCategorieOrNoteShow } from "../Places/HotelCategorieOrNotationShow"

type commentFilter = {
    onChange: Function
}
export const CommentFilter:React.FC<commentFilter> = (props) =>{
    const fitlerNumbers = [5,4,3,2,1]

    return(
        <div className="flex flex-col gap-1">
            <h3 className="font-bold text-[20px]">Filtre :</h3>
            {fitlerNumbers.map((filterNumber, index) =>{
                return(
                    <div key={index} className="flex gap-2">
                        <Checkbox onChange={(e)=>{props.onChange(filterNumber,e.currentTarget.checked)}} name={`fiter${filterNumber}`} color="#D98D30" variant="outline" size="md" />
                        <HotelCategorieOrNoteShow categorie={filterNumber} type="circle" />
                    </div>
                )
            })}
        </div>
    )
}