import { Container, Row, Col } from 'reactstrap';
import Layout from "../../components/blog/layouts/Layout";
import Aside from "../../components/blog/layouts/AsideRight"
import Head from 'next/head'

export default function Index({homeData}) {
	if(!Object.keys(homeData).length) return <div>Missing Props</div>

	return	<Layout>
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
								<p>My name is Carlos Vazquez, and I am a Full Stack Website Developer.</p>

								<p>I developed this website using the following technologies:</p>
									<ul>
										<li>Javascript / Node.js</li>
										<li>React</li>
										<li>Next.js</li>
										<li>MySQL</li>
										<li>Express</li>
										<li>Bootstrap</li>
										<li>CSS (SASS)</li>
									</ul>

								<p>Links to the code are posted below.</p>

								<h2>Projects</h2>

									<h3>Blog</h3>
									<p>This Blog is built on the Next.js React framework.
										<br />
										[<a href="https://github.com/cvazquez/CarlosVazquez.org-nextjs" target="GitHub-NextJS">code</a>]
									</p>

									<h3>API</h3>
									<p>Using Node.js, Express and MySQL, I created a simple API, that Next.js calls to deliver this blogs content, saves comments, and administers the site.
										<br />
										[<a href="https://github.com/cvazquez/CarlosVazquez.org-ExpressNodeAPI" target="GitHub-API">code</a>].
									</p>

									<h3>Images</h3>
									<p>Posts with an <a href="/blog/images">image slideshow</a>, are hosted on Flickr.</p>

									<p>I created a Node.js script, using oAuth, that communicates with the Flickr API and stores photo data into a MySQL DB.
										<br />
										[<a href="https://github.com/cvazquez/flickr-import" target="GitHub-FlickrImport">code</a>].
									</p>

									<h3>Admin</h3>
									<p>Using "create react app", I built a CMS type admin site, to create and edit these posts, add new categories and series, and link Flickr Albums to Posts.
										The interface uses my API, to read and write data.
										<br />
										[<a href="https://github.com/cvazquez/CarlosVazquez.org-AdminReact" target="GitHub-AdminReact">code</a>].
									</p>


								<h2>Hobbies</h2>
								<p>Outside of coding, I enjoy living an active and healthy lifestyle.</p>

								<p>I like travelling, running, bikng, and other outdoor and physical activites.</p>

								<p>I hope to post about the adventures I've been on, from international vacations, to a 50 mile Ultra Marathon.</p>

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