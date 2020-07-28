import React from 'react';
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react';
import Index  from '../index';

it('blog home page renders without crashing', () => {
	const topCategories = {};

	render(<Index homeData = {topCategories} />, <div />);
});

