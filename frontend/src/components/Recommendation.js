import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Recommendation() {
  return (
    <div className='d-flex'>
      <Card style={{ width: '12rem', height: '24rem' }}>
        <Card.Img  className='w-80 h-80' variant="top" src="https://lh5.googleusercontent.com/p/AF1QipMiqovtbGuYagdRZbcP-4bKaCIpUimHjLXI5q5F=w143-h143-n-k-no" />
        <Card.Body>
          <Card.Title>제주곶자왈도립공원</Card.Title>
          <Card.Text>
          제주도만의 특별한 생태계인 곶자왈을 잘 보존해 관리하고 있는 도립공원으로 산림욕과 산책을 제대로 할 수 있는 곳입니다.
          </Card.Text>
          <Button variant="primary">공유하기</Button>
        </Card.Body>
      </Card>

      <Card style={{ width: '12rem', height: '24rem' }}>
        <Card.Img  className='w-80 h-80' variant="top" src="https://lh5.googleusercontent.com/p/AF1QipMiqovtbGuYagdRZbcP-4bKaCIpUimHjLXI5q5F=w143-h143-n-k-no" />
        <Card.Body>
          <Card.Title>제주곶자왈도립공원</Card.Title>
          <Card.Text>
          제주도만의 특별한 생태계인 곶자왈을 잘 보존해 관리하고 있는 도립공원으로 산림욕과 산책을 제대로 할 수 있는 곳입니다.
          </Card.Text>
          <Button variant="primary">공유하기</Button>
        </Card.Body>
      </Card>

      <Card style={{ width: '12rem', height: '24rem'}}>
        <Card.Img  className='w-80 h-80' variant="top" src="https://lh5.googleusercontent.com/p/AF1QipMiqovtbGuYagdRZbcP-4bKaCIpUimHjLXI5q5F=w143-h143-n-k-no" />
        <Card.Body>
          <Card.Title>제주곶자왈도립공원</Card.Title>
          <Card.Text>
          제주도만의 특별한 생태계인 곶자왈을 잘 보존해 관리하고 있는 도립공원으로 산림욕과 산책을 제대로 할 수 있는 곳입니다.
          </Card.Text>
          <Button variant="primary">공유하기</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Recommendation;

