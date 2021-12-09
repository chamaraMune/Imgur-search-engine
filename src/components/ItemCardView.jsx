import { Component } from "react";
import { 
  Card, 
  Row, 
  Col, 
  Badge, 
  Tooltip, 
  OverlayTrigger
} from "react-bootstrap";
import { 
  HandThumbsUpFill, 
  HandThumbsDownFill, 
  EyeFill,
  StarFill 
} from "react-bootstrap-icons";

class ItemCardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: this.getCardImage()
    };
  }

  render = () => {
    const { cardData } = this.props;
    const { 
      title: cardTitle, 
      ups: upVotes, 
      downs: downVotes, 
      views,
      tags,
      id: dataId,
    } = cardData;
    const cardImgStyles = {
      objectFit: 'contain',
      borderRadius: 10,
      width: 'auto',
      height: '20rem',
    };
    return (
      <>
        <Card style={{ width: '18rem', height: "35rem", marginBlock: "10px"}}>
            <Card.Img 
              variant="top" 
              src={this.state.imageURL}  
              style={{...cardImgStyles}}
            />
          <Card.Body style={{ width: "auto", height: "12rem"}}>
            <Card.Title as="b">{cardTitle}</Card.Title>
            <Card.Text style={{ overflow: "hidden"}}>
              <small className="text-muted">
                {`${this.getUploadedDateTime()}`}
              </small>
              <br></br>
              <OverlayTrigger
                key={`${dataId}-overlay-trigger`}
                placement="bottom"
                overlay={
                  <Tooltip id={`tooltip-${dataId}`}>
                    <b>Points</b>
                  </Tooltip>
                }
              >
                <>{this.itemPointsComponent()}</>
              </OverlayTrigger>
              
              <hr></hr>
              { tags && tags.map((element, idx) => {
                return (<><Badge bg="primary">{element.name}</Badge>{" "}</>)})
              }
            </Card.Text>
          </Card.Body>
          <Card.Footer variant="primary">
            <Row>
              <Col><HandThumbsUpFill/>{` ${upVotes}`}</Col>
              <Col><HandThumbsDownFill/>{` ${downVotes}`}</Col>
              <Col><EyeFill/>{` ${views}`}</Col>
            </Row>
          </Card.Footer>
        </Card>
      </>
    );
  };

  getCardImage = () => {
    const { cardData } = this.props;
    const { images } = cardData;
    if (!Array.isArray(images) || !images.length) {
      return "/cardImageNotFound.png";
    }
    const [renderImage] = images;
    const { link } = renderImage;
    return link;
  };

  getUploadedDateTime = () => {
    const { cardData, moment, timeformat } = this.props;
    const { datetime } = cardData;
    return (datetime 
      && moment.unix(datetime).format(timeformat))
      || null;
  }

  itemPointsComponent = (numOfStars = 5) => {
    const { cardData } = this.props;
    const { points } = cardData;
    const starFillStyles = { color: "#ffcc00" };
    const elements = [];
    for (let i = 1; i <= numOfStars; i++) {
      elements.push(<><StarFill style={starFillStyles}/>{" "}</>)
    }
    elements.push(
      <>
      <span style={{ color: "#00294f"}}>
        <b>{(points || 0)}</b>
      </span>
      </>
    );
    return elements;
  }
}

export default ItemCardView;