import Link from 'next/link'

export default class LatestComments extends React.Component {
	constructor(props) {
		super();

		this.latestComments = props.latestComments;
	}

	render() {
		return (
			<aside>
				<header>
					<h3>Latest Comments</h3>
				</header>
				<ul className="latest-comments">
					{this.latestComments.map(latestComment => (
						<div key={latestComment.entrydiscussionid}>
							<li>
								<Link href="/blog/[...slug]" as={`/blog/${latestComment.titleURL}`}>
									<a>{latestComment.firstName}</a>
								</Link>
								: {latestComment.commentTeaser}
								<div className="aside-sub-section">
									{latestComment.commentDate}
									{latestComment.replyCount > 0 && ` | ${latestComment.replyCount} Replies`}
								</div>
							</li>
						</div>
					))}
				</ul>
			</aside>
		)
	}
}