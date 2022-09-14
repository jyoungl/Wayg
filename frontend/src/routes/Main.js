import {useEffect, useState} from 'react'
import ChatBot from "../components/ChatBot";
import Feeds from "../components/Feeds";
import Recommendations from "../components/Recommendations";
import CreateFeed from "../components/CreateFeed";

function Main() {
  const [addFeed, setAddFeed] = useState(false)
  const parentFunction = () => {
    setAddFeed((current)=> !current)
  }

  return (
    <div className="d-flex" style={{width: "100vw", height: "100vh"}}>
      <ChatBot addFeed={addFeed} parentFunction={parentFunction}/>
      {addFeed ?  <CreateFeed></CreateFeed>:<div className="d-flex-row justify-content-center">
        <br />
        <div style={{width: '900px', height: '300px'}}>
          <Feeds/>
        </div>
        <br />
        <Recommendations/>
      </div>}
    </div>
  );
}

export default Main;
