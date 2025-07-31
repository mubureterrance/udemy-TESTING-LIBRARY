import React from 'react';
import { render } from '@testing-library/react';
import App from '../../App';
import { describe, it } from 'vitest';

describe('<App /> tests', () => {
    it('renders <App />', () => {
        render(<App />);
    });
});