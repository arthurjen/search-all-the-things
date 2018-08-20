import React from 'react';
import { mount, shallow } from 'enzyme';
import Search from './Search';
import toJSON from 'enzyme-to-json';
jest.mock('../api');

describe('Search Component', () => {

  it.skip('calls onSearch with query', () => {
    const sets = [{
      name: 'Khans of Tarkir',
      code: 'KTK'
    }];
    const getSets = () => {
      return Promise.resolve(sets);
    };
    const history = {};
    const location = {};

    const wrapper = mount(<Search location={location} history={history}/>);

    //   const name = 'treasure cruise';

    //   wrapper.find('[name="name"]').simulate('change', {
    //     target: { name: 'name', value: name }
    //   });
    //   wrapper.find('button').simulate('submit');

  
  });

  it.skip('renders as designed', () => {
    const wrapper = mount(<Search location={location} history={history}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('sets the sate componentDidMount', () => {
    window.fetch = jest.fn().mockImplementation(() => ({
      status: 200,
      json: () => new Promise((resolve, reject) => {
        resolve([{  
          name: 'Khans of Tarkir',
          code: 'KTK'  
        }]
        );        
      })
    }));
  });
});