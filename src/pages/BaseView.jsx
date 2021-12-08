import { Component } from "react";
import { 
	Container, 
	Navbar,
	Row,
	Col, 
} from "react-bootstrap";
import { Images } from "react-bootstrap-icons";
import ItemSearchBar from "../components/ItemSearchBar";

class BaseView extends Component {
	render() {
		return (
			<>
				{/* Navigation bar container */}
				<Navbar bg="primary" variant="dark" expand="lg">
					<Container>
						<Navbar.Brand href="#">
							<Images/>
							<span>{" "}Imgur Search Engine</span>
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="navbarScroll" />
						<Navbar.Collapse id="navbarScroll">
							<ItemSearchBar />
						</Navbar.Collapse>
					</Container>
				</Navbar>
				{/* search result container */}
				<Container>
					<Row>
						<Col><h1>Hello world</h1></Col>
					</Row>
				</Container>
			</>
			
		);
	}
}

export default BaseView;