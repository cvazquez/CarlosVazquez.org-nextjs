import {Container, Row, Col} from 'reactstrap'
import React, {Component} from 'react';

export default class SlideShow extends React.Component {
	constructor(props) {
		super(props);

		this.imageStates = {};
		this.imageStateIndex = 0;
		this.imagesLength = props.flikrImages.length;
		this.touch = {
			startX	: 0,
			endX	: 0
		};
		this.maxHeight = 0;
		this.maxWidth = 0;


		// ************** Pagination by left/right arrow (caret) ************
		this.getUpdatedImages(props.flikrImages);


		// ************ PAGINATION By Page Number ***************
		this.handlePageNumberClick = this.handlePageNumberClick.bind(this);

		this.state = {
			image		: this.imageStates[this.imageStateIndex],
			pagination	: this.getImagePagination(),
			maxHeight	: this.maxHeight,
			maxWidth	: this.maxWidth
		};

		this.handleNextPrevImageCLick = this.handleNextPrevImageCLick.bind(this);

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

		this.setState({
			image		: this.imageStates[this.imageStateIndex],
			pagination	: this.getImagePagination()
		});
	}

	handleNextPrevImageCLick(event) {
		this.slideImage(event.target.classList.contains("caret-left") ? "left" : "right");
	}

	handlePageNumberClick(event) {
		this.imageStateIndex = parseInt(event.currentTarget.dataset.page);
		this.setState({
			image		: this.imageStates[this.imageStateIndex],
			pagination	: this.getImagePagination()
		});
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

		if(percentSwiped > .25) {
			// Only accept swipe if over 25% of image width is swipped
			if(directionX < 0) {
				this.slideImage("right");
			} else {
				this.slideImage("left");
			}
		}
	  }

	getUpdatedImages(flikrImage) {
		this.imageStates = {};
		this.imageStateIndex = 0;
		this.imagesLength = flikrImage.length;

		flikrImage.map((flikrImage, index) => {
			// Make sure the image width is less than 600 pixels, so we don't pull in an image too large for screen into the srcset
			const	imageWidthLimit = 600,
					overLargeImageWidthLimit = flikrImage.largeWidth !== null && flikrImage.largeWidth > imageWidthLimit,
					overMediumImageWidthLimit = flikrImage.mediumWidth !== null && flikrImage.mediumWidth > imageWidthLimit;

			this.imageStates[index] = {
				index			: index,
				id				: flikrImage.id,
				squareURL		: flikrImage.squareURL,
				squareWidth		: flikrImage.squareWidth,
				squareHeight	: flikrImage.squareHeight,
				smallURL		: flikrImage.smallURL,
				smallWidth		: flikrImage.smallWidth,
				smallHeight		: flikrImage.smallHeight,
				mediumURL		: flikrImage.mediumURL,
				mediumWidth		: flikrImage.mediumWidth,
				mediumHeight	: flikrImage.mediumHeight,
				largeURL		: flikrImage.largeURL,
				largeWidth		: flikrImage.largeWidth,
				largeHeight		: flikrImage.largeHeight,
				title			: flikrImage.title,
				description		: flikrImage.description,
				overLargeImageWidthLimit,
				overMediumImageWidthLimit,
				srcSet			: `${flikrImage.squareURL} ${flikrImage.squareWidth}w,` +
									`${flikrImage.smallURL} ${flikrImage.smallWidth}w,` +
									`${flikrImage.mediumURL} ${flikrImage.mediumWidth}w`
									+
									(!overLargeImageWidthLimit ? `, ${flikrImage.largeURL} ${flikrImage.largeWidth}w` : ''),
				sizes			: `(max-width: ${flikrImage.squareWidth}px) ${flikrImage.squareWidth}px,` +
									`(max-width: ${flikrImage.smallWidth}px) ${flikrImage.smallWidth}px,` +
									`(max-width: ${flikrImage.mediumWidth}px) ${flikrImage.mediumWidth}px`
									+
									(!overLargeImageWidthLimit ? `, (max-width: ${flikrImage.largeWidth}px) ${flikrImage.largeWidth}px` : '')
			};

			// Keep track of the largest image height/width combo, to set image container box to
			if(!overLargeImageWidthLimit && flikrImage.largeHeight > this.maxHeight) {
				this.maxHeight	= flikrImage.largeHeight;
				this.maxWidth	= flikrImage.largeWidth;
			} else if(!overMediumImageWidthLimit && flikrImage.mediumHeight > this.maxHeight) {
				this.maxHeight	= flikrImage.mediumHeight;
				this.maxWidth	= flikrImage.mediumWidth;
			}
		});
	}

	getImagePagination() {
		let imagePagination = [];

		// Creat list of page numbers
		for(let x = 0; x < this.imagesLength; x++) {
			imagePagination.push(<li key={x} onClick={this.handlePageNumberClick} data-page={x}>{x+1}</li>);
		}

		return imagePagination;
	}

	preCacheImages() {
		return (
		Object.keys(this.imageStates).map(image =>
			<img	style	= {{display : "none"}}
			className		= "pre-cached-images"
			srcSet			= {this.imageStates[image].srcSet}
			sizes			= {this.imageStates[image].sizes}
			src				= {this.imageStates[image].mediumURL}
			alt				= {this.imageStates[image].title}
			loading			= "lazy"
			key				= {image} />
		))
	}

	componentDidUpdate(prevProps) {
		if(this.props.postId !== prevProps.postId) {
			this.getUpdatedImages(this.props.flikrImages);
			this.setState({
				image		: this.imageStates[this.imageStateIndex],
				pagination	: this.getImagePagination(),
				maxHeight	: this.maxHeight,
				maxWidth	: this.maxWidth
			});
		}
	}

	render() {
		const	imageCount	= Object.keys(this.imageStates).length,
				leftCaret	= imageCount > 1 ?
								<Col md="1" className="caret caret-left d-none d-md-block" onClick={this.handleNextPrevImageCLick}>&lt;</Col> : '',
				rightCaret	= imageCount > 1 ?
								<Col md="1" className="caret caret-right d-none d-md-block" onClick={this.handleNextPrevImageCLick}>&gt;</Col> : '',
				pageCounts	= imageCount > 1 ?
								<><div>{this.state.image.index + 1}/{this.imagesLength}</div>
								<ul className="image-pagination">{this.state.pagination}</ul></> : '';

		return 	<div>
				<Container>
					<Row>
						{leftCaret}
						<Col xs="12" md="10" className="slide-show-image-col">
							<div	className	= "image-container"
									style		= {{height 	: this.state.maxHeight+20}}>
								{/* TODO - Link to Larger Image in lightbox */}
								<img	id				= "slide-show-image"
										srcSet			= {this.state.image.srcSet}
										sizes			= {this.state.image.sizes}
										alt				= {this.state.image.title}
										onTouchMove		= {this.handleTouchMove}
										onTouchStart	= {this.handleTouchStart}
										onTouchEnd		= {this.handleTouchEnd}
										style			= {{maxHeight	: this.state.maxHeight+1,
															maxWidth	: this.state.maxWidth+1,
															width		: "100%"}} />
								</div>

							<div className="slide-show-image-caption">{this.state.image.title}</div>
							<div className="slide-show-image-description">{this.state.image.description}</div>
							{pageCounts}
						</Col>
						{rightCaret}
					</Row>
				</Container>
				{this.preCacheImages()}
			</div>
	}
}