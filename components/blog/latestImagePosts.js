import Link from 'next/link';
import {Badge} from 'reactstrap';

export default ({latestImagePosts}) => (
	<aside>
		<header>
			<h3>Latest Image Posts</h3>
		</header>
		<ul>
			{latestImagePosts.map(post => (
				<li key={post.id}>
					<Link href="/blog/[...slug]" as={`/blog/${post.titleURL}`}>
						<a>{post.title}</a>
					</Link>
					<Badge pill>{post.imageCount}</Badge>
				</li>
			))}

			<li><Link href="/blog/images" as="/blog/images">
					<a>All Image Posts</a>
				</Link>
			</li>
		</ul>
	</aside>
);