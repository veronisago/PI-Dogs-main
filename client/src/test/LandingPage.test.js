import React from 'react';
import Enzyme from 'enzyme';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import LandingPage from '../components/LandingPage/LandingPage';


Enzyme.configure({ adapter: new Adapter() })

describe('<LandingPage />', () => {
    let wrapper;
    beforeAll(function () {
        wrapper = shallow(<LandingPage />);
    });
    it('Contains a h1 with a welcome message', () => {
        expect(wrapper.contains(<h1>Welcome!!</h1>)).equal(true)
    });
    it('Contains a image element', () => {
        let img = wrapper.find('img')
        expect(img.length).equal(2)
    });

});