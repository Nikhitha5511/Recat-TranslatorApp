
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Body from './components/Body';

function App() {
const [languages , setLanguages] = useState([]);
const [toSet , setFrom] = useState("");
const [choose , setChoosed] = useState("");
const [res , setRes] = useState("");
const [input , setInput] = useState("")
const [isLoded , setIsLoded] = useState(false);


const fetchData = async() => {
const encodedParams = new URLSearchParams();
encodedParams.set('source_language', toSet);
encodedParams.set('target_language', choose);
encodedParams.set('text', input);

const options = {
  method: 'GET',
  url: 'https://text-translator2.p.rapidapi.com/getLanguages',
  headers: {
    'X-RapidAPI-Key': 'aabe0d6b48msh0a56740a2326652p14beafjsn582d5568ba9c',
    'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
  }
};

    try {
      const response = await axios.request(options);
      if(response)
      setLanguages(response.data.data.languages);
    } catch (error) {
      console.error(error);
    }
}


const postData = async() => {

  if(toSet  === "" || input === "" || choose === ""){
    alert("please select the options || or write text");
    return;
  }else{

  const url = 'https://text-translator2.p.rapidapi.com/translate';
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'aabe0d6b48msh0a56740a2326652p14beafjsn582d5568ba9c',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
      },
      body: new URLSearchParams({
        source_language: toSet,
        target_language: choose,
        text: input
      })
    };

    try {
      setIsLoded(true);
      const response = await fetch(url, options);
      const result = await response.json();
      setRes(result.data.translatedText);
      setIsLoded(false);
    } catch (error) {
      console.error(error);
    }
  }
}


  useEffect(() => {
    fetchData() 
       // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
    <div className="maindiv">
    <div className="heading"> 
    <h1>Universal languages Text Translator</h1>
    </div>
      <div>
        <Body languages={languages} setFrom={setFrom} setChoosed={setChoosed}/>
      </div>
      <div className="container">
        <textarea name="" id="" cols="50" rows="6" className='placeholder1' onChange={(e) => setInput(e.target.value)}  value={input} placeholder='Enter Text here....'></textarea>
        <textarea name="" id="" cols="50" rows="6" className='placeholder' value={isLoded ? "Loading..." : res} placeholder='Translated Text....'></textarea>
      </div>

      <button className='button' onClick={postData}>Translate</button>
    </div>
  );
}

export default App;