import React from 'react';
import  { shallow } from 'enzyme';
import Card from './Card';
import toJSON from  'enzyme-to-json';

const card = {
  'source': {
    'id': null,
    'name': 'magic.com'
  },
  'imageUrl': 'image.jpg',
  'name': 'Adorable Kitten',
  'setName': 'set name'
};

describe('Card', () => {

  it('renders card correctly', () => {
    const wrapper = shallow(<Card card={card}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});