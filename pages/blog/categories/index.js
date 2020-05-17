import Head from 'next/head'
import fetch from 'node-fetch'
import Link from 'next/link'
import { Container, Row, Col } from 'reactstrap';
import Layout from "../../../components/blog/layouts/Layout";
import Aside from "../../../components/blog/layouts/AsideRight"

export default function Categories({categoryData}) {
	return(
		<Layout>
			<Head>
				<title key="title">Categories - {process.env.global.title}</title>
				<script type="text/javascript" src="/javascripts/tracking.js" defer />
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
						<Aside	topCategories	= {categoryData.topCategories}
								latestPosts		= {categoryData.latestPosts}
								latestComments	= {categoryData.latestComments} />
					</Col>
				</Row>
			</Container>
		</Layout>
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