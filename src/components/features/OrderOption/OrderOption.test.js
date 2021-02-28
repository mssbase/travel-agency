import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from './OrderOption';


describe('Component OrderOption', () => {
  it('should render without crashing', () => {
    const component = shallow(<OrderOption name='name' type='dropdown'/>);
    expect(component).toBeTruthy();
    console.log(component.debug());
  });

  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });

  it('should return prop name in title', () =>{
    const component = shallow(<OrderOption name='name' type='dropdown' />);
    expect(component.find('.title').text()).toEqual('name');
  });
});

const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};
const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0},
    {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100},
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};

const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: {currentValue: [mockProps.currentValue]},
  number: {currentValue: 1},
  text: {},
  date: {
    currentValue: 'aaa',
  },
};

const testValue = mockProps.values[1].id;
const testValueNumber = 3;


for(let type in optionTypes){
  describe(`Component OrderOption with type=${type}`, () => {
    /* test setup */
    let component;
    let subcomponent;
    let renderedSubcomponent;
    let mockSetOrderOption;

    beforeEach(() => {
      mockSetOrderOption = jest.fn();
      component = shallow(
        <OrderOption
          type={type}
          setOrderOption={mockSetOrderOption}
          {...mockProps}
          {...mockPropsForType[type]}
        />
      );
      subcomponent = component.find(optionTypes[type]);
      renderedSubcomponent = subcomponent.dive();
    });

    /* common tests */
    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
    });

    /* type-specific tests */
    switch (type) {
      case 'dropdown': {
        /* tests for dropdown */
        it('contains select and options', () => {
          const select = renderedSubcomponent.find('select');
          expect(select.length).toBe(1);

          const emptyOption = select.find('option[value=""]').length;
          expect(emptyOption).toBe(1);

          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({[mockProps.id]: testValue});
        });
        break;
      }

      case 'icon': {
        it('contains div and icon ', () => {
          const div = renderedSubcomponent.find('div').at(0);
          expect(div.length).toBe(1);

          const emptyIcon = renderedSubcomponent.find('Icon').not('[name="h-square"]').length;
          expect(emptyIcon).toBe(1);

          const firstIconDiv = div.childAt(1);
          const secondIconDiv = div.childAt(2);
          expect(firstIconDiv.length + secondIconDiv.length).toBe(mockProps.values.length);
          expect(firstIconDiv.text()).toEqual(expect.stringContaining(mockProps.values[0].name));
          expect(secondIconDiv.text()).toEqual(expect.stringContaining(mockProps.values[1].name));

        });
        it('should run setOrderOption function on change', () => {
          const div = renderedSubcomponent.find('div').at(3);
          div.simulate('click');
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({[mockProps.id]: testValue});
        });
        break;
      }
      case 'checkboxes' : {
        /* test for chekboxes */
        it('contains div with inputs inside', () => {
          const div = renderedSubcomponent.find('div');
          expect(div.length).toBe(1);

          const inputs = div.find('input');
          expect(inputs.length).toBe(mockProps.values.length);
          expect(inputs.at(0).prop('type')).toEqual('checkbox');
          expect(inputs.at(1).prop('type')).toEqual('checkbox');

          expect(inputs.at(0).prop('value')).toEqual(mockProps.values[0].id);
          expect(inputs.at(1).prop('value')).toEqual(mockProps.values[1].id);
        });
        /* testy interaktywne do zrobienia */
        it('should run setOrderOption function on change', () => {
          const div = renderedSubcomponent.find('div');
          (div.childAt(1).find('input')).simulate('change', {currentTarget: {checked: true}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({[mockProps.id]: [mockProps.currentValue, testValue]});
        });
        break;
      }

      case 'number' : {
        /* tests for number */
        it('contains div with input inside', () => {
          const div = renderedSubcomponent.find('div');
          const input = div.find('input');
          expect(input.prop('value')).toEqual(mockPropsForType.number.currentValue);
          expect(input.prop('min')).toEqual(mockProps.limits.min);
        });
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValueNumber}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({[mockProps.id]: testValueNumber});
        });
        break;
      }

      case 'text' : {
        /* tests for text */
        it('contains div with input inside', () => {
          const div = renderedSubcomponent.find('div');
          const input = div.find('input');
          expect(input.prop('placeholder')).toEqual(mockProps.name);
          expect(input.prop('type')).toEqual('text');
        });
        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({[mockProps.id]: testValue});
        });
        break;
      }

      case 'date' : {
        /* tests for date */
        it('contains div with DatePicker inside', () => {
          const datePickerParent = renderedSubcomponent.find('div');
          expect(datePickerParent.childAt(0).prop('selected')).toEqual(mockPropsForType.date.currentValue);
        });
        it('should run setOrderOption function on change', () => {
          const datePickerParent = renderedSubcomponent.find('div');
          datePickerParent.childAt(0).simulate('change', testValue);
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({[mockProps.id]: testValue});
        });
        break;
      }
    }
  });
}

