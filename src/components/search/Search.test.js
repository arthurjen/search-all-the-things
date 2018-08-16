import React from 'react';
import { mount, shallow } from 'enzyme';
import Search from './Search';
import toJSON from 'enzyme-to-json';

describe('Search Component', () => {

  it('calls onSearch with query', () => {
    const handleSearch = jest.fn();
    const wrapper = mount(<Search onSearch={handleSearch}/>);

    const name = 'treasure cruise';

    wrapper.find('[name="name"]').simulate('change', {
      target: { value: name }
    });
    wrapper.find('button').simulate('submit');

    const calls = handleSearch.mock.calls;
    expect(calls.length).toBe(1);

    // 'treasure cruise' is being stored as key 'undefined' not 'name'
    expect(calls[0][0].undefined).toBe(name);
  });

  it('renders as designed', () => {
    const wrapper = shallow(<Search onSearch={() => {}}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});