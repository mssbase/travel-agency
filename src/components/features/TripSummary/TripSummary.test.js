import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';


describe('Componenet TripSummary', () => {
  it('should render correct link', () => {
    const component = shallow(<TripSummary id='abc' image='image.jpg' tags={[]}/>);
    const expectedLink = '/trip/abc';
    const renderedLink = component.find('.link').prop('to');
    expect(renderedLink).toEqual(expectedLink);
    console.log(component.debug());
  });

  it('it should have correct src and alt', () => {
    const component = shallow(<TripSummary id='abc' image='image.jpg' name='name' tags={[]}/>);
    const expectedImgSrc = 'image.jpg';
    const expectedImgAlt = 'name';
    expect(component.find('img').prop('src')).toEqual(expectedImgSrc);
    expect(component.find('img').prop('alt')).toEqual(expectedImgAlt);
  });

  it('it should render correct props name, cost , days', () => {
    const component = shallow(<TripSummary id='abc' image='image.jpg' name='name' cost='1$' days={2} tags={[]}/>);
    const expectedPropsName = 'name';
    const expectedPropsDays = '2 days';
    const expectedPropsCost = 'from 1$';
    expect(component.find('.title').text()).toEqual(expectedPropsName);
    expect(component.find('.details').childAt(0).text()).toEqual(expectedPropsDays);
    expect(component.find('.details').childAt(1).text()).toEqual(expectedPropsCost);
  });

  it('should throw error without required props', () => {
    expect(() => shallow(<TripSummary/>)).toThrow();
  });

  it('should render span from tags in correct order', () => {
    const component = shallow(<TripSummary tags={['one', 'two', 'three']}/>);
    expect(component.find('.tags').childAt(0).text()).toEqual('one');
    expect(component.find('.tags').childAt(1).text()).toEqual('two');
    expect(component.find('.tags').childAt(2).text()).toEqual('three');
  });
  it('should not render div with class tag when array is not given', () => {
    const component = shallow(<TripSummary image='image.jpg' tags={[]}/>);
    expect(component.find('.tags')).toMatchObject({});
  });

});