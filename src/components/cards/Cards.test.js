import React from 'react';
import  { shallow } from 'enzyme';
import Cards from './Cards';
import toJSON from 'enzyme-to-json';

const cards = [
  { id: 1 },
  { id: 2 },
  { id: 3 }
];

describe('Cards', () => {

  it('renders correctly', () => {
    const wrapper = shallow(<Cards cards={cards}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});