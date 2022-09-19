import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from 'react';
import {useState } from "react"
import styles from "./CreateFeed.Module.css"
function CreateFeed(props) {
  const [imageSrc, setImageSrc] = useState('');
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
  return (
    
    <main className="container">
      <h2>이미지 미리보기</h2>
      <Card className={styles.Card}>
      <input id= "imgFile" type="file" style={{display: "none"}} onChange={(e) => {encodeFileToBase64(e.target.files[0])}} />
      <label for="imgFile">Select picture</label>
      <div>
        {imageSrc && <img src={imageSrc} className={styles.previewImg} width="100%" height="50%" art="preview-img" />
        }
      </div>
      <Card.Body>
        <Card.Title>
          <div>
            <input style={{objectFit:"cover"}} type="text" placeholder="여행지를 작성하세요"/>
          </div>
        </Card.Title>
        <Card.Text>
          <div>
            <input type="text" placeholder="내용을 작성하세요"/>
          </div>
        </Card.Text>
        <Button variant="primary">피드박제</Button>
      </Card.Body>
    </Card>
    </main>
  )
}

export default CreateFeed;