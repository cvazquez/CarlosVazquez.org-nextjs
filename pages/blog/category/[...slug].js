// pages/blog/category/[..slug].js
import Head from 'next/head'
import { useRouter } from 'next/router'
import fetch from 'node-fetch'
import Link from 'next/link'
import { Container, Row, Col } from 'reactstrap';
import TopCategories from '../../../components/blog/topCategories'
import LatestPosts from '../../../components/blog/latestPosts'
import LatestComments from '../../../components/blog/latestComments'
import Layout from "../../../components/blog/layouts/Layout";

function Categories({ category }) {
	const	router = useRouter(),
			homeData = category;

	if(router.isFallback) {
		return <div>Loading...</div>
	}

	return (
		<Layout>
			<Head>
				<title key="title">{category.category[0].categoryName} - {process.env.global.title}</title>
			</Head>
			<Container>
				<Row>
					<Col xs="12" md="8">
						<h1>{category.category[0].categoryName} Posts</h1>

						<section className="category-posts">
						{
							category.categoryPosts.map(post => (
								<div key={post.titleURL} className="category-post">
									<Link href="../{post.titleURL}" as={`../${post.titleURL}`}>
										<a>{post.title}</a>
									</Link>
									<div className="publish-date">
										{post.publishDate}
									</div>
									{post.contentTeaser}
								</div>
							))
						}
						</section>
					</Col>
					<Col xs="12" md="4" className="aside">
						{TopCategories({homeData})}
						{LatestPostsAside({homeData})}
						{LatestComments({homeData})}
					</Col>
				</Row>
			</Container>
		</Layout>
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