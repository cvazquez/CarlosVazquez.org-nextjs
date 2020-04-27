// pages/blog/category/[..slug].js
import Head from 'next/head'
import { useRouter } from 'next/router'
import fetch from 'node-fetch'
import Link from 'next/link'
import { Container, Row, Col } from 'reactstrap';
import TopCategories from '../../../components/blog/topCategories'
import LatestPosts from '../../../components/blog/latestPosts'
import LatestComments from '../../../components/blog/latestComments'

function Categories({ category }) {
	const	router = useRouter(),
			homeData = category;

	if(router.isFallback) {
		return <div>Loading...</div>
	}

	return (
		<main>
			<Head>
				<title key="title">{category.category[0].categoryName} - {process.env.global.title}</title>
			</Head>
			<Container>
				<Row xs="1" lg="2">
					<Col>
						<h1>{category.category[0].categoryName} Posts</h1>
						{
							category.categoryPosts.map(post => (
								<div key={post.titleURL}>
									<p>
										<Link href="../{post.titleURL}" as={`../${post.titleURL}`}>
											<a>{post.title}</a>
										</Link>
										<br/>
										{post.publishDate}
										<br />
										{post.contentTeaser}
									</p>
								</div>
							))
						}
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
  const	res = await fetch("http://dev.react-api.carlosvazquez.org/blog/api/getCategoriesPage", {
						method:	'GET',
						cache:	'force-cache'
					}
			),
		page  = await res.json();

  const paths = page.categories.map(category => `/blog/category/${category.nameURL}`)

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const	res = await fetch(`http://dev.react-api.carlosvazquez.org/blog/api/getCategoryPageByName/${params.slug}`, {
						method:	'GET',
						cache:	'force-cache'
					}
			),
		category = await res.json();

  return { props: { category } }
}

export default Categories