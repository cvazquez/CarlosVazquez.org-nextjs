import CategoryPage from './index'
import fetch from 'node-fetch'

export async function getStaticPaths() {
	const	res = await fetch("http://dev.react-api.carlosvazquez.org/blog/api/getCategoriesPage"),
			page  = await res.json(),
			paths = page.categories.map(category => `/blog/category/${category.nameURL}`)

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

export default CategoryPage