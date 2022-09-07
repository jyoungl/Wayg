import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from 'react';
function CreateFeed( image, deleteFunc) {

  return (
    <div>
      This is CreateFeed
      <Card style={{ width: '18rem' }}>
        {/* <React.Fragment>
          <button onClick={handleButtonClick}>파일 업로드</button>
          <input type="file" ref={fileInput} onChange={handleChange} style={{display: "none"}}/>
        </React.Fragment> */}
        <img src={image} alt="preview" />
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