import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useDropzone} from 'react-dropzone'
import React from 'react';
import {useState, useRef} from "react"
import axios from 'axios';
import { useEffect } from 'react';



// function CreateFeed(props) {
//   const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
//   const files = acceptedFiles.map(file => (
//     <li key={file.path}>
//       {file.path} - {file.size} bytes
//     </li>
//   ));
//   return (
//     <div>
//       This is CreateFeed
//       <Card style={{ width: '18rem' }}>
//       <section className="container">
//       <div {...getRootProps({className: 'dropzone'})}>
//         <input {...getInputProps()} />
//         <p>Drag 'n' drop some files here, or click to select files</p>
//       </div>
//       <aside>
//         <h4>Files</h4>
//         <ul>{files}</ul>
//       </aside>
//     </section>
//       <Card.Body>
//         <Card.Title>
//           <input type="text" placeholder="여행지 이름을 작성하세요"/>
//         </Card.Title>
//         <Card.Text>
//           <input type="text" placeholder="내용을 작성하세요"/>
//         </Card.Text>
//         <Button variant="primary">피드박제</Button>
//       </Card.Body>
//     </Card>
//     </div>
//   )
// }
///////////////////////////////////////////////////////////////////////////////////
// function CreateFeed(props) {
//   const [files, setFiles] = useState('');

//   const onLoadFile = (e) => {
//     const file = e.target.files;
//     console.log(file);
//     setFiles(file);
//   };
//   const handleClick = (e) => {
//     const formdata = new FormData();
//     formdata.append('uploadImage', files[0])

//     const config = {
//       Headers: {
//         'content-type': 'multipart/form-data',
//       }
//     };
//     axios.post(`api`, formdata, config)
//   }
//   useEffect(() => {
//     preview();

//     return () => preview();
//   })

//   const preview = () => {
//     if(!files) return false;
//     const imgEl = document.querySelector('.img_box')
//     const reader = new FileReader();
//     console.log(reader)
//     reader.onLoad = () =>
//       (imgEl.style.backgroundImage = `url(${reader.result})`);
//     reader.readAsDataURL(files[0])
//   }


//   return (
//     <div className="upload_wrap">
//       <div className="img_box"><img src="" alt="" /></div>
//       <div className="custom_img">
//         <strong>업로드된 이미지</strong>
//         <div className="img_wrap">
//           <img src="" alt="" />
//         </div>
//       </div>
//       <form className="upload_input">
//         <input type="file" id="image" accept="img/*" onChange={onLoadFile} />
//         <label htmlFor="image">파일 선택하기</label>
//         <button onClick={handleClick}>저장하기</button>;
//       </form>
//     </div>
//   )
// }
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
      <input type="file" onChange={(e) => {encodeFileToBase64(e.target.files[0])}} />
      <div className="preview">
        {imageSrc && <img src={imageSrc} art="preview-img" />}
      </div>
    </main>
  )
}

export default CreateFeed;