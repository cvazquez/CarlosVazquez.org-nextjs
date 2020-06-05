import Link from 'next/link';
import { Badge } from 'reactstrap'

export default ({latestSeries}) => (
		<aside>
			<header>
				<h3>Latest Series</h3>
			</header>
			<ul>
				{latestSeries.map(series => (
					<li key={series.nameURL}>
						<Link href="/blog/series/[.../slug]" as={`/blog/series/${series.nameURL}`}>
							<a>{series.name}</a>
						</Link>
						<Badge pill>{series.entryCount}</Badge>
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