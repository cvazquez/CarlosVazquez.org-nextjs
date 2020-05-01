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
  const	res = await fetch("http://dev.react-api.carlosvazquez.org/blog/api/getPostSlugs", {
						method:	'GET',
						cache:	'force-cache'
					}
			),
		posts  = await res.json();

  const paths = posts.postSlugs.map(post => `/blog/${post.titleURL}`)

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const	res = await fetch(`http://dev.react-api.carlosvazquez.org/blog/api/getPostPageByTitleURL/${params.slug}`, {
						method:	'GET',
						cache:	'force-cache'
					}
			),
		post = await res.json();

  return { props: { post } }
}

export default PostPage