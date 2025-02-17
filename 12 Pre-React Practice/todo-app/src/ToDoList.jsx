import React from "react"

export default function ToDoList(props) {
    // const [isDone, setIsDone] = React.useState(false)

    // function checkDone() {
    //     setIsDone(!isDone)
    // }
    // return (
    //     <li 
    //         onClick={checkDone}
    //         style={{textDecoration: isDone ? 'line-through' : 'none'}}
    //     >
    //         {props.listTitle}
    //     </li>
    // )

    return (
        <li onClick={() => props.onChecked(props.id)}>
            {props.listTitle}
        </li>
    )
}