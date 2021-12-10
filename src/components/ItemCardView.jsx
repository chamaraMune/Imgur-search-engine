import { Component, createRef } from "react";
import { 
  Card, 
  Row, 
  Col, 
  Badge,
  Overlay,
} from "react-bootstrap";
import { 
  HandThumbsUpFill, 
  HandThumbsDownFill, 
  EyeFill,
  StarFill,
  Images,
  PlayBtn
} from "react-bootstrap-icons";
import isImage from "is-image";
import { isEmpty, isUndefined } from "lodash";

class ItemCardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: "",
      showImgCount: false,
      isVideoType: false,
      imageCount: 0,
    };
    this.imgCountRef = createRef(null);
  }

  componentDidMount = () => {
    const imageURL = this.getCardImage();
    this.setState({ imageURL });
    
    const { cardData } = this.props;
    const images = cardData.images || [];
    if (images.length > 0) {
      this.setState({ imageCount: images.length });
    }
  }

  render = () => {
    const cardImgRef = this.imgCountRef;
    const { cardData } = this.props;
    const { 
      title: cardTitle, 
      ups: upVotes, 
      downs: downVotes, 
      views,
      tags,
    } = cardData;
    const { imageCount, isVideoType } = this.state; 

    const cardImgStyles = {
      objectFit: 'contain',
      borderRadius: 10,
      width: 'auto',
      height: '20rem',
      background: `linear-gradient(90deg, #f4f5f9, #d9f8ffa1)`
    };

    return (
      <>
        <Card 
          style={{ 
            width: '18rem', 
            height: "35rem", 
            marginBlock: "10px",
          }}
          border="primary"
        >
          <Card.Img 
            variant="right" 
            src={this.state.imageURL}  
            style={{...cardImgStyles}}
            ref={cardImgRef}
          />
          {(imageCount > 1 || isVideoType) && (<Overlay 
            show={true} 
            target={cardImgRef.current} 
            placement="top-end"
          >
            {({ placement, arrowProps, show: _show, popper, ...props }) => (
              this.itemOverlayElement(props)
            )}</Overlay>)}

          <Card.Body style={{ width: "auto", height: "12rem"}}>
            <Card.Title as="b">{cardTitle}</Card.Title>
            <Card.Text style={{ overflow: "hidden"}}>
              <small className="text-muted">
                {`${this.getUploadedDateTime()}`}
              </small>
              <br />
                <>{this.itemPointsComponent()}</>
              <br/>
              { tags && tags.map((element, idx) => {
                return (<><Badge bg="primary">{element.name}</Badge>{" "}</>)})
              }
            </Card.Text>
          </Card.Body>
          <Card.Footer 
            style={{
              background: `linear-gradient(90deg, #f4f5f9, #d9f8ffa1)`
            }}>
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
    const { 
      images, 
      link: outerLink, 
      type: outerType 
    } = cardData;

    if (outerLink && isImage(outerLink)) {
      return outerLink;
    }

    if (isEmpty(images) && outerType && outerType.includes("video")) {
      this.setState({ isVideoType: true });
      return "/videoPreview.png";
    }

    if (!Array.isArray(images) || !images.length) {
      return "/cardImageNotFound.png";
    }

    // process array level links and their types
    const imageData = images.find(element => {
      return element.link && isImage(element.link);
    });

    if (!isUndefined(imageData) && imageData.link) {
      return imageData.link;
    }

    const hasVideoType = images.some(element => {
      const { type } = element;
      return !isUndefined(type) && type.includes("video");
    });
    this.setState({ isVideoType: true });
    return (hasVideoType && "/videoPreview.png") 
      || "/cardImageNotFound.png";
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
        <i>{(points || 0)}</i>{" "}
        <i style={{fontFamily: "sans-serif",fontSize: "x-small"}}>
          <small>{Math.abs(points) === 1.0 ? "point" : "points"}</small>
        </i>
      </span>
      </>
    );
    return elements;
  }

  itemOverlayElement = (props) => {
    const { imageCount } = this.state;
    return (
      <div
        {...props}
        style={{
          backgroundColor: '#0d6efd',
          padding: '2px 10px',
          color: 'white',
          marginBottom: "-1.74rem",
          borderTopRightRadius: 5,
          ...props.style,
        }}>
          { imageCount > 1 
            ? (<><Images/>{` 1 of ${imageCount}`}</>) 
            : <PlayBtn/> 
          }
      </div>
    );
  };
}

export default ItemCardView;