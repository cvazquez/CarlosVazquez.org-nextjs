import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Container, Row, Col } from 'reactstrap';
import Layout from "../../../components/blog/layouts/Layout";
import fetch from 'node-fetch'
import Aside from "../../../components/blog/layouts/AsideRight"

export default function Categories({ categoryData }) {
	const	router = useRouter();

	if(router.isFallback) {
		return <div>Loading...</div>
	}

	return (
		<Layout>
			<Head>
				<title key="title">{categoryData.category[0].categoryName} - {process.env.global.title}</title>
			</Head>
			<Container>
				<Row>
					<Col xs="12" md="8">
						<h1>{categoryData.category[0].categoryName} Posts</h1>

						<section className="category-posts">
						{
							categoryData.categoryPosts.map(post => (
								<div key={post.titleURL} className="category-post">
									<Link href="/blog/[...slug]" as={`/blog/${post.titleURL}`}>
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
						<Aside	topCategories	= {categoryData.topCategories}
								latestPosts		= {categoryData.latestPosts}
								latestComments	= {categoryData.latestComments} />
					</Col>
				</Row>
			</Container>
		</Layout>
	);
}

export async function getStaticPaths() {
	const	res		= await fetch(`${process.env.global.apiURL}/blog/api/getCategoriesPage`),
			page	= await res.json(),
			paths	= page.categories.map(category => `/blog/category/${category.nameURL}`)

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
	const	res				= await fetch(`${process.env.global.apiURL}/blog/api/getCategoryPageByName/${params.slug}`),
			categoryData	= await res.json();

  return { props: { categoryData } }
}