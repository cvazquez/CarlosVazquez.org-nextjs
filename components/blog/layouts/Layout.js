// components/Layout.js
import Head from 'next/head'
import Header from "./Header";
import NavBar from "./NavBar";
import React, {useState} from "react";


const layout = props => {
	let [backgroundOverlay, setBackgroundOverlay] = useState("");

	return	(
		<div className={backgroundOverlay}>
			<Head>
				<title>{process.env.NEXT_PUBLIC_TITLE}</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>

			<NavBar />
			<Header setBackgroundOverlay = {setBackgroundOverlay} />
				<div className="Content">
					{props.children}
				</div>

		</div>
	)
}

export default layout;