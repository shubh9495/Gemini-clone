import { createContext, useState } from "react";
import runChat from '../config/Gemini'; // Ensure correct import of the `runChat` function
import PropTypes from 'prop-types';  // Import PropTypes for validation

export const Context = createContext();


const ContextProvider = (props) => {
    
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const newChat = ()=>{
        setLoading(false);
        setShowResult(false);
    }
    
    const delayPara = (index,nextWord)=>{
        setTimeout(function(){
            setResultData(prev=>prev+nextWord);
        },7.5*index)
    }

    const onSent = async (prompt) => {
        
            setResultData("");
            setLoading(true);
            setShowResult(true);
            let response;
            if(prompt !== undefined)
            {
                response =  await runChat(prompt); // Fixed the spelling of `response`
                setRecentPrompt(prompt);
            }
            else{
                setPrevPrompt(prev=>[...prev,input])
                setRecentPrompt(input);
                response = await runChat(input);
            }
            let responseArray = response.split("**");
            let newResponse="";
            for(let i=0;i<responseArray.length;i++)
            {
                if(i === 0 || i%2 !==1)
                {
                    newResponse += responseArray[i];
                }
                else{
                    newResponse += "<b>"+responseArray[i]+"</b>";
                }
            }
            let newResponse2 = newResponse.split("*").join("</br>")
            let newResponseArray = newResponse2.split(" ");
            for(let i=0;i<newResponseArray.length;i++)
            {
                const nextWord = newResponseArray[i];
                delayPara(i,nextWord+" ");
            }
            setResultData(newResponse2);
            setLoading(false);
            setInput("");

            // Save the current prompt in the previous prompts array
            setPrevPrompt(prev => [...prev, prompt]);
    };

    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
}

ContextProvider.propTypes = {
    children: PropTypes.node.isRequired, 
};

export default ContextProvider;
