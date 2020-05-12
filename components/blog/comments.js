import CommentForm from '../../components/blog/commentForm'
import React, {Component} from 'react';

export default class Comments extends Component {
	constructor(props) {
		super(props)

		this.replyText = "Reply";

		this.state = this.getUupdatedState(props);
		this.propState = this.state;

		this.handleReplyLinkCicked = this.handleReplyLinkCicked.bind(this);
	}

	getUupdatedState(props) {
		return {
			comments			: (() => {
									// Comment reply objects are dynamically created for each comment
									var stateObject = {};

									for(var commentId in props.post.postComments) {
										stateObject[props.post.postComments[commentId].id] = {
											replyLinkClicked	: false,
											replyText			: this.replyText
										}
									}

									return stateObject;
								})()
		};
	}

	componentDidUpdate(prevProps) {
		if(this.props.post.blogPost.id !== prevProps.post.blogPost.id) {
			// Page Post State has chamged, Load new Comments state from updated props
			this.propState = this.getUupdatedState(this.props);
		}
	}

	handleReplyLinkCicked(event) {
		const 	commentId		= event.currentTarget.dataset.id,
				commentState	= this.propState.comments,
				replyText		= commentState[commentId].replyText,
				isReply			= replyText === this.replyText;

		// Update comment id with calculated new state for this comment clicked
		commentState[commentId] = {
				replyLinkClicked	: isReply,
				replyText			: isReply ? "Cancel" : this.replyText
		};

		// Set state for all existing and the updated comment
		this.setState({
			comments	: commentState
		})
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
				{ id }				= this.props.post.blogPost,
				displayReplies		= {},
				displayComments		= [];

		// Separate comments and their replies
		postComments.forEach(comment => {
			comment.replyToId === null ? displayComments.push(comment) : displayReplies[comment.replyToId] = comment;
		});

		return (
			<section className="comments">
				<header>
					<h2>Comments</h2>
				</header>
				{
				displayComments.map(comment => (
					<div	key			= {comment.id}
							className	= "comment-container">

						{/* Display this post's comment */}
						<span className="comment-name">{comment.firstName} {comment.lastName}</span>
						&nbsp;--&nbsp;
						<span className="comment-datetime">{comment.postDate} {comment.postTime}</span>
						<div className="comment-content">
							<div dangerouslySetInnerHTML={{ __html: comment.content }} />
						</div>

						{/* // Display replies to this comment */}
						<div className="comment-replies">
							{comment.id in displayReplies &&
								<div className="comment-reply">
									<div className="comment-reply-content">
										<div dangerouslySetInnerHTML={{ __html: displayReplies[comment.id].content }} />
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
								{this.state.comments[comment.id] ? this.state.comments[comment.id].replyText : this.replyText}
							</span>

							{/* Hidden contact form for any replies until handleReplyLinkCicked is triggered */}
							{this.state.comments[comment.id] && this.state.comments[comment.id].replyLinkClicked && this.displayCommentForm(id, comment.id)}
						</div>

						<div className="comment-separator"></div>
					</div>
				))}
				{this.displayCommentForm(id, null)}
			</section>
		)
	}
}