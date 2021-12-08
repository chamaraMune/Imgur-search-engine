import { Component } from "react";
import { 
  InputGroup, 
  FormControl, 
  Button,
  Spinner 
} from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { isEmpty  } from "lodash";
import imgurClient from "../adapters/ImgurAdapter";

class ItemSearchBar extends Component {
  constructor(props) {
    super(props);
    this.onSubmitSearchBtn = this.onSubmitSearchBtn.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      isSearching: false,
      query: "",
    };
  }

  render() {
    const { isSearching } = this.state;
    return (
      <InputGroup>
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          disabled={this.state.isSearching}
          value={this.state.query}
          onChange={this.handleChange}
        />
        <Button 
          variant="primary" 
          disabled={isSearching}
          onClick={this.onSubmitSearchBtn}
          >
            {(isSearching ? 
              (<Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />) : (<Search/>))}
        </Button>
      </InputGroup>    
    );
  }

  handleChange(e) {
    this.setState({ query: e.target.value });
  }

  async onSubmitSearchBtn() {
    const { showAppAlert } = this.props;
    const { query } = this.state;
    if (isEmpty(query)) {
      return;
    }

    this.setState({ isSearching: true });
    try {
      const response = await imgurClient.getRecentWeeklyImages(query);
      console.log("### response >>> ", response);
      this.setState({ isSearching: false});
      showAppAlert(false);
    } catch (error) {
      console.log("### error >>>> ", error);
      const msg = "Error occurred while searching gallery";
      showAppAlert(true, msg);
    }
  }
}

export default ItemSearchBar;