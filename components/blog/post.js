import Head from 'next/head'
import { Container, Row, Col } from 'reactstrap';
import ReactHtmlParser from 'react-html-parser';
import CommentForm from "./commentForm"
import TopCategories from "./topCategories"
import LatestPosts from "./latestPosts"
import LatestComments from "./latestComments"


class Post extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			post				: props.post,
			replyLinkClicked	: false
		};

		this.handleReplyLinkCicked = this.handleReplyLinkCicked.bind(this);
	}

	handleReplyLinkCicked() {
		this.setState({
			replyLinkClicked	: true
		})
	}

	displayCommentForm(blogPostId, commentId) {
		return(
				<CommentForm	blogPostId	= {blogPostId}
								commentId	= {commentId} />
		)
	}

	LatestPostsAside({homeData}) {
		return (
			<aside>
				<header>
					<h3>Latest Posts</h3>
				</header>
				{LatestPosts({homeData})}
			</aside>
		)
	}

	render() {
		let post = this.state.post,
			homeData = post;

		return (
			<main>
				<Head>
					<title key="title">{this.state.post.blogPost.title} - {process.env.global.title}</title>
				</Head>

				<Container>
					<Row xs="1" lg="2">
						<Col>
							<article>
								<header>
									<h1>{post.blogPost.title}</h1>

									<div className="teaser">
										{ReactHtmlParser(post.blogPost.teaser)}
									</div>
								</header>

								<section className="post">
									{ReactHtmlParser(post.blogPost.content)}
								</section>

								<section className="comments">
									<header>
										<h2>Comments</h2>
									</header>
									{
										post.postComments.map(comment => (
											<div	key	= {comment.id}
													style	= {{margin: "10px 0px"}}>
												<span className="comment-name">{comment.firstName} {comment.lastName}</span>
												<span className="comment-datetime">{comment.postDate} {comment.postTime}</span>
												<div className="comment-content">
													{ReactHtmlParser(comment.content)}
												</div>

												<div className="BlogCommentUserCommentReply">
													<span	className	= "BlogCommentUserCommentCancelText"
															style	= {{display: "none"}}>
														Cancel Reply
														<br /><br />
													</span>
													<span	className	= "BlogCommentUserCommentReplyText"
															onClick		= {this.handleReplyLinkCicked}
															style	= {{display: "inline",
																		color: "#FFA500",
																		fontSize: ".8em"}}
													>
														Reply
													</span>
													{this.state.replyLinkClicked && this.displayCommentForm(post.blogPost.id, comment.id)}
												</div>
											</div>
										))
									}

									{this.displayCommentForm(post.blogPost.id, null)}
								</section>
							</article>
						</Col>
						<Col>
							{TopCategories({homeData})}
							{this.LatestPostsAside({homeData})}
							{LatestComments({homeData})}
						</Col>
					</Row>
				</Container>
			</main>
		)
	}
}

export default Post