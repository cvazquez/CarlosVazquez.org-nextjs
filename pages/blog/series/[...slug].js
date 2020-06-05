import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Container, Row, Col } from 'reactstrap';
import Layout from "../../../components/blog/layouts/Layout";
import fetch from 'node-fetch'
import Aside from "../../../components/blog/layouts/AsideRight"

export default function Series({ seriesEntriesData }) {
	const	router = useRouter();

	if(router.isFallback) {
		return <div>Loading...</div>
	}

	return (
		<Layout>
			<Head>
				<title key="title">{seriesEntriesData.series[0].seriesName} - {process.env.global.title}</title>
				<script type="text/javascript" src="/javascripts/tracking.js" defer />
			</Head>
			<Container>
				<Row>
					<Col xs="12" md="8">
						<h1>{seriesEntriesData.series[0].seriesName} Posts</h1>

						<section className="category-posts">
						{
							seriesEntriesData.series.map(entry => (
								<div key={entry.entryId} className="category-post">
									{<Link href="/blog/[...slug]" as={`/blog/${entry.titleURL}`}>
										<a>{entry.entryTitle}</a>
									</Link>}
									<div className="publish-date">
										{entry.publishDate}
									</div>
									<span className="list-teaser">
										{entry.teaser}
									</span>
								</div>
							))
						}
						</section>
					</Col>
					<Col xs="12" md="4" className="aside">
						<Aside	topCategories		= {seriesEntriesData.topCategories}
								latestPosts			= {seriesEntriesData.latestPosts}
								latestComments		= {seriesEntriesData.latestComments}
								latestSeries		= {seriesEntriesData.latestSeries}
								latestImagePosts	= {seriesEntriesData.latestImagePosts} />
					</Col>
				</Row>
			</Container>
		</Layout>
	);
}

export async function getStaticPaths() {
	const	res		= await fetch(`${process.env.global.apiURL}/blog/api/getSeriesPages`),
			page	= await res.json(),
			paths	= page.series.map(series => `/blog/series/${series.nameURL}`)

	return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
	const	res					= await fetch(`${process.env.global.apiURL}/blog/api/getSeriesPage/${params.slug}`),
			seriesEntriesData	= await res.json();

  return { props: { seriesEntriesData } }
}