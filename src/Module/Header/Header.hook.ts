import { useClickOutside, useDisclosure } from "@mantine/hooks"
import { useState } from "react"

export const useHeader = () => {
    const [openedSubscription, manageSubscription] = useDisclosure(false)
    const [openedConnection, manageConnection] = useDisclosure(false)
    const [hidden, setHidden] = useState(true)

    const ref = useClickOutside(() => setHidden(true))

    function hiddenNavOption(){
        setHidden(false)
    }

    return {openedSubscription, manageSubscription, openedConnection, manageConnection, hidden, ref, hiddenNavOption}
}