import Head from 'next/head'
import fetch from 'node-fetch'
import Link from 'next/link'
import { Container, Row, Col } from 'reactstrap';
import TopCategories from '../../../components/blog/topCategories'
import LatestPosts from '../../../components/blog/latestPosts'
import LatestComments from '../../../components/blog/latestComments'
import Layout from "../../../components/blog/layouts/Layout";

function Categories({categoryData}) {
	return(
		<Layout>
			<Head>
				<title key="title">Categories - {process.env.global.title}</title>
			</Head>
			<Container>
				<Row xs="1" lg="2">
					<Col>
						<h1>Categories</h1>
						<section className="categories">
							{categoryData.categories.map(category => (
								<div key={category.nameURL}>
									<p>
										<Link href="/blog/category/[...slug]" as={`/blog/category/${category.nameURL}`}>
											<a>{category.name}</a>
										</Link>
										&nbsp;({category.entryCount})
									</p>
								</div>
							))}
						</section>
					</Col>
					<Col>
						{TopCategories(categoryData.topCategories)}
						{LatestPostsAside(categoryData.latestPosts)}
						<LatestComments latestComments = {categoryData.latestComments} />
					</Col>
				</Row>
			</Container>
		</Layout>
	)
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

export async function getStaticProps() {
	const	categoryRes		= await fetch(`${process.env.global.apiURL}/blog/api/getCategoriesPage`),
			categoryData	= await categoryRes.json();

	return {
		props	: {
					categoryData
		}
	}
}

export default Categories;