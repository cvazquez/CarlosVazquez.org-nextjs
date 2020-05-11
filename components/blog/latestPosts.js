import Link from 'next/link'

function LatestPosts({homeData}) {
	return (
			<div className="latest-posts">
				<ul>
					{homeData.latestPosts.map(latestPost => (
						<div key={latestPost.id}>
							<li>
								<Link href="/blog/[...slug]" as={`/blog/${latestPost.titleURL}`} passHref>
									<a>{latestPost.title}</a>
								</Link>

								<div className="aside-sub-section">
									{latestPost.publishDate}
									{latestPost.commentCount > 0 && ` | ${latestPost.commentCount} Comments`}
								</div>
							</li>
						</div>
					))}
				</ul>
			</div>
	)
}

export default LatestPosts