import { Input } from "./Input"
import calendarLogo from '../../../../public/Logo/calendar.svg'
import { useState } from "react"
import { useClickOutside } from "@mantine/hooks"
import { DatePicker } from "@mantine/dates"

export const DatePickerCalendar:React.FC = () => {

    const [hidden, setHidden] = useState<boolean>(true)
    const [dateVisit, setDateVisite] = useState<Date | null>(null)
    const ref = useClickOutside(() => setHidden(true))
    
    return(
        <div>
            <Input 
                icon={calendarLogo} 
                onClickIcon={()=>{setHidden(false)}}
                flexDirection="flex-col"
                type="date" 
                name="dateVisited" 
                value={dateVisit && dateVisit?.toLocaleDateString().split('/').reverse().join('-')} 
                placeholder=""
                positionIcon="end"
                />
            <div ref={ref} className={`${hidden && "hidden"} absolute top-16 bg-white rounded-xl shadow`}>
                <DatePicker value={dateVisit} onChange={setDateVisite} />
            </div>
        </div>
    )
}