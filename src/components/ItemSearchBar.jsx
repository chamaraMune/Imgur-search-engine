import { Component } from "react";
import { 
  InputGroup, 
  FormControl, 
  Button,
  Spinner,
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
    console.log("#### this.props >>> xxx ", this.props);
    const { isCheckedResult, onChangeRadioInput } = this.props;
    const { isSearching } = this.state;
    return (
      <>
        <InputGroup>
          <InputGroup.Checkbox 
            checked={isCheckedResult}
            onChange={onChangeRadioInput}
          />
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            disabled={this.state.isSearching}
            value={this.state.query}
            onChange={this.handleChange}
            onKeyDown={(e) => {
              const { key } = e;
              if (key && key === "Enter") {
                return this.onSubmitSearchBtn(e);
              }
            }}
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
          </Button><br/>
        </InputGroup>
      </>
    );
  }

  handleChange(e) {
    this.setState({ query: e.target.value });
  }

  async onSubmitSearchBtn() {
    const { showAppAlert, setQueryData, setQuery } = this.props;
    const { query } = this.state;
    if (isEmpty(query)) {
      return;
    }

    this.setState({ isSearching: true });
    try {
      const response = await imgurClient.getRecentWeeklyImages(query);
      const { error, data } = response;
      if (error) {
        throw new Error("error occurred");
      }
      const newDataset = (error && []) || data;
      setQueryData(newDataset);
      setQuery(query);
      this.setState({ isSearching: false});
      if (!isEmpty(newDataset)) {
        showAppAlert(false);
      }
    } catch (error) {
      const msg = "Error occurred while searching gallery";
      showAppAlert(true, msg);
    }
  }
}

export default ItemSearchBar;