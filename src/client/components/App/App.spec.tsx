import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import Component from './App';

function renderShallow (props = {}) {
    return shallow(<Component {...props} />);
}

describe('App', () => {
    let component: ShallowWrapper;
    let props = {};

    beforeEach(() => component = renderShallow(props));

    it('renders correctly', () => {
        expect(component.find('div').length).toBe(1);
    });

    it('renders correct content', () => {
        expect(component.find('h1').text()).toBe('Hello world!');
    });
});
