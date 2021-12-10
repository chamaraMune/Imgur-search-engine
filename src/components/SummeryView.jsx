import { Component } from "react";
import { Container, Row, Col, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { 
  ClipboardData, 
  BagDashFill, 
  StarFill,
  Sunglasses,
  FileWordFill,
} from "react-bootstrap-icons"
import { isEmpty, isNumber } from "lodash";

class SummeryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: 0,
      points: 0,
      score: 0,
      topics: 0,
    };
  }

  componentDidMount = () => {
    const { inputData } = this.props;
    if (Array.isArray(inputData)) {
      const items = (!isEmpty(inputData) && inputData.length) || 0;
      let score = 0, points = 0, topics = 0;
      const scoreArr = [], pointArr = [], topicsArr = [];

      for (const curObj of inputData) {
          pointArr.push(curObj["points"]);
          scoreArr.push(curObj["score"]);
          topicsArr.push(curObj["topic_id"]);
      }
      score = this.getEvenSumFromArray(scoreArr);
      points = this.getEvenSumFromArray(pointArr);
      topics = this.getEvenSumFromArray(topicsArr);
      this.setState({ items, score, points, topics });
    }

  };

  getEvenSumFromArray = (inputArr = []) => {
    if (!Array.isArray(inputArr)) {
      return 0; 
    }
    const isOddNumber = (num) => Math.abs(num % 2) === 1;
    const validOperands = inputArr.filter(element => isNumber(element));
    let oddNumCount = 0;
    oddNumCount = validOperands.reduce((prevValue, curElement) => {
      if (isOddNumber(curElement)) {
        prevValue++;
      }
      return prevValue;
    }, 0);
    if (isOddNumber(oddNumCount)) {
      let skips = 0;
      const sum = validOperands.reduce((total, curValue) => {
        if (skips !== 1 && isOddNumber(curValue)) {
          skips++;
        } else {
          total += curValue;
        }
        return total;
      }, 0);
      return sum;
    }
    const sum = validOperands.reduce((total, curValue) => {
      return total += curValue;
    }, 0);
    return sum;
  };

  isOddNumber = (input) => {
    if (!isNumber(input)) {
      return false;
    }
    return ;
  };

  render = () => {
    const { items, points, score, topics, } = this.state;
    return (
      <Container 
        fluid="xs" 
        style={{ marginTop: "1rem"}}
      >
        <Row>
          <Col>
            <Card>
              <Card.Title 
                style={{ padding: "10px", fontWeight: "bold"}}
              >
                <ClipboardData />
                <span>{` Summery result`}</span>
                <hr />
              </Card.Title>
              <Card.Body style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                <ListGroup horizontal="true">
                  <ListGroupItem  variant="light">
                    <Row>
                      <Col>
                        <BagDashFill style={{ margin: "5px"}}/>
                        <span>Items</span>
                      </Col>
                      <Col>{items}</Col>
                    </Row>
                  </ListGroupItem>

                  <ListGroupItem  variant="light">
                    <Row>
                      <Col>
                        <StarFill style={{ margin: "5px"}}/>
                        <span>Points</span>
                      </Col>
                      <Col>{points}</Col>
                    </Row>
                  </ListGroupItem>

                  <ListGroupItem  variant="light">
                    <Row>
                      <Col>
                        <Sunglasses style={{ margin: "5px"}}/>
                        <span>Score</span>
                      </Col>
                      <Col>{score}</Col>
                    </Row>
                  </ListGroupItem>

                  <ListGroupItem  variant="light">
                    <Row>
                      <Col>
                        <FileWordFill style={{ margin: "5px"}}/>
                        <span>Topics</span>
                      </Col>
                      <Col>{topics}</Col>
                    </Row>
                  </ListGroupItem>

                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };
}

export default SummeryView;