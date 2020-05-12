// pages/blog/[..slug].js
import fetch from 'node-fetch'
import Layout from "../../components/blog/layouts/Layout";
import Head from 'next/head'
import { Container, Row, Col } from 'reactstrap';
import TopCategories from "../../components/blog/topCategories"
import LatestPosts from "../../components/blog/latestPosts"
import LatestComments from "../../components/blog/latestComments"
import Comments from "../../components/blog/comments"
import SeriesPosts from "../../components/blog/seriesPosts"
import React, {Component} from 'react';

export class PostPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
						post			: props.post,
						title 			: props.post.blogPost.title,
						content			: props.post.blogPost.content,
						id				: props.post.blogPost.id,
						topCategories	: props.post.topCategories,
						latestPosts		: props.post.latestPosts,
						latestComments	: props.post.latestComments,
						seriesPosts		: props.post.seriesPosts
					 };
	}

	render() {
		return (
			<Layout>
				<main>
					<Head>
						<title key="title">{this.props.post.blogPost.title} - {process.env.global.title}</title>
					</Head>

					<Container>
						<Row>
							<Col xs="12" md="8">
								<article>
									<header>
										<h1>{this.props.post.blogPost.title}</h1>
									</header>

									<section className="post">
										<div dangerouslySetInnerHTML={{ __html: this.props.post.blogPost.content.replace("class", "className") }} />
									</section>

									{Object.keys(this.props.post.seriesPosts).length ?
										<section className="series-posts">
											<SeriesPosts	series			= {this.props.post.seriesPosts}
															originalPostId	= {this.props.post.blogPost.id}
											/>
										</section>
										: null
									}

									<Comments post	= {this.props.post} />
								</article>
							</Col>
							<Col xs="12" md="4">
								{TopCategories(this.props.post.topCategories)}
								{LatestPostsAside(this.state.latestPosts)}
								<LatestComments latestComments = {this.state.post.latestComments} />
							</Col>
						</Row>
					</Container>
				</main>
			</Layout>
		)
	}

}

function LatestPostsAside(latestPosts) {
	return (
		<aside>
			<header>
				<h3>Latest Posts</h3>
			</header>
			<LatestPosts latestPosts = {latestPosts} />
		</aside>
	)
}

export async function getStaticPaths() {
	const	res 	= await fetch(`${process.env.global.apiURL}/blog/api/getPostSlugs`),
			posts 	= await res.json(),
			paths	= posts.postSlugs.map(post => `/blog/${post.titleURL}`);

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
	const	res = await fetch(`${process.env.global.apiURL}/blog/api/getPostPageByTitleURL/${params.slug}`),
			post = await res.json();

  return { props: { post, }, }
}

export default PostPage