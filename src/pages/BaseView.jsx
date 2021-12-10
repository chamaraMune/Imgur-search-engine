import { Component } from "react";
import { 
	Container, 
	Navbar,
	Row,
	Col
} from "react-bootstrap";
import { Camera } from "react-bootstrap-icons";
import ItemSearchBar from "../components/ItemSearchBar";
import AppAlert from "../components/AppAlert";
import GridView from "../components/GridView";
import SummeryView from "../components/SummeryView";

class BaseView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isErrorAlert: true,
			appAlertTxt: "Error message",
			appAlertShow: false,
			dataset: [],
			query: "",
			isSeaching: false,
			isCheckedResult: false
		};
	}

	render() {
		return (
			<>
				{this.topNavBarComponent()}
				{this.appAlertBar()}
				{this.pageContentContainer()}
			</>
		);
	}

	topNavBarComponent = () => {
		const { isCheckedResult } =this.state;
		return (
			<>
				<Container>
					<Row>
						<Col>
							<Navbar 
								bg="primary" 
								variant="dark" 
								expand="md" 
								style={{
									zIndex:1000,
									position: "relative",
									width: "auto",
								}}>
								<Container>
									<Navbar.Brand href="#">
										<Camera style={{ fontSize: "1.5em" }}/>
										<span>{" "}Imgur Search Engine</span>
									</Navbar.Brand>
									<Navbar.Toggle aria-controls="navbarScroll"/>
									<Navbar.Collapse id="navbarScroll">
										<ItemSearchBar 
											showAppAlert={this.showAppAlert} 
											setQueryData={this.setQueryData}
											setQuery={this.setQueryString}
											isCheckedResult={isCheckedResult}
											onChangeRadioInput={this.onChangeRadioInput}
											setIsSearching={this.setIsSearching}
										/>
									</Navbar.Collapse>
								</Container>
							</Navbar>
						</Col>
					</Row>
				</Container>
			</>
		);
	};

	appAlertBar = () => {
		return (
			<>
				<Container>
					<Row>
						<AppAlert 
							isError={this.state.isErrorAlert}
							msg={this.state.appAlertTxt}
							show={this.state.appAlertShow}
						/>
					</Row>
				</Container>
			</>
		);
	};

	pageContentContainer = () => {
		const { 
			isSeaching,  
			isCheckedResult: shouldViewSummery,
			dataset,
			query 
		} = this.state;

		const contentPrpos = { inputData: dataset, query};
		return (
			<Container>
				{
					!isSeaching 
					&& (
						!shouldViewSummery
						? <GridView {...contentPrpos} />
						: <SummeryView inputData={dataset} />
					)
				}
			</Container>
		);
	};

	showAppAlert = (error, msg = "")  => {
		this.setState({ 
			appAlertShow: true,
			appAlertTxt: msg,
			isErrorAlert: error
		}, () => {
			window.setTimeout(() => {
				this.setState({ appAlertShow: false});
			}, 5000);
		});
	}

	setQueryData = (dataset = []) => {
		this.setState({ dataset });
	};

	setQueryString = (value = "") => {
		this.setState({ query: value, });
	};

	isActiveSummeryData = () => {
		return this.state.isCheckedResult;
	};
	
	onChangeRadioInput = (e) => {
		const { isCheckedResult: value } = this.state;
		this.setState({ isCheckedResult: !value });
	}

	setIsSearching = (value = false) => {
		this.setState({ isSeaching : value })
	}
}

export default BaseView;