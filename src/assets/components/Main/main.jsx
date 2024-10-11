import { useContext } from 'react'
import { assets } from '../../assets'
import './main.css'
import { Context } from '../../../context/Context'

const Main = () => {

    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input} = useContext(Context)
  return (
    <div className='main'>
        
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt="" />
        </div>

        <div className="main_container">

            {!showResult
            ?
            <>
            <div className="greet">
                <p><span>hellow, Dev...</span></p>
                <p>How can i help you today</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Brainstorm a tagline for my online store</p>
                    <img src={assets.compass_icon} alt="" />
                </div>                
                <div className="card">
                    <p>Quiz me on famous sites around the world</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>                
                <div className="card">
                    <p>Help me understand American football</p>
                    <img src={assets.message_icon} alt="" />
                </div>                
                <div className="card">
                    <p>Show me how to build something by hand</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>

            </>
            :
            <div className='result'>
                <div className="resultTitle">
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPrompt}</p>
                </div>
                <div className="result_data">
                    <img src={assets.gemini_icon} alt="" />
                    {loading
                    ?
                    <div className='loader'>
                        <hr />
                        <hr />
                        <hr />

                    </div>
                    :
                    <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                
                }
                </div>

            </div>
            }



            

            <div className="main_bottom">
                <div className="search_box">
                    <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here...' />
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        {input?<img onClick={()=> onSent()} src={assets.send_icon} alt="" />:null}
                    </div>
                </div>
                <p className='bottom_info'>
                Humans review some saved chats to improve Google AI. To stop this for future chats, turn off Gemini Apps activity. How it works                </p>
            </div>
        </div>
    </div>
  )
}

export default Main