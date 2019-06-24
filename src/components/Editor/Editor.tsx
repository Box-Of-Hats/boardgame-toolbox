import * as React from 'react';
import './Editor.scss';
import {AnyTxtRecord} from 'dns';
import {types} from '@babel/core';

interface IEditableProperty {
    propertyName: string;
    label: string;
    type: string;
    default?: any;
}

interface IEditorProps {
    name: string;
    values: Array<IEditableProperty>;
    onSubmit: any;
    onFocus: any;
    onBlur: any;
}

interface IEditorState {
    properties: object;
}

export class Editor extends React.Component<IEditorProps, IEditorState> {
    constructor(props: IEditorProps) {
        super(props);
        let initialProperties = {};
        props.values.forEach(value => {
            initialProperties[value.propertyName] = value.default;
        });
        this.state = {
            properties: initialProperties
        };
    }

    componentDidUpdate() {
        let initialProperties = {};

        this.props.values.forEach(value => {
            initialProperties[value.propertyName] = value.default;
        });

        if (
            JSON.stringify(initialProperties) !=
            JSON.stringify(this.state.properties)
        ) {
            // Prevent infinite re-rendering
            this.setState({properties: initialProperties});
        }
    }

    updateProperties(propertyName: string, value: any) {
        this.setState((prevState, props) => {
            prevState.properties[propertyName] = value;
        });
    }

    submit() {
        this.props.onSubmit(this.state.properties);
    }

    renderInput(editableProperty: IEditableProperty) {
        var editor;

        switch (editableProperty.type) {
            case 'hidden':
                return <></>;
            case 'disabled':
                editor = (
                    <>
                        <div className='editor__input editor__input--disabled'>
                            {editableProperty.default}
                        </div>
                    </>
                );
                break;
            case 'number':
                editor = (
                    <>
                        <div className='editor__label'>
                            {editableProperty.label}
                        </div>
                        <input
                            type='number'
                            onFocus={this.props.onFocus}
                            onBlur={this.props.onBlur}
                            onChange={e => {
                                this.updateProperties(
                                    editableProperty.propertyName,
                                    parseInt(e.target.value)
                                );
                            }}
                            defaultValue={editableProperty.default}
                            className='editor__input'
                        />
                    </>
                );
                break;
            case 'text':
                editor = (
                    <>
                        <div className='editor__label'>
                            {editableProperty.label}
                        </div>
                        <input
                            type='text'
                            onFocus={this.props.onFocus}
                            onBlur={this.props.onBlur}
                            onChange={e => {
                                this.updateProperties(
                                    editableProperty.propertyName,
                                    e.target.value
                                );
                            }}
                            defaultValue={editableProperty.default}
                            className='editor__input'
                        />
                    </>
                );
                break;
            case 'textList':
                editor = (
                    <>
                        <div className='editor__label'>
                            {editableProperty.label}
                        </div>
                        <input
                            type='text'
                            onFocus={this.props.onFocus}
                            onBlur={this.props.onBlur}
                            onChange={e => {
                                this.updateProperties(
                                    editableProperty.propertyName,
                                    e.target.value.split(',').map(str => {
                                        return str.trim();
                                    })
                                );
                            }}
                            defaultValue={editableProperty.default}
                            className='editor__input'
                        />
                    </>
                );
                break;
            case 'textarea':
                editor = (
                    <>
                        <div className='editor__label'>
                            {editableProperty.label}
                        </div>
                        <textarea
                            onFocus={this.props.onFocus}
                            onBlur={this.props.onBlur}
                            onChange={e => {
                                this.updateProperties(
                                    editableProperty.propertyName,
                                    e.target.value.split(',').map(str => {
                                        return str.trim();
                                    })
                                );
                            }}
                            defaultValue={editableProperty.default}
                            className='editor__input editor__input--textarea'
                        />
                    </>
                );
                break;
            case 'color':
                editor = (
                    <>
                        <div className='editor__label'>
                            {editableProperty.label}
                        </div>
                        <input
                            type='color'
                            onFocus={this.props.onFocus}
                            onBlur={this.props.onBlur}
                            onChange={e => {
                                this.updateProperties(
                                    editableProperty.propertyName,
                                    e.target.value
                                );
                            }}
                            defaultValue={editableProperty.default}
                            className='editor__input'
                        />
                    </>
                );
                break;
            default:
                editor = <div>Unrecognised Type: {editableProperty.type}</div>;
        }

        return (
            <div
                className='editor__group'
                key={`${editableProperty.label}${this.props.name}`}>
                {editor}
            </div>
        );
    }

    render() {
        return (
            <form className='editor'>
                {/* <div className='editor__title'>{this.props.name}</div> */}
                {this.props.values.map(editableProp => {
                    return this.renderInput(editableProp);
                })}
                <div className='editor__group editor__group--final'>
                    <input
                        className='editor__button  editor__button--white'
                        type='button'
                        onClick={() => this.submit()}
                        value='Add +'
                    />
                </div>
            </form>
        );
    }
}
