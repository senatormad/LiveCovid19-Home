import React from 'react';
import { render } from '@testing-library/react';
import WorldTotals from './WorldTotals';

test('renders learn react link', () => {
  const { getByText } = render(<WorldTotals />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
