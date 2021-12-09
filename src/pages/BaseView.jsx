import { Component } from "react";
import { 
	Container, 
	Navbar,
	Row,
	Col
} from "react-bootstrap";
import { Images } from "react-bootstrap-icons";
import ItemSearchBar from "../components/ItemSearchBar";
import AppAlert from "../components/AppAlert";
import GridView from "../components/GridView";

class BaseView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isErrorAlert: true,
			appAlertTxt: "Error message",
			appAlertShow: false,
			dataset: [],
			query: "",
			didExecutedQuery: false
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
									width: "autho",
								}}>
								<Container>
									<Navbar.Brand href="#">
										<Images/>
										<span>{" "}Imgur Search Engine</span>
									</Navbar.Brand>
									<Navbar.Toggle aria-controls="navbarScroll" />
									<Navbar.Collapse id="navbarScroll">
										<ItemSearchBar 
											showAppAlert={this.showAppAlert} 
											setQueryData={this.setQueryData}
											setQuery={this.setQueryString}/>
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
		return (<>
			<Container>
					{this.state.didExecutedQuery && (
						<GridView 
							inputData={this.state.dataset}
							query={this.state.queryString}
						/>
					)}
				</Container>
		</>);
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
		this.setState({
			queryString: value,
			didExecutedQuery: true
		});
	}
}

export default BaseView;