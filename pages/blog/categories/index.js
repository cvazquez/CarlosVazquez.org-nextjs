import Head from 'next/head'
import fetch from 'node-fetch'
import Link from 'next/link'
import { Container, Row, Col } from 'reactstrap';
import TopCategories from '../../../components/blog/topCategories'
import LatestPosts from '../../../components/blog/latestPosts'
import LatestComments from '../../../components/blog/latestComments'
import Layout from "../../../components/blog/layouts/Layout";

function Categories({categoryData}) {
	const homeData = categoryData;

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
										<Link href="./category/[...slug]" as={`./category/${category.nameURL}`}>
											<a>{category.name}</a>
										</Link>
										&nbsp;({category.entryCount})
									</p>
								</div>
							))}
						</section>
					</Col>
					<Col>
						{TopCategories({homeData})}
						{LatestPostsAside({homeData})}
						{LatestComments({homeData})}
					</Col>
				</Row>
			</Container>
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

export async function getStaticProps() {
	const	categoryRes		= await fetch("http://dev.react-api.carlosvazquez.org/blog/api/getCategoriesPage", {
								method:	'GET',
								cache:	'force-cache'
			}),
			categoryData	= await categoryRes.json();

	return {
		props	: {
					categoryData
		}
	}
}

export default Categories;