// pages/blog/category/[..slug].js
import Head from 'next/head'
import { useRouter } from 'next/router'
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
									<Link href="../[...slug]" as={`../${post.titleURL}`}>
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



export default Categories