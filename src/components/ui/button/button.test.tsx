import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Button } from './button';
import renderer from 'react-test-renderer';

describe('Button component', () => {
    it('renders with text', () => {
        const tree = renderer
            .create(<Button text="Click me"/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders without text', () => {
        const tree = renderer
            .create(<Button />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders disabled button', () => {
        const tree = renderer
            .create(<Button disabled />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders with loading indicator', () => {
        const tree = renderer
            .create(<Button isLoader={true} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('calls onClick callback when clicked', () => {
        const callBack = jest.fn();
        render(<Button text="Click me" onClick={callBack}/>);

        fireEvent.click(screen.getByText('Click me'));
        expect(callBack).toHaveBeenCalledTimes(1);
    });
})