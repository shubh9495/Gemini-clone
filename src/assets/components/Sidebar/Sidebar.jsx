import './Sidebar.css'
import {assets} from '../../assets'
import { useState } from 'react'
import { Context } from '../../../context/Context'
import { useContext } from 'react'

const Sidebar = () => {
    const [extended,setExtended] = useState(false)
    const {onSent,prevPrompt,setRecentPrompt,newChat} = useContext(Context)

    const loadPrompt = async(prompt) =>{
        setRecentPrompt(prompt)
        await onSent(prompt)
    }
  return (
    <div className='Sidebar'>

        <div className="top">
            <img onClick={()=>setExtended(prev=>!prev)} className="menu" src={assets.menu_icon} alt="" />
            <div onClick={()=>newChat()} className="new_chat">
                <img src={assets.plus_icon} alt="" />
                {extended?<p>New Chat</p>:null}
            </div>
            {extended
            ?
             <div className="recent">
             <p className="recent_title">Recent</p>
                        {prevPrompt.map((item, index) => {
                            return (
                            <div  className="recent_entry" key={index} onClick={() => loadPrompt(item)}>
                                <img src={assets.message_icon} alt="" />
                                <p>{item ? item.slice(0, 18) : null}...</p> {/* Display first 18 characters */}
                            </div>
                            )
                        })}
                    
         </div>
         :null        
        }
           

        </div>
        <div className="bottom">
            <div className="bottom_icon recent_entry">
                <img src={assets.question_icon} alt="" />
                {extended?<p>Help</p>:null}
            </div>            
            <div className="bottom_icon recent_entry">
                <img src={assets.history_icon} alt="" />
                {extended?<p>Activity</p>:null}
            </div>            
            <div className="bottom_icon recent_entry">
                <img src={assets.setting_icon} alt="" />
                {extended?<p>Setting</p>:null}
            </div>

        </div>
    </div>
  )
}

export default Sidebar