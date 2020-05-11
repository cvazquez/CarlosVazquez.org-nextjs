import Head from 'next/head'
import { Container, Row, Col } from 'reactstrap';
import TopCategories from "./topCategories"
import LatestPosts from "./latestPosts"
import LatestComments from "./latestComments"
import Comments from "../../components/blog/comments"
import SeriesPosts from "../../components/blog/seriesPosts"


class Post extends React.Component {

	constructor(props) {
		super(props);

		this.post = props.post;
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
		let post = this.post,
			homeData = post;

		return (
			<main>
				<Head>
					<title key="title">{this.post.blogPost.title} - {process.env.global.title}</title>
				</Head>

				<Container>
					<Row>
						<Col xs="12" md="8">
							<article>
								<p>homeData = {this.post.blogPost.title}</p>
								<header>
									<h1>{post.blogPost.title}</h1>
								</header>

								<section className="post">
									<div dangerouslySetInnerHTML={{ __html: post.blogPost.content }} />
								</section>

								{Object.keys(this.post.seriesPosts).length ?
									<section className="series-posts">
										<SeriesPosts	series			= {this.post.seriesPosts}
														originalPostId	= {this.post.blogPost.id}
										/>
									</section>
									: null
								}

								<Comments post	= {post} />
							</article>
						</Col>
						<Col xs="12" md="4">
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