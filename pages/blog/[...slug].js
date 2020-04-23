// pages/posts/[id].js
import fetch from 'node-fetch'

function Post({ post }) {
  // Render post...

  return (
	  <div>
		  {post.blogPost.content}
	  </div>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const	res = await fetch("http://dev.react-api.carlosvazquez.org/blog/api/getAllBlogSlugs", {
						method:	'GET',
						cache:	'force-cache'
					}
			),
		posts  = await res.json();

//console.log(posts)

  // Get the paths we want to pre-render based on posts
  const paths = posts.blogSlugs.map(post => `/blog/${post.titleURL}`)

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  /* const res = await fetch(`https://.../posts/${params.id}`)
  const post = await res.json() */

  const	res = await fetch(`http://dev.react-api.carlosvazquez.org/blog/api/getPostByTitle/${params.slug}`, {
						method:	'GET',
						cache:	'force-cache'
					}
			),
		post = await res.json();

  // Pass post data to the page via props
  return { props: { post } }
}

export default Post