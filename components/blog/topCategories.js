import Link from "next/link"

function TopCategories({homeData}) {
	return (
		<aside>
			<header>
				<h3>Top Categories</h3>
			</header>
			<ul className="top-categories">
				{homeData.topCategories.map(category => (
					<li key={category.id}>
						<div>
							<Link href={`/blog/category/[...slug]`} as={`/blog/category/${category.nameURL}`}>
								<a>{category.name}</a>
							</Link>
							&nbsp;({category.entryCount})
						</div>
					</li>
				))}
				<li>
					<Link href="/blog/categories" as={`/blog/categories`}>
						<a>All Categories</a>
					</Link>
				</li>
			</ul>
		</aside>
	)
}

export default TopCategories