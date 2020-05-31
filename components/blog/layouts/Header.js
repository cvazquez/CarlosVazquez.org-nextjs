// components/Header.js
import { Container, Row, Col } from 'reactstrap';
import Link from "next/link";
import React, {useState, useRef, useEffect} from "react";
import navLinks from './navLinks';

function useOutsideAlerter(ref, setSearchResults, setBackgroundOverlay) {
	useEffect(() => {
		// Alert if clicked on outside of element
		function handleClickOutside(event) {
			(ref.current && !ref.current.contains(event.target)) && clearOverlay(setSearchResults, setBackgroundOverlay);
		}

		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);

		// Unbind the event listener on clean up
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [ref]);
}

function clearOverlay(setSearchResults, setBackgroundOverlay) {
	setSearchResults("");
	setBackgroundOverlay("");
}

function buildResultsOverlay(results, setSearchResults, setBackgroundOverlay) {
	return(
		<div className="search-results-container">
			<div className="close-search-overlay" onClick={() => clearOverlay(setSearchResults, setBackgroundOverlay)}><span className="x">x</span></div>
			<ul className="search-results-overlay">
				{
					results.length ?
					results.map(result => (
						<li key={result.id}>
							<Link href={`/blog/[...slug]`} as={`/blog/${result.value}`}>
								<a>{result.label}</a>
							</Link>
						</li>
					)) : "No Results Founds"
				}
			</ul>
		</div>
	)
}

async function getSearchResults(terms, setSearchResults, setBackgroundOverlay) {
	const	res 			= await fetch(`/api/getSearchResults/${terms}`),
			response		= await res.json(),
			resultsOverlay	= await buildResultsOverlay(response.results, setSearchResults, setBackgroundOverlay);

	setSearchResults(resultsOverlay);
	setBackgroundOverlay("overlay-background");
}

export default function Header({setBackgroundOverlay}) {
	const	[searchResults, setSearchResults] = useState(""),
			wrapperRef = useRef(null);

	useOutsideAlerter(wrapperRef, setSearchResults, setBackgroundOverlay);

	return (
		<div ref={wrapperRef}>
			<Container className="blog-header">
				<Row noGutters>
					<Col xs="12" md="5" lg="3" className="header-logo"><a href="/blog"><img src="/images/logo-transparent.gif" /></a></Col>
					<Col className="d-none d-md-block" md="4" lg="7">
						<ul className="header-nav">
							{navLinks.map(	nav => (
								<li key={nav.id}>
									<Link href={`/blog/category/[...slug]`} as={`/blog/category/${nav.slug}`}>
										<a>{nav.name}</a>
									</Link>
								</li>
							))}
						</ul>
					</Col>
					<Col xs="12" md="3" lg="2">
						<ul className="header-nav">
							<li className="external-links">
								<a href="https://github.com/cvazquez" target="Github-cvazquez">Github <svg className="octicon octicon-mark-github" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg></a>
								<a href="https://www.linkedin.com/in/carlos-vazquez-a5067bb" target="carlos-vazquez-a5067bb">LinkedIn</a>
							</li>
						</ul>
					</Col>
				</Row>

				<Row noGutters>
					<Col className='search-box-container'>
						<form method="get" onSubmit={ (e) => {
							e.preventDefault();

							(e.target.terms.value && e.target.terms.value.length) &&
								getSearchResults(e.target.terms.value, setSearchResults, setBackgroundOverlay);
						} }>
							<input type="text" name="terms" id="search-terms" placeholder="Search" onChange={ (e) => {
								(e.target.value && e.target.value.length) &&
									getSearchResults(e.target.value, setSearchResults, setBackgroundOverlay);
							} } />
						</form>
						{searchResults}
					</Col>
				</Row>
			</Container>
		</div>
	)
}