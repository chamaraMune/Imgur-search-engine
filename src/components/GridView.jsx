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
    const containerStyle = {
      display: 'flex',  
      justifyContent:'center', 
      alignItems:'center',
    };
    return (
      <>
        <Container style={containerStyle} as="div">
          <Row xs={5}>
            <Col xs={5}>
              <Image src={'/notFound.jpg'}/>
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