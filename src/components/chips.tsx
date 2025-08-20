import type {JSX} from 'react'
import '../styles/Chips.css'

type Language = {
    name: string
    color: string
    backgroundColor: string
    classes: string
}

export default function Chips(props:Language):JSX.Element{
    const styles = {
        color: props.color,
        backgroundColor: props.backgroundColor
    }
    
    return(
        <span style={styles} className={props.classes}>{props.name}</span>
    )
}