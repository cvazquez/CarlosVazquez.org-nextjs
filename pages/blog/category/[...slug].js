// pages/blog/category/[..slug].js
import Head from 'next/head'
import { useRouter } from 'next/router'
import fetch from 'node-fetch'
import Link from 'next/link'

function Categories({ category }) {
	const router = useRouter()

	if(router.isFallback) {
		return <div>Loading...</div>
	}

	return (
		<div>
			<Head>
				<title key="title">{category.category[0].categoryName} - {process.env.global.title}</title>
			</Head>
			<h1>{category.category[0].categoryName} Posts</h1>
			{
				category.categoryPosts.map(post => (
					<div key={post.titleURL}>
						<p>
							<Link href="../{post.titleURL}" as={`../${post.titleURL}`}>
								<a>{post.title}</a>
							</Link>
							<br/>
							{post.publishDate}
							<br />
							{post.contentTeaser}
						</p>
					</div>
				))
			}
		</div>
	);
}

export async function getStaticPaths() {
  const	res = await fetch("http://dev.react-api.carlosvazquez.org/blog/api/getCategoriesPage", {
						method:	'GET',
						cache:	'force-cache'
					}
			),
		page  = await res.json();

  const paths = page.categories.map(category => `/blog/category/${category.nameURL}`)

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const	res = await fetch(`http://dev.react-api.carlosvazquez.org/blog/api/getCategoryPageByName/${params.slug}`, {
						method:	'GET',
						cache:	'force-cache'
					}
			),
		category = await res.json();

  return { props: { category } }
}

export default Categories