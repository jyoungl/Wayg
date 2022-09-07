// import {useEffect, useState} from 'react'
import ChatBot from "../components/ChatBot";
import Feeds from "../components/Feeds";
import Recommendations from "../components/Recommendations";
import CreateFeed from "../components/CreateFeed";

function Main() {
  // const [AddFeed, setAddFeed] = useState(false)
  // const 

  return (
    <div className="d-flex" style={{width: "100vw", height: "100vh"}}>
      <ChatBot/>
      <div className="d-flex-row justify-content-center">
        <br />
        <Feeds/>
        <Recommendations/>
      </div>
      
      <div>
        <CreateFeed></CreateFeed>
      </div>
    </div>
  );
}

export default Main;