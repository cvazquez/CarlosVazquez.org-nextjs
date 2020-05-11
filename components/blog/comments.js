import ReactHtmlParser from 'react-html-parser';
import CommentForm from '../../components/blog/commentForm'

class Comments extends React.Component {
	constructor(props) {
		let comments = [],
			replies = {};

		super()

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

	displayComments() {
		return(
			this.state.displayComments.map(comment => (
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
						{comment.id in this.state.displayReplies &&
							<div className="comment-reply">
								<div className="comment-reply-content">
									{ReactHtmlParser(this.state.displayReplies[comment.id].content)}
									<div className="comment-reply-info">
										{this.state.displayReplies[comment.id].firstName}
										{this.state.displayReplies[comment.id].lastName}
										&nbsp;--&nbsp;
										{this.state.displayReplies[comment.id].postDate}
										{this.state.displayReplies[comment.id].postTIme}
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
							{this.state.comments[comment.id].replyText}
						</span>
						{this.state.comments[comment.id].replyLinkClicked && this.displayCommentForm(this.state.post.blogPost.id, comment.id)}
					</div>

					<div className="comment-separator"></div>
				</div>
			))
		)
	}

	render() {
		return (
			<section className="comments">
				<header>
					<h2>Comments</h2>
				</header>
				{this.displayComments()}
				{this.displayCommentForm(this.state.post.blogPost.id, null)}
			</section>
		)
	}
}

export default Comments