// pages/blog/[..slug].js
import fetch from 'node-fetch'
import Post from '../../components/blog/post'
import Layout from "../../components/blog/layouts/Layout";


function PostPage({ post }, props) {

	return (
		<Layout>
			<Post	post	= {post}
					props	= {props}/>
		</Layout>
	)
}


export async function getStaticPaths() {
	const	res = await fetch(`${process.env.global.apiURL}/blog/api/getPostSlugs`),
			posts  = await res.json(),
			paths = posts.postSlugs.map(post => `/blog/${post.titleURL}`);

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
	const	res = await fetch(`${process.env.global.apiURL}/blog/api/getPostPageByTitleURL/${params.slug}`),
			post = await res.json();

  return { props: { post } }
}

export default PostPage