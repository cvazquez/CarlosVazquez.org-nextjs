import React from 'react';
import { render, screen, cleanup, fireEvent, waitForElement } from '@testing-library/react';
import {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Index  from '../pages/blog/index';
import NotFound from '../pages/404.js';
import Post from '../pages/blog/[...slug]';

it('blog 404', () => {
	const	{ getByText } = render(<NotFound />),
			header = getByText(/Page Not Found/);

	expect(header).toBeInTheDocument();
});

it('blog home page missing props check', () => {
	const	{ getByText } = render(<Index homeData = {{}} />),
			header = getByText(/Missing Props/);

	expect(header).toBeInTheDocument();
});

it('blog home page H1 check', () => {
	const	topCategories = {},
			{ getByText } = render(<Index homeData = {
				{
					topCategories 		: [],
					latestImagePosts	: [],
					latestSeries		: [],
					latestComments		: [],
					latestImagePosts	: [],
					latestPosts			: []
			}} />),
			header = getByText(/Welcome To My Portfolio And Adventures Blog/);

	expect(header).toBeInTheDocument();
});

it('posts slug missing props check', () => {
	const	{ getByText } = render(<Post />),
			props = getByText(/Missing Props/);

	expect(props).toBeInTheDocument();
});

it('posts slug check with NO slideshow images', () => {
	const	{ getByText } = render(<Post post = {
								{
										blogPost	: [ {
											id		: 1,
											title	: "test",
											content	: '<div class="test">This is test content</div>'
										}],
										flikrImages			: {},
										seriesPosts			: {},
										topCategories 		: [],
										latestImagePosts	: [],
										latestSeries		: [],
										latestComments		: [],
										latestImagePosts	: [],
										latestPosts			: [],
										postComments		: []

							}}/>),
			post = getByText(/This is test content/);

	expect(post).toBeInTheDocument();
	//expect(link.getAttribute('class')).toBe("test");
});