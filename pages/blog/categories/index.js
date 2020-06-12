import Head from 'next/head'
import Link from 'next/link'
import { Container, Row, Col, Badge } from 'reactstrap';
import Layout from "../../../components/blog/layouts/Layout";
import Aside from "../../../components/blog/layouts/AsideRight"

export default function Categories({categoryData}) {

	if(!Object.keys(categoryData).length) return (<div>Missing Props</div>);

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
						<section className="categories category-posts">
							<ul>
								{categoryData.categories.map(category => (
									<li key={category.nameURL} className="category">
										<Link href="/blog/category/[...slug]" as={`/blog/category/${category.nameURL}`}>
											<a>{category.name}</a>
										</Link>
										<Badge pill>{category.entryCount}</Badge>
										<div className="list-teaser">
											{category.teaser}
										</div>
									</li>
								))}
							</ul>
						</section>
					</Col>
					<Col>
						<Aside	topCategories		= {categoryData.topCategories}
								latestPosts			= {categoryData.latestPosts}
								latestComments		= {categoryData.latestComments}
								latestSeries		= {categoryData.latestSeries}
								latestImagePosts	= {categoryData.latestImagePosts}  />
					</Col>
				</Row>
			</Container>
		</Layout>
	)
}

export async function getStaticProps() {
	const apiPath = "/blog/api/getCategoriesPage";

	try {
		const	categoryRes 	= await fetch(process.env.global.apiURL + apiPath),
				categoryData	= await categoryRes.json();

		return {
			props	: {
						categoryData
			}
		}
	} catch(e) {
		console.log(`ERROR: ${apiPath} request failed`);

		return { props: {} }
	}
}