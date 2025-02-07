import React from "react";

const hour = new Date().getHours()
const time = hour <= 4 ? 'Dawn' 
    : hour <= 10 ? 'Morning' 
    : hour <= 15 ? 'Afternoon' 
    : hour <= 20 ? 'Evening'
    : 'Night'

const timeColor = hour <= 4 ? 'cyan' 
    : hour <= 10 ? 'red' 
    : hour <= 15 ? 'green' 
    : hour <= 20 ? 'purple'
    : 'blue'

const fontColor = {
    color: timeColor
}

export default function Heading() {
    return (
        <h1 style={fontColor}>Good {time}</h1>
    )
}