import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useEffect } from 'react';
import {useState, useRef } from "react"
import styles from "./CreateFeed.module.css"
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from "react-redux";

function CreateFeed({counter}) {
  const [imageSrc, setImageSrc] = useState('');
  const [feedTitle, setFeedTitle] = useState('');
  const [feedContent, setFeedContent] = useState('');
  const [feedNickname, setFeedNickname] = useState('');
  const [makeFeed, setMakeFeed] = useState({feedTitle:"", feedContent:"", feedNickname:"", userNo: "", feedFile:""});
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');


  const uploadImage = async () => {
    const data = new FormData()
    console.log(image)
    data.append('file', image)
    data.append('upload_preset','rkh4a8n0')
    data.append('cloud_name', 'dcd6ufnba')
    await fetch("https://api.cloudinary.com/v1_1/dcd6ufnba/image/upload", {
      method:"post",
      body:data
    })
    .then(resp => resp.json())
    .then(data => {
     setUrl(data.url)
    })
    .catch(err => console.log(err))
    console.log(url)
  }

  const onChange = async (e) => {
     await setImage(e.target.files[0])
     console.log(image)
     await uploadImage
  }

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
    event.preventDefault();
    const CreateFeed = async () => {
      try {
        const response = await axios.post(
          process.env.REACT_APP_HOST+`feed/upload`,
          {feedTitle:feedTitle,
           feedContent:feedContent, 
           feedNickname:feedNickname, 
           userNo: counter.userNo,
           feedFile:url
          }
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
          <input id= "imgFile" type="file" style={{display: "none"}} onChange={onChange} />
          {/* <input id="imgFile" tyle="file" style={{display: "none"}} onChange={(e) => {}} /> */}
          <label className={styles.picture} htmlFor="imgFile">사진을 선택해 주세요</label>
          {/* <button onClick={uploadImage}>업로드</button> */}
      <div style={{width:"100%", height:"100%"}}>
        <img width="100%" height="100%" src={url} alt="" />
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

const mapStateToProps = state => ({
  counter: state.counterReducer.counter
});


export default connect(
  mapStateToProps,
)(CreateFeed);
