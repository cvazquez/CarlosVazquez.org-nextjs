import Link from 'next/link'

function LatestComments({homeData}) {
	return (
		<aside>
			<header>
				<h3>Latest Comments</h3>
			</header>
			<ul className="latest-comments">
				{homeData.latestComments.map(latestComment => (
					<div key={latestComment.entrydiscussionid}>
						<li>
							<Link href="/blog/{latestComment.titleURL}" as={`/blog/${latestComment.titleURL}`}>
								<a>{latestComment.firstName}</a>
							</Link>
							: {latestComment.commentTeaser}
							<br />
							{latestComment.commentDate} | Replies ({latestComment.replyCount})
						</li>
					</div>
				))}
			</ul>
		</aside>
	)
}

export default LatestComments