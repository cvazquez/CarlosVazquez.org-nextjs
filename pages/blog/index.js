import fetch from 'node-fetch'
import { Container, Row, Col } from 'reactstrap';
import LatestPosts from '../../components/blog/latestPosts'
import Layout from "../../components/blog/layouts/Layout";
import Aside from "../../components/blog/layouts/AsideRight"

export default function Index({homeData}) {
	return (
		<Layout>
			<Container>
				<Row>
					<Col xs="12" md="8">
						<main>
							<header>
								<h1>Welcome To My Portfolio And Adventures Blog</h1>
							</header>

							<article>
								<p>My name is Carlos and I am a FullStack Website Developer. I developed this website using React and Node.js, on the Next.JS framework.
									And I created a simple Node.JS Express API communicating with MySQL, where these blog posts are stored.</p>
								<p>I plan to showcase projects I developed during my career as a FullStack Website Developer, in addition to personal projects, including the code for this blog.</p>
								<p>Outside of coding, I enjoy living an active and healthy lifestyle, through travelling, running, bikng, and other outdoor and physical activites. I will try to post about the various adventures I've been on, from international vacations to a 50 mile Ultra Marathon.</p>
								<p>Checkout my various blog post categories and latest blogs for more information.</p>
							</article>
						</main>
					</Col>
					<Col xs="12" md="4" className="aside">
						<Aside	topCategories	= {homeData.topCategories}
								latestPosts		= {homeData.latestPosts}
								latestComments	= {homeData.latestComments} />
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
	const	homeRes = await fetch(`http://dev.react-api.carlosvazquez.org/blog/api`),
			homeData = await homeRes.json();

	return {
		props:	{
			homeData,
		}
	}
}