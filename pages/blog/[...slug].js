// pages/blog/[..slug].js
import fetch from 'node-fetch'
import Layout from "../../components/blog/layouts/Layout";
import Head from 'next/head'
import { Container, Row, Col } from 'reactstrap';
import ReactHtmlParser from 'react-html-parser';
import TopCategories from "../../components/blog/topCategories"
import LatestPosts from "../../components/blog/latestPosts"
import LatestComments from "../../components/blog/latestComments"
import Comments from "../../components/blog/comments"
import SeriesPosts from "../../components/blog/seriesPosts"

function PostPage({ post }) {
	let homeData = post;

	return (
		<Layout>
			<main>
				<Head>
					<title key="title">{post.blogPost.title} - {process.env.global.title}</title>
				</Head>

				<Container>
					<Row>
						<Col xs="12" md="8">
							<article>
								<header>
									<h1>{post.blogPost.title}</h1>
								</header>

								<section className="post">
									{ReactHtmlParser(post.blogPost.content)}
								</section>

								{Object.keys(post.seriesPosts).length ?
									<section className="series-posts">
										<SeriesPosts	series			= {post.seriesPosts}
														originalPostId	= {post.blogPost.id}
										/>
									</section>
									: null
								}

								<Comments post	= {post} />
							</article>
						</Col>
						<Col xs="12" md="4">
							{TopCategories({homeData})}
							{LatestPostsAside({homeData})}
							{LatestComments({homeData})}
						</Col>
					</Row>
				</Container>
			</main>

		</Layout>
	)
}

function LatestPostsAside({homeData}) {
	return (
		<aside>
			<header>
				<h3>Latest Posts</h3>
			</header>
			{LatestPosts({homeData})}
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

  return { props: { post } }
}

export default PostPage