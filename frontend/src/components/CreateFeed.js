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
    .then(alert('사진선택완료'))
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
           feedPlacename: feedTitle,
           userNo: counter.userNo,
           feedFile:url}
        );
        console.log(response)

      } catch (e) {
      }
    }
    await CreateFeed()
    await window.location.replace("/main")
  }
  // //////////////////////////////////////
//   const useConfirm = (message = null, onConfirm, onCancel) => {
//     if (!onConfirm || typeof onConfirm !== "function") {
//       return;
//     }
//     if (onCancel && typeof onCancel !== "function") {
//       return;
//     }
  
//     const confirmAction = () => {
//       if (window.confirm(message)) {
//         onConfirm();
//       } else {
//         onCancel();
//       }
//     };
  
//     return confirmAction;
//   };

//   const deleteConfirm = () => uploadImage();
//   const cancelConfirm = () => {console.log("취소했습니다."); setImage('')};
//   const confirmDelete = useConfirm(
//   "사진을 선택하시겠습니까?",
//   deleteConfirm,
//   cancelConfirm
// );
//   const clickConfirm = async() => {
//     console.log('a')
//     await confirmDelete()

//   }

  return (
    <>
    <main className="container">
      <Card style={{width:"100%", height:"100%"}} className={styles.Card}>
          <input id= "imgFile" type="file" style={{display: "none"}} onChange={async (e) => {await encodeFileToBase64(e.target.files[0]); await setImage(e.target.files[0]); await setChange(true)}} />
          <label className={styles.picture} htmlFor="imgFile">사진을 선택해 주세요</label>
        <div style={{width:"100%", height:"100%"}} className={styles.selectLabel}>
          {imageSrc && <img src={imageSrc} className={styles.previewImg} width="100%" height="100%" art="preview-img" />
          }
        </div>
          {change ? <div><label>이 사진이 맞으신가요?</label><button onClick={uploadImage}>네 맞아요</button> <label className={styles.picture} htmlFor="imgFile">아뇨 다시 고를게요</label></div> : null
            }
        {/* // {change ? <button onClick={uploadImage}>확인</button> : null} */}
      
      <Card.Body>
      <form  onSubmit={onSubmit}>

        <Card.Title>
            <input className={styles.Title} onChange={onChangeTitle} value={feedTitle} type="text" placeholder="여행지를 작성하세요" style={{width:"100%", height:"100%"}}/>
            <ul className={styles.autoComplete}>
            {/* {words ? words.map((word, index) => (<li onClick={(word) => {setFeedTitle(); setFeedTitle(word.target.textContent); }} className={styles.autoComplete_li} key={index}>{word}</li>)) : null} */}
            {words ? words.map((word, index) => (<li onClick={async (word) => {await setFeedTitle(word.target.innerText); console.log(word); console.log(feedTitle) }} className={styles.autoComplete_li} key={index}>{word}</li>)) : null}
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

