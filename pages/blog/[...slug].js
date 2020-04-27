// pages/blog/[..slug].js
import Head from 'next/head'
import { useRouter } from 'next/router'
import fetch from 'node-fetch'
import ReactHtmlParser from 'react-html-parser';
import { Container, Row, Col } from 'reactstrap';
import TopCategories from '../../components/blog/topCategories'
import LatestPosts from '../../components/blog/latestPosts'
import LatestComments from '../../components/blog/latestComments'

function Post({ post }, props) {
	const 	router = useRouter(),
			homeData = post;

	if(router.isFallback) {
		return <div>Loading...</div>
	}

	return (
		<main>
			<Head>
				<title key="title">{post.blogPost.title} - {process.env.global.title}</title>
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
										<div key={comment.id}>
											<span className="comment-name">{comment.firstName} {comment.lastName}</span>
											<span className="comment-datetime">{comment.postDate} {comment.postTime}</span>
											<div className="comment-content">
												{ReactHtmlParser(comment.content)}
											</div>
										</div>
									))
								}
							</section>
						</article>
					</Col>
					<Col>
						{TopCategories({homeData})}
						{LatestPostsAside({homeData})}
						{LatestComments({homeData})}
					</Col>
				</Row>
			</Container>
		</main>
	);
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
  const	res = await fetch("http://dev.react-api.carlosvazquez.org/blog/api/getAllPostSlugs", {
						method:	'GET',
						cache:	'force-cache'
					}
			),
		posts  = await res.json();

  const paths = posts.postSlugs.map(post => `/blog/${post.titleURL}`)

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const	res = await fetch(`http://dev.react-api.carlosvazquez.org/blog/api/getPostPageByTitleURL/${params.slug}`, {
						method:	'GET',
						cache:	'force-cache'
					}
			),
		post = await res.json();

  return { props: { post } }
}

export default Post