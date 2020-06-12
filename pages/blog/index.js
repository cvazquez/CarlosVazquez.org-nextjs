import { Container, Row, Col } from 'reactstrap';
import Layout from "../../components/blog/layouts/Layout";
import Aside from "../../components/blog/layouts/AsideRight"
import Head from 'next/head'

export default function Index({homeData}) {
	if(!Object.keys(homeData).length) return (<div>Missing Props</div>)

	return (
		<Layout>
			<Head>
				{/* <script type="text/javascript" src="/javascripts/tracking.js" defer /> */}
			</Head>
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
						<Aside	topCategories		= {homeData.topCategories}
								latestPosts			= {homeData.latestPosts}
								latestComments		= {homeData.latestComments}
								latestSeries		= {homeData.latestSeries}
								latestImagePosts	= {homeData.latestImagePosts} />
					</Col>
				</Row>
			</Container>
		</Layout>
	)
}

export /* async */ function getStaticProps() {
	const apiURL = "/blog/api";
	// ASYNC VERSION
	/* const	homeRes = await fetch(process.env.global.apiURL + apiURL`),
			homeData = await homeRes.json();


	return {
		props:	{
			homeData,
		}
	} */

	// Promise Version
	return new Promise((resolve, reject) => {
		fetch(process.env.global.apiURL + apiURL)
			.then(res => res.json())
			.then(
				result => resolve({
						props:	{
							homeData : result
						}
					}),
				error => {
					console.log(error);
					reject(`RESULT ERROR: ${apiURL} request failed!`);
				}
			).catch( err => {
					console.log(err);
					console.log(`CATCH ERROR: ${apiURL} request failed!`);

					return ({
						props:	{
							homeData : {}
						}
					})
				}
			)
	}).catch(err => {
		console.log("Promise Catch");
		console.log(err);

		return ({
			props:	{
				homeData : {}
			}
		})
	})
}