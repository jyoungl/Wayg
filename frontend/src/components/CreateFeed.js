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
  const [feedContent, setFeedContent] = useState('');
  const [feedNickname, setFeedNickname] = useState('');
  const [makeFeed, setMakeFeed] = useState({feedTitle:"", feedContent:"", feedNickname:"", userNo: "", feedFile:""});
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [change, setChange] = useState(false);
  const [words, setWords] = useState([]);

  const encodeFileToBase64 = (fileBlob) => {
    console.log('encode')
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
    // console.log(image)
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
    // .then(alert('업로드 완료'))
    .catch(err => console.log(err))
  }
  console.log(url)


  const onChangeTitle = async (event) => {
    console.log(event.target.value)
    await setFeedTitle(event.target.value)
    console.log(feedTitle)
    const searchPlace = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_HOST+`place/search?keyword=${encodeURIComponent(event.target.value)}`
        )
        console.log(response.data.placeList)
        await setWords(response.data.placeList)

      } catch (e) {
        console.log(e)
      }
    }
    searchPlace()
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
           feedFile:url}
        );
        console.log(response)

      } catch (e) {
      }
    }
    await CreateFeed()
  }
  const clickConfirm = () => {
    console.log('a')
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => alert('Click Yes')
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
    })
  }

  return (
    <>
    <main className="container">
      <Card style={{width:"100%", height:"100%"}} className={styles.Card}>
          <input id= "imgFile" type="file" style={{display: "none"}} onChange={async (e) => {await encodeFileToBase64(e.target.files[0]); await setImage(e.target.files[0]); await setChange(true)}} />
          <label className={styles.picture} htmlFor="imgFile">사진을 선택해 주세요</label>
      <div style={{width:"100%", height:"100%"}} className={styles.selectLabel}>
        {imageSrc && <img src={imageSrc}  className={styles.previewImg} width="100%" height="100%" art="preview-img" />
        }
      </div>
      {/* {change ? <div onChange={clickConfirm()}></div>:null} */}
      {change ? <button onClick={uploadImage}>업로드버튼</button> : null}
      
      <Card.Body>
      <form  onSubmit={onSubmit}>

        <Card.Title>
            <input className={styles.Title} onChange={onChangeTitle} value={feedTitle} type="text" placeholder="여행지를 작성하세요" style={{width:"100%", height:"100%"}}/>
            <ul className={styles.autoComplete}>
            {words ? words.map((word, index) => (<li onClick={(word) => {setFeedTitle(); setFeedTitle(word.target.textContent); console.log(word)}} className={styles.autoComplete_li} key={index}>{word}</li>)) : null}
            
            </ul>
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

    </>
  )
}

  const mapStateToProps = state => ({
    counter: state.counterReducer.counter
  });

export default connect(
  mapStateToProps,
)(CreateFeed);

