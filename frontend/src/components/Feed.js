import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Feed() {
  return (
    // for map 사용
    <div className='d-flex'>
      <Card style={{ width: '20px', height: '20px' }}>
        <Card.Img  className='w-80 h-80' variant="top" src="https://adventure.lotteworld.com/image/2022/9/202209051000073780.jpg" />
        <Card.Body>
          <Card.Title>롯데월드</Card.Title>
          <Card.Text>
            aaa
          </Card.Text>
          <Button variant="primary">공유하기</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Feed;