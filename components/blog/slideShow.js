import {Container, Row, Col} from 'reactstrap'
import React, {Component} from 'react';

export default class SlideShow extends React.Component {
	constructor(props) {
		super();

		this.imageStates = {};
		this.imageStateIndex = 0;
		this.imagesLength = props.flikrImages.length;


		// ************** Pagination by left/right arrow (caret) ************
		props.flikrImages.map((flikrImage, index) => {
			this.imageStates[index] = {
				index		: index,
				id			: flikrImage.id,
				mediumURL	: flikrImage.mediumurl,
				title		: flikrImage.title
			};
		})
		this.state = this.imageStates[this.imageStateIndex];

		this.handleNextPrevImageCLick = this.handleNextPrevImageCLick.bind(this);


		// ************ PAGINATION By Page Number ***************
		this.imagePagination = [];
		this.handlePageNumberClick = this.handlePageNumberClick.bind(this);

		for(let x = 0; x < this.imagesLength; x++) {
			this.imagePagination.push(<li key={x} onClick={this.handlePageNumberClick} data-page={x}>{x+1}</li>);
		}


	}

	handleNextPrevImageCLick(event) {
		this.imageStateIndex = event.target.classList.contains("caret-left") ?
			(this.imageStateIndex > 0 ? this.imageStateIndex - 1 : this.imagesLength - 1)
			:
			(this.imageStateIndex >= this.imagesLength-1 ? 0 : this.imageStateIndex + 1);

		this.setState(this.imageStates[this.imageStateIndex]);
	}

	handlePageNumberClick(event) {
		this.setState(this.imageStates[event.currentTarget.dataset.page]);
	}

	render() {


		return (
			<div>
				<Container>
					<Row>
						<Col md="1" className="caret caret-left" onClick={this.handleNextPrevImageCLick}>&lt;</Col>
						<Col md="10" className="slide-show-image-col">
							<ul className="slide-show-list">
								<li key={this.state.id}>
									{/* Link to Larger Image */}
									<img src={this.state.mediumURL} /><br />
									<span className="slide-show-image-caption">{this.state.title}</span>
									<br />
									{this.state.index + 1}/{this.imagesLength}
									<br />
									<ul className="image-pagination">
										{this.imagePagination}
									</ul>

								</li>
							</ul>
						</Col>
						<Col md="1" className="caret caret-right" onClick={this.handleNextPrevImageCLick}>&gt;</Col>
					</Row>
				</Container>
			</div>
		)
	}
}