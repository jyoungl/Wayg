import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useDropzone} from 'react-dropzone'
import React from 'react';



function CreateFeed(props) {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  return (
    <div>
      This is CreateFeed
      <Card style={{ width: '18rem' }}>
      <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
      <Card.Body>
        <Card.Title>
          <input type="text" placeholder="여행지 이름을 작성하세요"/>
        </Card.Title>
        <Card.Text>
          <input type="text" placeholder="내용을 작성하세요"/>
        </Card.Text>
        <Button variant="primary">피드박제</Button>
      </Card.Body>
    </Card>
    </div>
  )
}

export default CreateFeed