import { Component } from "react";
import { Row, Col, Alert, Fade } from "react-bootstrap";
import { EmojiSmile, EmojiFrown } from "react-bootstrap-icons"

class AppAlert extends Component {
  
  render() {
    const { isError, show } = this.props;
    return (
      <>
        <Row>
          <Col>
            <Fade in={show}>
              <Alert
                variant={isError ? "danger" : "success"}
                show={show}
              >{this.computeAlertHeading()}</Alert>  
            </Fade>
          </Col>
        </Row>
      </>
    );
  }

  computeAlertHeading() {
    const { isError, msg } = this.props;
    return (
      <Alert.Heading as="p">
        {isError ? 
          (<>
            <EmojiFrown />
            {" "}<span>Oops, Something went wrong, Try again</span>
          </>) : (<>
            <EmojiSmile />
            {" "}<span>Gotcha,You have your search result</span>  
          </>)
        }
        { msg && (<><hr></hr><p>{msg}</p></>) }
      </Alert.Heading>);
  }
}

export default AppAlert;