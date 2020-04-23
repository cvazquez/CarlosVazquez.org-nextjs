import fetch from 'node-fetch'
import Link from 'next/link'

function HomePage({homeData}) {
	return (
			<div>
					{homeData.latestBlogs.map(latestBlog => (
							<div key={latestBlog.id}>
								<p>	<Link href="/blog/[slug]" as={`/blog/${latestBlog.titleURL}`}>
										<a>{latestBlog.title}</a>
									</Link>
									<br />
									{latestBlog.contentTeaser}<br />
								</p>
							</div>
						))
					}
			</div>
	)
}

export async function getStaticProps() {
	const	res = await fetch("http://dev.react-api.carlosvazquez.org/blog/api", {
						method:	'GET',
						cache:	'force-cache'
					}
			),
			homeData = await res.json();

	return {
		props:	{
			homeData,
		}
	}
}

export default HomePage;