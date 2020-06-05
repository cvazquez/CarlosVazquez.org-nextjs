import Link from 'next/link';

export default ({latestSeries}) => (
		<aside>
			<header>
				<h3>Latest Series</h3>
			</header>
			<ul>
				{latestSeries.map(series => (
					<li key={series.nameURL}>
						{series.name}
					</li>
				))}
				<li>
					<Link href="/blog/series" as={`/blog/series`}>
						<a>All Series</a>
					</Link>
				</li>
			</ul>
		</aside>
	);