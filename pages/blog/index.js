import fetch from 'node-fetch'
import Link from 'next/link'
import { Container, Row, Col } from 'reactstrap';

function Index({homeData}) {
	return (
		<div>
			<div>
				{LatestPosts({homeData})}
			</div>
			<div>
				{TopCategories({homeData})}
			</div>
			<div>
				{LatestComments({homeData})}
			</div>
		</div>
	)
}

function LatestPosts({homeData}) {
	return (
		<div>
				<h2>Latest Posts</h2>
				{homeData.latestPosts.map(latestPost => (
						<div key={latestPost.id}>
							<p>	<Link href="/blog/[slug]" as={`/blog/${latestPost.titleURL}`}>
									<a>{latestPost.title}</a>
								</Link>
								<br />
								{latestPost.publishDate} | Comments {latestPost.commentCount}
								<br />
								{latestPost.contentTeaser}
							</p>
						</div>
					))
				}
		</div>
	)
}

function TopCategories({homeData}) {
	return (
		<div>
			<h2>Top Categories</h2>
			{homeData.topCategories.map(topCategory => (
					<div key={topCategory.id}>
						{	<p>	<Link href="/blog/[slug]" as={`/blog/${topCategory.nameURL}`}>
									<a>{topCategory.name}</a>
								</Link> : ({topCategory.entryCount})
							</p>
						}
					</div>
				))
			}
		</div>
	)
}

function LatestComments({homeData}) {
	return (
		<div>
			<h2>Latest Comments</h2>
			{homeData.latestComments.map(LatestComment => (
					<div key={LatestComment.entrydiscussionid}>
						{	<p>	<Link href="/blog/[slug]" as={`/blog/${LatestComment.titleURL}`}>
									<a>{LatestComment.firstName}</a>
								</Link> : {LatestComment.commentTeaser}
								<br />
								{LatestComment.commentDate} | Replies ({LatestComment.replyCount})<br />
							</p>
						}
					</div>
				))
			}
		</div>
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