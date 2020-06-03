// pages/blog/[..slug].js
import fetch from 'node-fetch'
import Layout from "../../components/blog/layouts/Layout";
import Head from 'next/head'
import { Container, Row, Col } from 'reactstrap';
import Comments from "../../components/blog/comments"
import SeriesPosts from "../../components/blog/seriesPosts"
import React, {Component} from 'react';
import Aside from "../../components/blog/layouts/AsideRight"
import SlideShow from "../../components/blog/slideShow"

export default class PostPage extends Component {
	render() {
		return (
			<Layout>
				<main>
					<Head>
						<title key="title">{this.props.post.blogPost.title} - {process.env.global.title}</title>
						<script type="text/javascript" src="/javascripts/tracking.js" defer />
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

									{Object.keys(this.props.post.flikrImages).length ?
										<section className="slide-show">
											<SlideShow flikrImages = {this.props.post.flikrImages} />
										</section>
										: null
									}


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
								<Aside	topCategories	= {this.props.post.topCategories}
										latestPosts		= {this.props.post.latestPosts}
										latestComments	= {this.props.post.latestComments}
										latestSeries	= {this.props.post.latestSeries} />
							</Col>
						</Row>
					</Container>
				</main>
			</Layout>
		)
	}

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