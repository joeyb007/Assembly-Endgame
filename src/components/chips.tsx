import type {JSX} from 'react'
import '../styles/Chips.css'
type Language = {
    name: string
    color: string
    backgroundColor: string
}
export default function Chips(props:Language):JSX.Element{
    const styles = {
        color: props.color,
        backgroundColor: props.backgroundColor
    }
    
    return(
        <span style={styles} className='chip'>{props.name}</span>
    )
}