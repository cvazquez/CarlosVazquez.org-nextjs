import fetch from 'node-fetch'
import { Container, Row, Col } from 'reactstrap';
import TopCategories from '../../components/blog/topCategories'
import LatestPosts from '../../components/blog/latestPosts'
import LatestComments from '../../components/blog/latestComments'
import Layout from "../../components/blog/layouts/Layout";

function Index({homeData}) {
	console.log(homeData)
	return (
		<Layout>
			<Container>
				<Row>
					<Col xs="12" md="8">
						<main>
							<header>
								<h1>Welcome To My Portfolio</h1>
							</header>

							<article>
								<p>My name is Carlos and I am a FullStack Website Developer. Outside of coding, I enjoy living an active and healthy lifestyle, through travelling, running, bikng, and other outdoor and physical activites.</p>
								<p>I developed this website using React and Node.js, on the Next.JS framework.
									And I created a simple Node.JS Express API communicating with MySQL, where these blog posts are stored.</p>
								<p>I plan to showcase projects I developed during my career as a FullStack Website Developer, in addition to personal projects, including the code for this blog.</p>
								<p>I also post about the various adventures I've been on, from international vacations to a 50 mile Ultra Marathon.</p>
								<p>Checkout my various blog post categories and latest blogs for more information.</p>
							</article>
						</main>
					</Col>
					<Col xs="12" md="4" className="aside">
						{TopCategories({homeData})}
						{LatestPostsAside({homeData})}
						{LatestComments({homeData})}
					</Col>
				</Row>
			</Container>
		</Layout>
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