import React from 'react'

const Footer = () => {
    const footerSyle = {
        color: 'green',
        fontSyle: 'italic',
        fontSize: 16
    }
    return (
        <div style={footerSyle}>
            <br />
            <em>Note app, Selfmade from tutorial</em>
        </div>
    )
}

export default Footer