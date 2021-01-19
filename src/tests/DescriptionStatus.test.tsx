import React from "react";
import {create} from "react-test-renderer";
import {DescriptionStatusClass} from "../main/profile/profileInfo/status/DescriptionStatus";

describe('DescriptionStatus component', () => {

    test(`status from props should be in the state`, () => {
        const component = create(<DescriptionStatusClass status={'text'} updateStatusUser={() => {}} />)
        const instance: any = component.getInstance();

        expect(instance.state.status).toBe('text');
    })

    test(`after creation <span> should be displayed`, () => {
        const component = create(<DescriptionStatusClass status={'text'} updateStatusUser={() => {}} />)
        const span: any = component.root.findByType('span');

        expect(span).not.toBeNull();
    })

    test(`after creation <input> shouldn't be displayed`, () => {
        const component = create(<DescriptionStatusClass status={'text'} updateStatusUser={() => {}} />)
        const root: any = component.root;

        expect(() => {
            let input = root.findByType('input');
        }).toThrow();
    })

    test(`after creation <span> should contains correct status`, () => {
        const component = create(<DescriptionStatusClass status={'text'} updateStatusUser={() => {}} />)
        const span = component.root.findByType('span');

        expect(span.children[0]).toBe('text');
    })

    test(`should be edit "editMode" is correct`, () => {
        const component = create(<DescriptionStatusClass status={'text'} updateStatusUser={() => {}} />)
        const instance: any = component.getInstance();
        const span = component.root.findByType('span');
        span.props.onDoubleClick();

        expect(instance.state.editMode).toBe(true);

    })

    test(`after double click on <span> get element <input>`, () => {
        const component = create(<DescriptionStatusClass status={'text'} updateStatusUser={() => {}} />)
        const instance: any = component.getInstance();
        const span = component.root.findByType('span');
        span.props.onDoubleClick();
        const input = component.root.findByType('input');

        expect(input).toBeTruthy();
    })

    test(`should be incoming props is correct`, () => {
        const component = create(<DescriptionStatusClass status={'text'} updateStatusUser={() => {}} />)
        const instance: any = component.getInstance();

        expect(instance.props.status).toBe('text');
    })

    test(`callback should be called`, () => {
        const mockCallback = jest.fn();

        const component = create(<DescriptionStatusClass status={'new status text'} updateStatusUser={mockCallback} />)
        const instance: any = component.getInstance();

        instance.deactivatedEditMode();

        expect(mockCallback.mock.calls.length).toBe(1);
        expect(instance.state.status).toBe('new status text');
    })

})