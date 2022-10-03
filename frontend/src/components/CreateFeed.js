import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useEffect } from 'react';
import {useState, useRef } from "react"
import styles from "./CreateFeed.module.css"
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import { confirmAlert } from 'react-confirm-alert';

function CreateFeed({counter}) {
  const [imageSrc, setImageSrc] = useState('');
  const [feedTitle, setFeedTitle] = useState('');
  const [feedPlaceName, setFeedPlaceName] = useState('');
  const [feedContent, setFeedContent] = useState('');
  const [feedNickname, setFeedNickname] = useState('');
  const [makeFeed, setMakeFeed] = useState({feedTitle:"", feedContent:"", feedNickname:"", userNo: "", feedFile:""});
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [change, setChange] = useState(false);
  const [words, setWords] = useState(null);

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

  const uploadImage = async () => {
    const data = new FormData()
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
    .then(alert('사진선택완료'))
    .catch(err => console.log(err))
  }


  const onChangePlaceName = async (event) => {
    await setFeedPlaceName(event.target.value)
    const searchPlace = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_HOST+`place/search?keyword=${encodeURIComponent(event.target.value)}`
        )
        await setWords(response.data.placeList)

      } catch (e) {
        console.log(e)
      }
    }
    searchPlace()
  }
  const onChangeContent = (event) => {
    setFeedContent(event.target.value)
  }

  const onChangeNickname = (event) => {
    setFeedNickname(event.target.value)
  }

  const onChangeTitle = (event) => {
    setFeedTitle(event.target.value)
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
           feedPlacename: feedPlaceName,
           userNo: counter.userNo,
           feedFile:url}
        );

      } catch (e) {
      }
    }
    await CreateFeed()
    await window.location.replace("/main")
  }
  return (
    <>
    <main className="container">
      <Card style={{width:"100%", height:"100%"}} className={styles.Card}>
          <input id= "imgFile" type="file" style={{display: "none"}} onChange={async (e) => {await encodeFileToBase64(e.target.files[0]); await setImage(e.target.files[0]); await setChange(true)}} />
          {change ? <label className={styles.labelPlace}>내 피드에 올라갈 사진</label> : <label className={styles.picture} htmlFor="imgFile">사진을 선택해 주세요</label>}
          {/* <label className={styles.picture} htmlFor="imgFile">사진을 선택해 주세요</label> */}
        <div style={{width:"100%", height:"100%"}} className={styles.selectLabel}>
          {imageSrc && <img src={imageSrc} className={styles.previewImg} width="100%" height="100%" art="preview-img" />
          }
        </div>
          {change ? <div style={{marginTop:"2%"}}><label style={{marginTop:"5px",marginLeft:"3%", marginRight:"7%"}} className={styles.is_right_label}>위 사진이 맞으신가요?</label><div><label style={{marginRight:"3%", paddingLeft:"1%", paddingRight:"1%" }} className={styles.picture} onClick={uploadImage}>네 맞아요</label><label style={{paddingLeft:"1%", paddingRight:"1%"}} className={styles.picture} htmlFor="imgFile">아뇨 다시 고를래요</label></div></div> : null
            }
        {/* // {change ? <button onClick={uploadImage}>확인</button> : null} */}
      
      <Card.Body>
      <form  onSubmit={onSubmit}>

        <Card.Title>
            <input className={styles.Title} onChange={onChangeTitle} value={feedTitle} type="text" placeholder="제목을 작성하세요" style={{width:"100%", height:"100%"}}/>
            
            <input className={styles.Title} onChange={onChangePlaceName} value={feedPlaceName} type="text" placeholder="여행지를 작성하세요" style={{width:"100%", height:"100%"}}/>
            {/* <ul className={styles.autoComplete}>
            {words ? words.map((word, index) => (<div onClick={async (word) => {await setFeedTitle(word.target.innerText); console.log(word); console.log(feedTitle) }} className={styles.autoComplete_li} key={index}>{word}</div>)) : null}
            </ul> */}

            { words ? <ul className={styles.autoComplete}>
             {words.map((word, index) => (<div onClick={async (word) => {await setFeedPlaceName(word.target.innerText); }} className={styles.autoComplete_li} key={index}>{word}</div>))}
            </ul>:null}



        </Card.Title>
        <Card.Text className={styles.text}>
            {/* <input className={styles.Content} onChange={onChangeContent} type="text" placeholder="내용을 작성하세요" style={{width:"100%", height:"100%"}}/> */}
            <textarea className={styles.Content} onChange={onChangeContent} type="text" placeholder="내용을 작성하세요" style={{width:"100%", height:"100%"}} cols="30" rows="10"></textarea>
            <br/>
            <input className={styles.Nickname} onChange={onChangeNickname} type="text" placeholder="기제할 닉네임을 작성하세요" style={{width:"100%", height:"100%"}} maxLength="8"/>
        </Card.Text>
          <button className={styles.feed_btn}>피드박제</button>

      </form>
      </Card.Body>
    </Card>
    </main>

    </>
  )
}

  const mapStateToProps = state => ({
    counter: state.counterReducer.counter
  });

export default connect(
  mapStateToProps,
)(CreateFeed);

