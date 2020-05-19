import {Container, Row, Col} from 'reactstrap'
import React, {Component} from 'react';

export default class SlideShow extends React.Component {
	constructor(props) {
		super();

		this.imageStates = {};
		this.imageStateIndex = 0;
		this.imagesLength = props.flikrImages.length;

		props.flikrImages.map((flikrImage, index) => {
			this.imageStates[index] = {
				index		: index,
				id			: flikrImage.id,
				mediumURL	: flikrImage.mediumurl,
				title		: flikrImage.title
			};
		})
		this.state = this.imageStates[this.imageStateIndex];

		this.LeftImage = this.LeftImage.bind(this);
		this.RightImage = this.RightImage.bind(this);
	}

	LeftImage() {
		this.imageStateIndex = this.imageStateIndex > 0 ? this.imageStateIndex - 1 : this.imagesLength - 1;
		this.setState(this.imageStates[this.imageStateIndex]);
	}

	RightImage() {
		this.imageStateIndex = this.imageStateIndex > this.imagesLength-1 ? 0 : this.imageStateIndex + 1;
		this.setState(this.imageStates[this.imageStateIndex]);
	}

	render() {
		return (
			<div>
				<Container>
					<Row>
						<Col md="1" className="caret caret-left" onClick={this.LeftImage}>&lt;</Col>
						<Col md="10" className="slide-show-image-col">
							<ul className="slide-show-list">
								<li key={this.state.id}>
									{/* Link to Larger Image */}
									{/* paginated */}
									<img src={this.state.mediumURL} /><br />
									<span className="slide-show-image-caption">{this.state.title}</span>
									<br />
									{this.state.index+1}/{this.imagesLength}

								</li>
							</ul>
						</Col>
						<Col md="1" className="caret caret-right" onClick={this.RightImage}>&gt;</Col>
					</Row>
				</Container>
			</div>
		)
	}
}