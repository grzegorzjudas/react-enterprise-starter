import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { HomePage } from './HomePage';
import { Card, Typography } from '@material-ui/core';

const defaultProps = {
    text: 'test'
};

function renderShallow (props = {}) {
    return shallow(<HomePage {...defaultProps} {...props} />);
}

describe('HomePage', () => {
    let component: ShallowWrapper;
    const props = {};

    beforeEach(() => {
        component = renderShallow(props);
    });

    it('renders correctly', () => {
        expect(component.find(Card).length).toBe(1);
    });

    it('renders correct content', () => {
        expect(component.find(Typography).at(0).text()).toBe(defaultProps.text);
    });
});
