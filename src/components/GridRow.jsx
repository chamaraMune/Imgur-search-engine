import { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { isUndefined } from "lodash";
import ItemCardView from "./ItemCardView";

class GridRow extends Component {
  constructor(props) {
      super(props);
      this.state = {
        items: []
      };
  }

  render = () => {
    const { rowId } = this.props;
    return (
      <>
        <Row key={rowId}>
          {this.getListItems()}
        </Row>
      </>
    );
  };

  getListItems = () => {
    const { data, rowId, moment, timeformat } = this.props;
    const listItems = [];
    for (let i = 0; i < data.length; i++) {
      const columnId = `${rowId}-col-${i}`;
      const dataObj = data[i];
      const { id: elementId } = dataObj;
      const cardViewProps = {
        key: elementId,
        cardData: dataObj,
        moment,
        timeformat
      };
      listItems.push((
        <>
          <Col key={columnId}>
            {!isUndefined(dataObj) && 
              (<ItemCardView {...cardViewProps} />)}
          </Col>
        </>
      ));
    }
    return listItems;
  };
}

export default GridRow;