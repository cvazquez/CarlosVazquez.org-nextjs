import Link from "next/link"

class SeriesPosts extends React.Component {
	constructor ({series, originalPostId}) {
		super();

		this.series = series;
		this.originalPostId = originalPostId;
	}

	display(series, originalPostId) {
		// Filter out original post from series
		let seriesFiltered = series.filter(post => {
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
				{this.display(this.series, this.originalPostId)}
			</div>
		)
	}
}

export default SeriesPosts