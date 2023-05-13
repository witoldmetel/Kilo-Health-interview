import React from 'react';
import { DemoView } from '@containers/DemoFlow';
import { ScrollView } from 'react-native';
import { shallow } from 'enzyme';

describe('<Demo />', () => {
  it('renders ScrollView', () => {
    const wrapper = shallow(<DemoView />);
    expect(wrapper.find(ScrollView).exists()).toBe(true);
  });
});
