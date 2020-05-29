import Link from "next/link"
import { Badge } from 'reactstrap'

export default function TopCategories(topCategories) {
	return (
		<aside>
			<header>
				<h3>Top Categories</h3>
			</header>
			<ul className="top-categories">
				{topCategories.map(category => (
					<li key={category.id}>
						<div>
							<Link href={`/blog/category/[...slug]`} as={`/blog/category/${category.nameURL}`}>
								<a>{category.name}</a>
							</Link>
							<Badge pill>{category.entryCount}</Badge>
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