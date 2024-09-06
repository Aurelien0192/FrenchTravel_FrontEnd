import { Modal } from "@mantine/core"

type customModalType = {
    children:React.ReactNode
    size?: "md"|"lg"|"xl"
    opened: boolean
    onClose: () => void
    zIndex?: number
}


export const CustomModal:React.FC<customModalType> = (props) => {
    return(
        <Modal
            opened = {props.opened}
            onClose={props.onClose}
            centered
            size={props.size? props.size: "md"}
            zIndex={props.zIndex}
            overlayProps={{
                backgroundOpacity:0.30,
                color:'#D98D30',
                blur:3,
            }}
            >
            {props.children}
        </Modal>
    )
}