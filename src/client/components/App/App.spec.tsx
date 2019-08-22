import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import Component from './App';
import { Card, Typography } from '@material-ui/core';

function renderShallow (props = {}) {
    return shallow(<Component {...props} />);
}

describe('App', () => {
    let component: ShallowWrapper;
    let props = {};

    beforeEach(() => component = renderShallow(props));

    it('renders correctly', () => {
        expect(component.find(Card).length).toBe(1);
    });

    it('renders correct content', () => {
        expect(component.find(Typography).at(0).text()).toBe('Hello world!');
    });
});
