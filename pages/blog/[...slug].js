// pages/blog/[..slug].js
import { useRouter } from 'next/router'
import fetch from 'node-fetch'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


function Post({ post }) {
	const router = useRouter()

	if(router.isFallback) {
		return <div>Loading...</div>
	}

	return (
		<div>
			{ReactHtmlParser(post.blogPost.content)}
		</div>
	);
}

export async function getStaticPaths() {
  const	res = await fetch("http://dev.react-api.carlosvazquez.org/blog/api/getAllBlogSlugs", {
						method:	'GET',
						cache:	'force-cache'
					}
			),
		posts  = await res.json();

  const paths = posts.blogSlugs.map(post => `/blog/${post.titleURL}`)

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const	res = await fetch(`http://dev.react-api.carlosvazquez.org/blog/api/getPostByTitle/${params.slug}`, {
						method:	'GET',
						cache:	'force-cache'
					}
			),
		post = await res.json();

  return { props: { post } }
}

export default Post