import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useEffect } from 'react';
import {useState } from "react"
import styles from "./CreateFeed.module.css"
import axios from "axios";

function CreateFeed(props) {
  const [imageSrc, setImageSrc] = useState('');
  const [makeFeedBtn, setMakeFeedBtn] = useState(false);
  const [feedTitle, setFeedTitle] = useState('');
  const [feedContent, setFeedContent] = useState('');
  const [feedNickname, setFeedNickname] = useState('');
  const [makeFeed, setMakeFeed] = useState({feedTitle:"", feedContent:"", feedNickname:"", userNo: ""});
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result)
        resolve()
      }
    })
  };
  // const onChangeImg = (event) => {
  //   setImageSrc(event.target.value)
  // }

  const onChangeTitle = (event) => {
    console.log(event.target.value)
    setFeedTitle(event.target.value)
  }
  const onChangeContent = (event) => {
    console.log(event.target.value)
    setFeedContent(event.target.value)
  }

  const onChangeNickname = (event) => {
    console.log(event.target.value)
    setFeedNickname(event.target.value)
  }

  const onSubmit = async (event) => {
    // event.preventDefault();
    console.log('아무거나')

    const CreateFeed = async () => {
      try {
        const response = await axios.post(
          process.env.REACT_APP_HOST+`feed/upload`,
          {feedTitle:feedTitle,
           feedContent:feedContent, 
           feedNickname:feedNickname, 
           userNo: '1'}
        );

      } catch (e) {
      }
    }
    await CreateFeed()
  }


    // if (makeFeedBtn === true) {

    //   const CreateFeed = async () => {
    //     try {
    //       const response = await axios.post(
    //         `http://localhost:8080/api/feed`,
    //         makeFeed
    //       );
    //       console.log(response)
    //       setMakeFeedBtn(false)
    //     } catch (e) {
    //     }
    //   }
    //   CreateFeed()
    // }


  




  
  return (
    
    <main className="container">
      <Card style={{width:"100%", height:"100%"}} className={styles.Card}>
      <input id= "imgFile" type="file" style={{display: "none"}} onChange={(e) => {encodeFileToBase64(e.target.files[0]);}} />
      
      <label className={styles.picture} htmlFor="imgFile">사진선택을 위해 눌러주세요!</label>
      <div style={{width:"100%", height:"100%"}} className={styles.selectLabel}>
        {imageSrc && <img src={imageSrc} className={styles.previewImg} width="100%" height="100%" art="preview-img" />
        }
      </div>
      <Card.Body>
      <form onSubmit={onSubmit}>
        <Card.Title>
            <input className={styles.Title} onChange={onChangeTitle} type="text" placeholder="여행지를 작성하세요"/>
        </Card.Title>
        <Card.Text>
            <input className={styles.Content} onChange={onChangeContent} type="text" placeholder="내용을 작성하세요"/>
            <br/>
            <input className={styles.Nickname} onChange={onChangeNickname} type="text" placeholder="기제할 닉네임을 작성하세요" />
        </Card.Text>
          <button variant="primary">피드박제</button>

      </form>
      </Card.Body>
    </Card>
    </main>
  )
}

export default CreateFeed;