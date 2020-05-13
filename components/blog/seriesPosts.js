import Link from "next/link"

export default class SeriesPosts extends React.Component {
	display(series, originalPostId) {
		let seriesFiltered = series.filter(post => {
			// Filter out original post from series
			return originalPostId !== post.entryId && post
		});

		return (
			<div className="series-posts">
				<h2>Related Posts</h2>
				<ul>
				{	seriesFiltered.map(post => (
						<li key={post.entryId}>
							<Link href="/blog/[...slug]" as={`/blog/${post.titleURL}`}>
								<a>{post.title}</a>
							</Link>
						</li>
					))
				}
				</ul>
			</div>
		)
	}

	render() {
		return (
			<div>
				{this.display(this.props.series, this.props.originalPostId)}
			</div>
		)
	}
}