import Link from 'next/link';
import {Container, Row, Col, Badge} from 'reactstrap'
import Layout from '../../../components/blog/layouts/Layout'
import Head from 'next/head'
import Aside from "../../../components/blog/layouts/AsideRight"
import fetch from 'node-fetch'

export default ({imagePosts}) => (
	<Layout>
		<Head>
			<title key="title">Posts with Images - {process.env.global.title}</title>
			<script type="text/javascript" src="/javascripts/tracking.js" defer />
		</Head>
		<Container>
			<Row xs="1" lg="2">
				<Col>
					<h1>Posts With Images</h1>
					<section className="image-posts">
						<ul>
							{imagePosts.imagePosts.map(imagePost => (
								<li key={imagePost.id} className="image-post-entry">
									<Link href="/blog/[...slug]" as={`/blog/${imagePost.titleURL}`}>
										<a>{imagePost.title}</a>
									</Link>
									<Badge pill>{imagePost.imageCount}</Badge>
									<div className="publish-date">
										{imagePost.publishDate}
									</div>
									<span className="list-teaser">{imagePost.teaser}</span>
								</li>
							))}
						</ul>
					</section>
				</Col>
				<Col>
					<Aside	topCategories		= {imagePosts.topCategories}
							latestPosts			= {imagePosts.latestPosts}
							latestComments		= {imagePosts.latestComments}
							latestSeries		= {imagePosts.latestSeries}
							latestImagePosts	= {imagePosts.latestImagePosts} />
				</Col>
			</Row>
		</Container>
	</Layout>
);

export async function getStaticProps() {
	const	imageRes	= await fetch(`${process.env.global.apiURL}/blog/api/getImagePosts`),
			imagePosts	= await imageRes.json();

	return {
		props	: {
			imagePosts
		}
	}
}