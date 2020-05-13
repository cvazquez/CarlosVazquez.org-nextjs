import TopCategories from "../topCategories"
import LatestPosts from "../latestPosts"
import LatestComments from "../latestComments"

export default class AsideRight extends React.Component {

	LatestPostsAside(latestPosts) {
		return (
			<aside>
				<header>
					<h3>Latest Posts</h3>
				</header>
				<LatestPosts latestPosts = {latestPosts} />
			</aside>
		)
	}

	render() {
		return (
			<div>
				{TopCategories(this.props.topCategories)}
				{this.LatestPostsAside(this.props.latestPosts)}
				<LatestComments latestComments = {this.props.latestComments} />
			</div>
		)
	}
}
