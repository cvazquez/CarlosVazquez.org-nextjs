import {Container, Row, Col} from 'reactstrap'
import React, {Component} from 'react';

export default class SlideShow extends React.Component {
	constructor(props) {
		super();

		this.imageStates = {};
		this.imageStateIndex = 0;
		this.imagesLength = props.flikrImages.length;
		this.touch = {
			startX	: 0,
			endX	: 0
		};


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


		// ********** Handle Image Swipe ********
		this.handleTouchMove = this.handleTouchMove.bind(this);
		this.handleTouchStart = this.handleTouchStart.bind(this);
		this.handleTouchEnd = this.handleTouchEnd.bind(this);
	}

	slideImage(direction) {
		// Update the array of images index to the next or previous image in array
		this.imageStateIndex = (direction === "left" ?
			(this.imageStateIndex > 0 ? this.imageStateIndex - 1 : this.imagesLength - 1)
			:
			(this.imageStateIndex >= this.imagesLength-1 ? 0 : this.imageStateIndex + 1)
			);

		this.setState(this.imageStates[this.imageStateIndex]);
	}

	handleNextPrevImageCLick(event) {
		this.slideImage(event.target.classList.contains("caret-left") ? "left" : "right");
	}

	handlePageNumberClick(event) {
		this.setState(this.imageStates[event.currentTarget.dataset.page]);
	}

	// touchstart handler
	handleTouchStart(event) {
		const touches = event.touches[0];

		// Initialize touch to use in handleTouchEnd to calculate if user swiped left/right
		this.touch.startX = touches.clientX;
		this.touch.yStart = touches.clientY;
	}

	handleTouchMove(event) {
		const touches = event.changedTouches[0];

		// Keep track of touch movement to subtract from initial touch start
		this.touch.endX = touches.clientX;
	  }

	handleTouchEnd(event) {
		// Subtract the initial start X position from the end, to determine whether to swipe left or right
		const	directionX		= this.touch.startX - this.touch.endX,
				absDirectionX	= Math.abs(directionX),
				imageWidth		= event.target.width,
				percentSwiped	= absDirectionX/imageWidth;

		if(percentSwiped > .5) {
			// Only accept swipe if over 50% of image width is swipped
			if(directionX < 0) {
				this.slideImage("right");
			} else {
				this.slideImage("left");
			}
		}
  	}

	render() {
		return (
			<div>
				<Container>
					<Row>
						<Col md="1" className="caret caret-left d-none d-sm-block" onClick={this.handleNextPrevImageCLick}>&lt;</Col>
						<Col md="10" className="slide-show-image-col">
							<ul className="slide-show-list">
								<li key={this.state.id}>
									{/* Link to Larger Image */}
									<img	id				= "slide-show-image"
											src				= {this.state.mediumURL}
											onTouchMove		= {this.handleTouchMove}
											onTouchStart	= {this.handleTouchStart}
											onTouchEnd		= {this.handleTouchEnd} />
									<br />
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
						<Col md="1" className="caret caret-right d-none d-sm-block" onClick={this.handleNextPrevImageCLick}>&gt;</Col>
					</Row>
				</Container>
			</div>
		)
	}
}