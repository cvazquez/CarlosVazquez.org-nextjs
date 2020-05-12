import ReactHtmlParser from 'react-html-parser';
import CommentForm from '../../components/blog/commentForm'
import React, {Component} from 'react';

export default class Comments extends Component {
	constructor(props) {
		super(props)

		let comments = [],
			replies = {};

		this.replyText = "Reply";

		// Separate parent and replied to comments into separate objects
		props.post.postComments.forEach(comment => {
			comment.replyToId === null ? comments.push(comment) : replies[comment.replyToId] = comment;
		});

		this.state = {
			post				: props.post,
			comments			: (function(replyText) {
									// Comment reply objects are dynamically created for each comment
									var stateObject = {};

									for(var commentId in props.post.postComments) {
										stateObject[props.post.postComments[commentId].id] = {
											replyLinkClicked	: false,
											replyText			: replyText
										}
									}

									return stateObject;
								})(this.replyText),
			displayComments		:	comments,
			displayReplies		:	replies
		};

		this.handleReplyLinkCicked = this.handleReplyLinkCicked.bind(this);
	}

	handleReplyLinkCicked(event) {
		const 	commentId		= event.currentTarget.dataset.id,
				commentState	= this.state.comments,
				replyText		= commentState[commentId].replyText,
				//isReply			= replyText === this.replyText
				test = 1;

		// Update comment id with calculated new state for this comment clicked
		/* commentState[commentId] = {
				replyLinkClicked	: isReply,
				replyText			: isReply ? "Cancel" : this.replyText
		};

		// Set state for all existing and the updated comment
		this.setState({
			comments	: commentState
		}) */
	}

	displayCommentForm(blogPostId, commentId) {
		// return a new instance of a comment form

		return(
				<CommentForm	blogPostId	= {blogPostId}
								commentId	= {commentId} />
		)
	}

	render() {
		const	{ postComments } 	= this.props.post,
				displayReplies		= {},
				displayComments		= [],
				{ id }				= this.props.post.blogPost;


		// Separate comments and their replies
		postComments.forEach(comment => {
			comment.replyToId === null ? displayComments.push(comment) : displayReplies[comment.replyToId] = comment;
		});

		if(!this.state) {
			this.state = {
				post				: this.props.post,
				comments			: (function(replyText, postComments) {
										// Comment reply objects are dynamically created for each comment
										var stateObject = {};

										for(var commentId in postComments) {
											stateObject[postComments[commentId].id] = {
												replyLinkClicked	: false,
												replyText			: replyText
											}
										}

										return stateObject;
									})(this.replyText, postComments),
				displayComments		:	comments,
				displayReplies		:	replies
			}
		}

		return (
			<section className="comments">
				<header>
					<h2>Comments</h2>
				</header>
				{
				displayComments.map(comment => (
					<div	key			= {comment.id}
							className	= "comment-container">

						{/* Display this comment */}
						<span className="comment-name">{comment.firstName} {comment.lastName}</span>
						&nbsp;--&nbsp;
						<span className="comment-datetime">{comment.postDate} {comment.postTime}</span>
						<div className="comment-content">
							{ReactHtmlParser(comment.content)}
						</div>

						{/* // Display replies to this comment */}
						<div className="comment-replies">
							{comment.id in displayReplies &&
								<div className="comment-reply">
									<div className="comment-reply-content">
										{ReactHtmlParser(displayReplies[comment.id].content)}
										<div className="comment-reply-info">
											{displayReplies[comment.id].firstName}
											{displayReplies[comment.id].lastName}
											&nbsp;--&nbsp;
											{displayReplies[comment.id].postDate}
											{displayReplies[comment.id].postTIme}
										</div>
									</div>
								</div>
							}
						</div>

						<div>
							<span	className	= "comment-reply-cancel-text"
									name		= "commentId"
									data-id		= {comment.id}
									onClick		= {this.handleReplyLinkCicked}>
								{typeof this.state !== 'undefined' && typeof this.state.comments !== 'undefined' && typeof this.state.comments[comment.id] !== 'undefined' ? this.state.comments[comment.id].replyText : this.replyText}
							</span>

							{/* Hidden contact form for any replies */}
							{typeof this.state !== 'undefined' && typeof this.state.comments !== 'undefined' && typeof this.state.comments[comment.id] !== 'undefined' && this.state.comments[comment.id].replyLinkClicked && this.displayCommentForm(id, comment.id)}
						</div>

						<div className="comment-separator"></div>
					</div>
				))}
				{this.displayCommentForm(this.state.post.blogPost.id, null)}
			</section>
		)
	}
}