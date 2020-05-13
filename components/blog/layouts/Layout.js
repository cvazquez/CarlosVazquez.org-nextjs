// components/Layout.js
import Head from 'next/head'
import Header from "./Header";
import NavBar from "./NavBar";

export default props => (
  <div className="Layout">
	<Head>
		<title>{process.env.global.title}</title>
		<meta name="viewport" content="initial-scale=1.0, width=device-width" />
	</Head>

    <Header />
    <div className="Content">
      {props.children}
    </div>
    <NavBar />
  </div>
);