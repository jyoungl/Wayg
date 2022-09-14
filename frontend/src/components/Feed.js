import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Feed() {
  return (
    // for map 사용
    <div className='d-flex'>
      <Card style={{ width: '200px', height: '200px' }}>
        <Card.Img  className='w-100 h-100' variant="top" src="https://adventure.lotteworld.com/image/2022/9/202209051000073780.jpg" />
        <Card.Body>
          <Card.Title>피드제목</Card.Title>
          <Card.Text>
            피드 내용
          </Card.Text>
          <Button variant="primary">공유하기</Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Feed;
