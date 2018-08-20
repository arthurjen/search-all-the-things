import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';
import toJSON from 'enzyme-to-json';

describe('Header', () => {

  it('renders correctly', () => {
    const wrapper = shallow(<Header onSearch={() => {}}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  
});