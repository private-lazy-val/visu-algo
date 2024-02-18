import React from 'react';
import { Circle } from './circle';
import renderer from 'react-test-renderer';
import {ElementStates} from "../../../types/element-states";

describe('Circle Component', () => {
    it('renders without a letter', () => {
        const tree = renderer
            .create(<Circle/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders with letters', () => {
        const tree = renderer
            .create(<Circle letter="A"/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders with head', () => {
        const tree = renderer
            .create(<Circle head="1" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders with react-element in head', () => {
        const ReactElement = <span>React Element</span>;
        const tree = renderer
            .create(<Circle head={ReactElement} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders with tail', () => {
        const tree = renderer
            .create(<Circle tail="1" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders with react-element in tail', () => {
        const ReactElement = <span>React Element</span>;
        const tree = renderer
            .create(<Circle tail={ReactElement} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders with index', () => {
        const tree = renderer
            .create(<Circle index={1} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders as small', () => {
        const tree = renderer
            .create(<Circle isSmall={true} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders in default state', () => {
        const tree = renderer
            .create(<Circle state={ElementStates.Default} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders in changing state', () => {
        const tree = renderer
            .create(<Circle state={ElementStates.Changing} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders in modified state', () => {
        const tree = renderer
            .create(<Circle state={ElementStates.Modified} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});