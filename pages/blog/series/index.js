import Head from 'next/head'
import fetch from 'node-fetch'
import Link from 'next/link'
import { Container, Row, Col } from 'reactstrap';
import Layout from "../../../components/blog/layouts/Layout";
import Aside from "../../../components/blog/layouts/AsideRight"

export default function Series({seriesData}) {
	return(
		<Layout>
			<Head>
				<title key="title">Series - {process.env.global.title}</title>
				<script type="text/javascript" src="/javascripts/tracking.js" defer />
			</Head>
			<Container>
				<Row xs="1" lg="2">
					<Col>
						<h1>Series</h1>
						<section className="series">
							{seriesData.series.map(series => (
								<div key={series.nameURL} className="series-entry">
									<Link href="/blog/series/[...slug]" as={`/blog/series/${series.nameURL}`}>
										<a>{series.name}</a>
									</Link>
									&nbsp;({series.entryCount})

									<div className="publish-date">
										{series.publishDate}
									</div>
									{series.contentTeaser}
								</div>
							))}
						</section>
					</Col>
					<Col>
						<Aside	topCategories	= {seriesData.topCategories}
								latestPosts		= {seriesData.latestPosts}
								latestComments	= {seriesData.latestComments}
								latestSeries	= {seriesData.latestSeries} />
					</Col>
				</Row>
			</Container>
		</Layout>
	)
}

export async function getStaticProps() {
	const	seriesRes	= await fetch(`${process.env.global.apiURL}/blog/api/getSeriesPages`),
			seriesData	= await seriesRes.json();

	return {
		props	: {
				seriesData
		}
	}
}