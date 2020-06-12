import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Container, Row, Col } from 'reactstrap';
import Layout from "../../../components/blog/layouts/Layout";
import Aside from "../../../components/blog/layouts/AsideRight"

export default function Series({ seriesEntriesData }) {
	const	router = useRouter();

	if(router.isFallback) {
		return <div>Loading...</div>
	}

	if(!Object.keys(seriesEntriesData).length) return (<div>Missing Props</div>);

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
	const apiPath = "/blog/api/getSeriesPages";

	try {
		const	res 	= await fetch(process.env.global.apiURL + apiPath),
				page 	= await res.json(),
				paths	= page.series.map(series => `/blog/series/${series.nameURL}`)

		return { paths, fallback: false }
	} catch(e) {
		console.log("ERROR: ${apiPath} request failed");

		return { paths : [], fallback: true }
	}
}

export async function getStaticProps({ params }) {
	const apiPath = `/blog/api/getSeriesPage/${params.slug}`;

	try {
		const	seriesEntriesRes 	= await fetch(process.env.global.apiURL + apiPath),
				seriesEntriesData	= await seriesEntriesRes.json();

		return {
			props	: {
						seriesEntriesData
			}
		}
	} catch(e) {
		console.log(`ERROR: ${apiPath} request failed`);

		return { props: {} }
	}
}