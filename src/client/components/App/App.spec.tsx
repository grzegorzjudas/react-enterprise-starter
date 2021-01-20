import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { createMuiTheme } from '@material-ui/core';
import { createStore } from 'redux';

import { App } from './App';
import { HomePage } from '../../pages/HomePage';
import { StaticRouter } from 'react-router';

const defaultProps = {
    store: createStore(() => ({
        ui: {
            text: 'test'
        }
    })),
    theme: createMuiTheme()
};

function render (props = {}) {
    return mount(<StaticRouter><App {...defaultProps} {...props} /></StaticRouter>);
}

describe('App', () => {
    let component: ReactWrapper;
    const props = {};

    beforeEach(() => {
        component = render(props);
    });

    it('renders home page', () => {
        expect(component.find(HomePage).length).toBe(1);
    });
});
