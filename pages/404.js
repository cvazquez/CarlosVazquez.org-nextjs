// pages/404.js
import Head from 'next/head'
import Layout from "../components/blog/layouts/Layout";

const Custom404 = () =>
		<Layout>
			<Head>
				<title key="title">Page Not Found - {process.env.Title}</title>
				<script type="text/javascript" src="/javascripts/tracking.js" defer />
			</Head>

			<h1>Page Not Found</h1>
		</Layout>

export default Custom404