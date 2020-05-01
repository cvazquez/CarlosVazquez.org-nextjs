// components/Header.js
import { Container, Row, Col } from 'reactstrap';

const Header = () => (
	<div className="blog-header">
		<Container>
			<Row>
				<Col xs="12" md="5" lg="3" className="header-logo"><a href="/blog"><img src="/images/logo.gif" /></a></Col>
				<Col xs="12" md="7" lg="9">
					<ul className="header-nav">
						<li><a href="/blog/category/Travel">Travel</a></li>
						<li><a href="/blog/category/Fitness-And-Health">Fitness/Health</a></li>
						<li><a href="/blog/category/Random-Ramblings">Random</a></li>
						<li><a href="/blog/category/Website-Development">Developer</a></li>
						<li><a href="/blog/category/Portfolio">Portfolio</a></li>
						<li className="external-links">
							<a href="https://github.com/cvazquez" target="Github-cvazquez">Github <svg className="octicon octicon-mark-github" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg></a>
							<a href="https://www.linkedin.com/in/carlos-vazquez-a5067bb" target="carlos-vazquez-a5067bb">LinkedIn</a>
						</li>
					</ul>
				</Col>
			</Row>
		</Container>
	</div>
);

export default Header;