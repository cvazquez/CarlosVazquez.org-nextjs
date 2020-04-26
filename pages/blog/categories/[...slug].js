// pages/blog/[..slug].js
import { useRouter } from 'next/router'
import fetch from 'node-fetch'

function Categories({ category }) {
	const router = useRouter()

	if(router.isFallback) {
		return <div>Loading...</div>
	}

	return (
		<div>
			{category.category[0].categoryName}
		</div>
	);
}

export async function getStaticPaths() {
  const	res = await fetch("http://dev.react-api.carlosvazquez.org/blog/api/getCategoriesPage", {
						method:	'GET',
						cache:	'force-cache'
					}
			),
		categories  = await res.json();

  const paths = categories.map(category => `/blog/category/${category.nameURL}`)

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