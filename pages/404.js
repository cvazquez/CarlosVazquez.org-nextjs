// pages/404.js
import Head from 'next/head'
import Layout from "../components/blog/layouts/Layout";

export default function Custom404() {
	return (
		<Layout>
			<Head>
				<title key="title">Page Not Found - {process.env.global.title}</title>
			</Head>

			<h1>Page Not Found</h1>
		</Layout>
	)
}