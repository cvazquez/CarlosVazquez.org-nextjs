import Head from 'next/head'
import fetch from 'node-fetch'
import Link from 'next/link'

function Categories({categoryData}) {
	return(
		<div>
			<Head>
				<title key="title">Categories - {process.env.global.title}</title>
			</Head>

			{categoryData.categories.map(category => (
				<div key={category.nameURL}>
					<p>
						<Link href="./category/[slug]" as={`./category/${category.nameURL}`}>
							<a>{category.name}</a>
						</Link>
					</p>
				</div>
			))}
		</div>
	)
}

export async function getStaticProps() {
	const	categoryRes		= await fetch("http://dev.react-api.carlosvazquez.org/blog/api/getCategoriesPage", {
								method:	'GET',
								cache:	'force-cache'
			}),
			categoryData	= await categoryRes.json();

	return {
		props	: {
					categoryData
		}
	}
}

export default Categories;