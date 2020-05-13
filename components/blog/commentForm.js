export default class CommentForm extends React.Component {

	constructor({commentId, blogPostId}) {
		super();

		// Boolean indicating if this form is to reply to a comment or the post itself
		const replyToComment = commentId !== null && !isNaN(commentId);

		this.state = {
			firstName		: '',
			lastName		: '',
			email			: '',
			comment			: '',
			emailReply		: '',
			id				: blogPostId,
			commentId		: commentId,
			commentLegend	: replyToComment ? "Reply To Comment" : "New Comment",
			replyToComment	: replyToComment,
			commentPosted	: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidUpdate(prevProps) {
		if(this.props.blogPostId !== prevProps.blogPostId) {
			// Page Post State has chamged, Load new Comments state from updated props
			this.setState({
				commentPosted	: false
			});
		}
	}

	handleSubmit(event) {
		event.preventDefault();

		// Save comment to database
		fetch("/api/postComment", {
							method	: 'POST',
							body	: JSON.stringify(this.state),
							headers	: {	'Content-Type': 'application/json'}
						})
						.then(res => res.json())
						.then(json => {
							(json.status && json.status.affectedRows && json.status.affectedRows > 0) &&
								this.setState({
									commentPosted	: true
								});
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
				<div className="comment-posted">Thank you! Your {this.state.replyToComment ? "reply" : "comment"} has been saved and I am reviewing them for public display.</div>
			)
		} else {
			return (
				<div className="comment-form-container">
					<div>
						<form method="post" onSubmit={this.handleSubmit}>
							<fieldset>
								<legend>{this.state.commentLegend}</legend>

								<input 	id			= "firstName"
										maxLength	= "50"
										name		= "firstName"
										required	= "required"
										type		= "text"
										value		= {this.state.firstName}
										onChange	= {this.handleChange}
										placeholder	= "First Name"
								/>

								<input	id			= "lastName"
										maxLength	= "50"
										name		= "lastName"
										required	= "required"
										type		= "text"
										value		= {this.state.lastName}
										onChange	= {this.handleChange}
										placeholder	= "Last Name"
								/>

								<input	id			= "email"
										maxLength	= "255"
										name		= "email"
										required	= "required"
										type		= "email"
										value		= {this.state.email}
										onChange	= {this.handleChange}
										placeholder	= "Email"
								/>

								<textarea	id			= "comment"
											name		= "comment"
											required	= "required"
											value		= {this.state.comment}
											onChange	= {this.handleChange}
											placeholder	="Comments"
								/>

								<input 	id				= "emailReply"
										name			= "emailReply"
										type			= "checkbox"
										defaultValue	= "1"
										onChange		= {this.handleChange}
								/>
								<input	id				= "emailReply-checkbox"
										name			= "emailReply"
										type			= "hidden"
										defaultValue	= "0"
										onChange		= {this.handleChange}
								/>
								<label htmlFor="emailReply">&nbsp;Email me replies to this thread</label>

								<div>
									{
										this.state.replyToComment &&
											<input	name	= "entryDiscussionId"
													type	= "hidden"
													value	= {this.state.commentId}
											/>
									}

									<input	type	= "submit"
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