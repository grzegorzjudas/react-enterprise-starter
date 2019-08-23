import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { createMuiTheme } from '@material-ui/core';
import { createStore } from 'redux';

import { App } from './App';
import { HomePage } from '../../pages/HomePage';

const defaultProps = {
    store: createStore(() => ({
        ui: {
            text: 'test'
        }
    })),
    theme: createMuiTheme()
};

function render (props = {}) {
    return mount(<App {...defaultProps} {...props} />);
}

describe('App', () => {
    let component: ReactWrapper;
    let props = {};

    beforeEach(() => component = render(props));

    it('renders home page', () => {
        expect(component.find(HomePage).length).toBe(1);
    });
});
