import ReactHtmlParser from 'react-html-parser';
import CommentForm from '../../components/blog/commentForm'

class Comments extends React.Component {
	constructor(props) {
		super(props)

		this.replyText = "Reply";

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
								})(this.replyText)
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
		let comments = [],
			replies = {};

		// Separate parent and replied to comments into separate objects
		this.state.post.postComments.forEach(comment => {
			comment.replyToId === null ? comments.push(comment) : replies[comment.replyToId] = comment;
		});

		return(
			comments.map(comment => (
				<div	key		= {comment.id}
						style	= {{margin: "10px 0px"}}>
					<span className="comment-name">{comment.firstName} {comment.lastName}</span>
					&nbsp;--&nbsp;
					<span className="comment-datetime">{comment.postDate} {comment.postTime}</span>
					<div className="comment-content">
						{ReactHtmlParser(comment.content)}
					</div>
					<div className="comment-replies">
						{comment.id in replies &&
							<div style={{margin: "10px 0px 10px 25px"}}>
								{ReactHtmlParser(replies[comment.id].content)}
								<br />
								<div style={{float:"right"}}>
									{replies[comment.id].firstName} {replies[comment.id].lastName} -- {replies[comment.id].postDate} {replies[comment.id].postTIme}
								</div>
							</div>
						}
					</div>

					<div className="BlogCommentUserCommentReply">
						<span	className	= "BlogCommentUserCommentReplyText"
								name		= "commentId"
								data-id		= {comment.id}
								onClick		= {this.handleReplyLinkCicked}
								style	= {{display: "inline",
											color: "#FFA500",
											fontSize: ".8em"}}
						>
							{this.state.comments[comment.id].replyText}
						</span>
						{this.state.comments[comment.id].replyLinkClicked && this.displayCommentForm(this.state.post.blogPost.id, comment.id)}
					</div>

					<div style={{	border: "1px solid silver",
									margin: "10px"}}></div>
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