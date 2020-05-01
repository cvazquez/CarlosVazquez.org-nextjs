import Link from 'next/link'

function LatestPosts({homeData}) {
	return (
			<ul className="latest-posts">
				{homeData.latestPosts.map(latestPost => (
					<div key={latestPost.id}>
						<li>
							<Link href="/blog/{latestPost.titleURL}" as={`/blog/${latestPost.titleURL}`}>
								<a>{latestPost.title}</a>
							</Link>
							<br />
							{latestPost.publishDate}
							{latestPost.commentCount > 0 && ` | ${latestPost.commentCount} Comments`}
						</li>
					</div>
				))}
			</ul>
	)
}

export default LatestPosts