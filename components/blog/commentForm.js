class CommentForm extends React.Component {

	constructor(props) {
		super(props);

		// Boolean indicating if this form is to reply to a comment or the post itself
		const replyToComment = props.commentId !== null && !isNaN(props.commentId);

		this.state = {
			firstName		: '',
			lastName		: '',
			email			: '',
			comment			: '',
			emailReply		: '',
			id				: props.blogPostId,
			commentId		: props.commentId,
			commentLegend	: replyToComment ? "Reply To Comment" : "New Comment",
			replyToComment	: replyToComment,
			commentPosted	: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();

		// Save comment to database
		fetch("http://dev.react-api.carlosvazquez.org/blog/api/postComment", {
							method	: 'POST',
							body	: JSON.stringify(this.state),
							headers	: {	'Content-Type': 'application/json'}
						})
						.then(res => res.json())
						.then(json => {
							if(json.status && json.status.affectedRows) {
								if(json.status.affectedRows > 0) {
									this.setState({
										commentPosted	: true
									})
								}
							}
						});
	}

	handleChange(event) {
		this.setState({
			[event.target.name]	: event.target.value
		});
	}

	render() {
		if(this.state.commentPosted) {
			return (
				<div>Your {this.state.replyToComment ? "Reply" : "Comment"} has been posted.</div>
			)
		} else {
			return (
				<div id="CommentBlockContainer">
					<div id="CommentBlock">
						<form method="post" name="CommentSave" onSubmit={this.handleSubmit}>
							<fieldset>
								<legend id="NewCommentLegend">{this.state.commentLegend}</legend>
								<label htmlFor="NewEntryCommentObject-firstName">First Name</label>
								<span id="NewEntryCommentObject-firstName-error" className="NewEntryCommentObjectError"></span>
								<br />
								<input 	id			= "NewEntryCommentObject-firstName"
										maxLength	= "50"
										name		= "firstName"
										required	= "required"
										type		= "text"
										value		= {this.state.firstName}
										onChange	= {this.handleChange}
								/>
								<br /><br />

								<label htmlFor="NewEntryCommentObject-lastName">Last Name</label>
								<span id="NewEntryCommentObject-lastName-error" className="NewEntryCommentObjectError"></span>
								<br />
								<input	id			= "NewEntryCommentObject-lastName"
										maxLength	= "50"
										name		= "lastName"
										required	= "required"
										type		= "text"
										value		= {this.state.lastName}
										onChange	= {this.handleChange}
								/>
								<br /><br />

								<label htmlFor="NewEntryCommentObject-email">Email</label>
								<span id="NewEntryCommentObject-email-error" className="NewEntryCommentObjectError"></span>
								<br />
								<input	id			= "NewEntryCommentObject-email"
										maxLength	= "255"
										name		= "email"
										required	= "required"
										size		= "50"
										type		= "text"
										value		= {this.state.email}
										onChange	= {this.handleChange}
								/>
								<br /><br />

								<label htmlFor="NewEntryCommentObject-comment">Comment</label>
								<span id='NewEntryCommentObject-comment-error' className='NewEntryCommentObjectError'></span>
								<br />
								<textarea	id			= "NewEntryCommentObject-comment"
											name		= "comment"
											required	= "required"
											value		= {this.state.comment}
											onChange	= {this.handleChange}
								/>
								<br /><br />

								<input 	id				= "NewEntryCommentObject-emailReply"
										name			= "emailReply"
										type			= "checkbox"
										defaultValue	= "1"
										onChange		= {this.handleChange}
								/>
								<input	id				= "NewEntryCommentObject-emailReply-checkbox"
										name			= "emailReply"
										type			= "hidden"
										defaultValue	= "0"
										onChange		= {this.handleChange}
								/>
								<label htmlFor="NewEntryCommentObject-emailReply">&nbsp;Email me replies to this thread</label>
								<br />

								<div>
									{
										this.state.replyToComment &&
											<input	id				= "entryDiscussionId"
													name			= "entryDiscussionId"
													type			= "hidden"
													value			= {this.state.commentId}
											/>
									}

									<input	id		= "CommentSubmitButton"
											type	= "submit"
											value	= {this.state.replyToComment ? "Reply" : "Post Comment"}
									/>
								</div>
							</fieldset>
						</form>
					</div>
				</div>
			)
		}
	}
}

export default CommentForm