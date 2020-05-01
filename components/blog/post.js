import Head from 'next/head'
import { Container, Row, Col } from 'reactstrap';
import ReactHtmlParser from 'react-html-parser';
import CommentForm from "./commentForm"
import TopCategories from "./topCategories"
import LatestPosts from "./latestPosts"
import LatestComments from "./latestComments"
import Comments from "../../components/blog/comments"


class Post extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			post				: props.post
		};
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

								<Comments post	= {post} />
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