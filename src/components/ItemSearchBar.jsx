import { Component } from "react";
import { 
  InputGroup, 
  FormControl, 
  Button, 
} from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

class ItemSearchBar extends Component {
  render() {
    return (
      <InputGroup>
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="success">
          <Search/>
        </Button>
      </InputGroup>    
    );
  }
}

export default ItemSearchBar;