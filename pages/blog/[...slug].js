/*
	Renders each blog post page
	pages/blog/[..slug].js
*/

import Layout from "../../components/blog/layouts/Layout";
import Head from 'next/head'
import { Container, Row, Col } from 'reactstrap';
import Comments from "../../components/blog/comments"
import SeriesPosts from "../../components/blog/seriesPosts"
import React, {Component} from 'react';
import Aside from "../../components/blog/layouts/AsideRight"
import SlideShow from "../../components/blog/slideShow"

export default class PostPage extends Component {
	constructor(props) {
		super(props);

		if(props.post) {
			// Setup an image slideshow (if exists) and the blog post id
			this.state = {
				slideShow 	: this.slideShow(props.post),
				blogPostId	: props.post.blogPost[0].id
			}
		}
	}

	// Check if images exist for a slideshow to display for this post and if yes, return image slideshow
	slideShow(post) {
		return Object.keys(post.flikrImages).length ? (
				<section className="slide-show">
					<SlideShow	flikrImages = {post.flikrImages}
								postId		= {post.blogPost[0].id} />
				</section>
		) : null;
	}

	componentDidUpdate(prevProps, prevState) {
		// Detect if the user navigagted to another blog post and reset to the new blog posts image slideshow and blog post id
		if(Object.keys(this.props).length && this.props.post.blogPost[0].id !== prevState.blogPostId) {
			this.setState({
				slideShow	: this.slideShow(this.props.post),
				blogPostId	: this.props.post.blogPost[0].id
			});
		}
	}

	render() {
		if(!Object.keys(this.props).length) return <div>Missing Props</div>;

		// Jest doesn't like the global version, but then production breaks without it
		const title = process.env.NEXT_PUBLIC_TITLE || (process.env.global && process.env.global.title ? process.env.global.title : '');

		return 	<Layout>
				<main>
					<Head>
						<title key="title">{this.props.post.blogPost[0].title} - {title}</title>
						<script type="text/javascript" src="/javascripts/tracking.js" defer />
					</Head>

					<Container>
						<Row>
							<Col xs="12" md="8">
								<article>
									{/* Display title and publish date */}
									<header>
										<h1>{this.props.post.blogPost[0].title}</h1>
										<div className="publish-date">{this.props.post.blogPost[0].publishAt}</div>
									</header>

									{/* Display the blog post */}
									<section className="post">
										<div dangerouslySetInnerHTML={{ __html: this.props.post.blogPost[0].content.replace("class=", "className=") }} />
									</section>

									{this.state.slideShow}

									{	// If this post is part of a series, display a list of titles/links to other posts in the series
										Object.keys(this.props.post.seriesPosts).length ?
											<section className="series-posts">
												<SeriesPosts	series			= {this.props.post.seriesPosts}
																originalPostId	= {this.props.post.blogPost[0].id}
												/>
											</section>
											: null
									}

									{/* Display any comments that might exist and the comment form */}
									<Comments post	= {this.props.post} />
								</article>
							</Col>
							<Col xs="12" md="4">
								{/* Right navigation */}
								<Aside	topCategories		= {this.props.post.topCategories}
										latestPosts			= {this.props.post.latestPosts}
										latestComments		= {this.props.post.latestComments}
										latestSeries		= {this.props.post.latestSeries}
										latestImagePosts	= {this.props.post.latestImagePosts} />
							</Col>
						</Row>
					</Container>
				</main>
			</Layout>
	}
}

// Retrieve all the blog post paths (i.e. url titles), to use in retrieving their content
export async function getStaticPaths() {
	const apiPath = "/blog/api/getPostSlugs";

	try {
		const	res 	= await fetch(process.env.global.apiURL + apiPath),
				posts 	= await res.json(),
				paths	= posts.postSlugs.map(post => `/blog/${post.titleURL}`);

		// return all the title urls, for use in getStaticProps
		return { paths, fallback: false }
	} catch(e) {
		console.log("ERROR: ${apiPath} request failed");

		return { paths : [], fallback: true }
	}
}

// Take all the blog post title paths retrieved in getStaticPaths and make API request to retrieve each posts content
export async function getStaticProps({ params }) {
	const apiPath = `/blog/api/getPostPageByTitleURL/${params.slug}`;

	try {
		const	res = await fetch(process.env.global.apiURL + apiPath),
				post = await res.json();

		return { props: { post, }, };
	} catch(e) {
		console.log(`ERROR: ${apiPath} request failed`);

		return { props: {} }
	}
}