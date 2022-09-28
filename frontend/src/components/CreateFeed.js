import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useEffect } from 'react';
import {useState, useRef } from "react"
import styles from "./CreateFeed.module.css"
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';

function CreateFeed(props) {
  const [imageSrc, setImageSrc] = useState('');
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
  console.log(imageSrc)
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
    const CreateFeed = async () => {
      try {
        const response = await axios.post(
          process.env.REACT_APP_HOST+`feed/upload`,
          {feedTitle:feedTitle,
           feedContent:feedContent, 
           feedNickname:feedNickname, 
           userNo: '1'}
        );
        console.log(response)

      } catch (e) {
      }
    }
    await CreateFeed()
  }
  return (
    
    <main className="container">
      <Card style={{width:"100%", height:"100%"}} className={styles.Card}>
          <input id= "imgFile" type="file" style={{display: "none"}} onChange={(e) => {encodeFileToBase64(e.target.files[0]);}} />
          <label className={styles.picture} htmlFor="imgFile">사진을 선택해 주세요</label>
      <div style={{width:"100%", height:"100%"}} className={styles.selectLabel}>
        {imageSrc && <img src={imageSrc} className={styles.previewImg} width="100%" height="100%" art="preview-img" />
        }
      </div>
      <Card.Body>
      <form  onSubmit={onSubmit}>
        <Card.Title>
            <input className={styles.Title} onChange={onChangeTitle} type="text" placeholder="여행지를 작성하세요" style={{width:"100%", height:"100%"}}/>
        </Card.Title>
        <Card.Text className={styles.text}>
            {/* <input className={styles.Content} onChange={onChangeContent} type="text" placeholder="내용을 작성하세요" style={{width:"100%", height:"100%"}}/> */}
            <textarea className={styles.Content} onChange={onChangeContent} type="text" placeholder="내용을 작성하세요" style={{width:"100%", height:"100%"}} cols="30" rows="10"></textarea>
            <br/>
            <input className={styles.Nickname} onChange={onChangeNickname} type="text" placeholder="기제할 닉네임을 작성하세요" style={{width:"100%", height:"100%"}} maxLength="10"/>
        </Card.Text>
          <button className={styles.feed_btn}>피드박제</button>

      </form>
      </Card.Body>
    </Card>
    </main>
  )
}

export default CreateFeed;
