// components/Layout.js
import Head from 'next/head'
import Header from "./Header";
import NavBar from "./NavBar";
import React, {useState} from "react";


const layout = props => {
	const	[backgroundOverlay, setBackgroundOverlay] = useState(""),
			title = process.env.NEXT_PUBLIC_TITLE || (process.env.global && process.env.global.title ? process.env.global.title : '');

	return	<div className={backgroundOverlay}>
				<Head>
					<title>{title}</title>
					<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				</Head>

				<NavBar />
				<Header setBackgroundOverlay = {setBackgroundOverlay} />
					<div className="Content">
						{props.children}
					</div>
			</div>
}

export default layout;