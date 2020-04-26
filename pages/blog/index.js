import Head from 'next/head'
import fetch from 'node-fetch'
import { Container, Row, Col } from 'reactstrap';
import TopCategories from '../../components/blog/topCategories'
import LatestPosts from '../../components/blog/latestPosts'
import LatestComments from '../../components/blog/latestComments'

function Index({homeData}) {
	return (
		<main>
			<Head>
				<title>{process.env.global.title}</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>

			<Container>
				<Row>
					<Col>
						{LatestPostsMain({homeData})}
					</Col>
					<Col>
						{TopCategories({homeData})}
						{LatestPostsAside({homeData})}
						{LatestComments({homeData})}
					</Col>
				</Row>
			</Container>
		</main>
	)
}

function LatestPostsMain({homeData}) {
	return (
		<article>
			<header>
				<h1>Latest Posts</h1>
			</header>
			{LatestPosts({homeData})}
		</article>
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
	const	homeRes = await fetch("http://dev.react-api.carlosvazquez.org/blog/api", {
						method:	'GET',
						cache:	'force-cache'
					}
			),
			homeData = await homeRes.json();

	return {
		props:	{
			homeData,
		}
	}
}

export default Index;