import { Component } from "react";
import { Row, Col, Container, Image, ListGroup } from "react-bootstrap";
import { isEmpty } from "lodash"
import { sliceInputDataIntoChunks } from "../helpers/DataProcessHelper";
import GridRow from "./GridRow";
import moment from "moment";

class GridView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dataset: [],
        itemsPerRow: 4,
        dateTimeFormat: "DD/MM/YYYY h:mm a",
        viewport: {
          width: document.documentElement.clientWidth,
          height: document.documentElement.clientHeight,
        },
    };
  }
  
  shouldComponentUpdate = (nextProps) => {
    const { query: prevQuery } = this.props;
    const { query: nextQuery } = nextProps;
    return nextQuery && nextQuery !== prevQuery;
  }

  render = () => {
    const { inputData } = this.props;
    if (isEmpty(inputData)) {
      return this.noResultComponent();
    }
    return this.renderGridItems();
  };

  noResultComponent = () => {
    const { viewport } = this.state;
    const containerStyle = {
      display: 'flex',  
      justifyContent:'center', 
      alignItems:'center',
    };
    const imgStyle = {
      width: viewport.width >= 768 ? "800px" : "400px",
      height: "auto",
    };
    return (
      <>
        <Container style={containerStyle} as="div">
          <Row xs={1}>
            <Col xs={1}>
              <Image 
                style={imgStyle} 
                src={'/searchresult.png'}/>
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  renderGridItems = () => {
    const { inputData } = this.props;
    const { itemsPerRow, dateTimeFormat } = this.state;
    const chunkedData = sliceInputDataIntoChunks(inputData, itemsPerRow);
    return (
      <>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <ListGroup>
              {chunkedData.map((data, idx) => {
                const itemKey = `list-row-no-${idx}`
                return (
                  <ListGroup.Item key={itemKey}>
                    <GridRow 
                      data={data} 
                      columns={itemsPerRow} 
                      rowId={itemKey} 
                      moment={moment}
                      timeformat={dateTimeFormat} />
                  </ListGroup.Item>)
              })}
            </ListGroup>
          </Col>  
        </Row>
      </>
    );
  };
}

export default GridView;