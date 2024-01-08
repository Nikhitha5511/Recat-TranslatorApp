import React from 'react'

const Body = ({languages , setChoosed , setFrom}) => {
    
    return (
        <div className="selecContainer">
        <select className='optionContainer' onChange={(e) => setFrom(e.target.value)}>
           <option value="" selected>Preferred Language...</option>
           {languages.map((language , index) => <option key={index} value={language.code}>{language.name}</option>)}
        </select>

        <select className='optionContainer2' onChange={(e) => setChoosed(e.target.value)}>
        <option value="" selected>Traget Language</option>
           {languages.map((language , index) => <option key={index} value={language.code}>{language.name}</option>)}
        </select>
     </div>
    )
}

export default Body;