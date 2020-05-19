import Link from 'next/link'
import {Component} from 'react'

export default class LatestPosts extends Component {
	render() {
		return (
				<div className="latest-posts">
					<ul>
						{this.props.latestPosts.map(latestPost => (
							<li key={latestPost.id}>
								<Link href="/blog/[...slug]" as={`/blog/${latestPost.titleURL}`}>
									<a>{latestPost.title}</a>
								</Link>

								<div className="aside-sub-section">
									{latestPost.publishDate}
									{latestPost.commentCount > 0 && ` | ${latestPost.commentCount} Comments`}
								</div>
							</li>
						))}
					</ul>
				</div>
		)
	}
}