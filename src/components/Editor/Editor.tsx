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

    componentDidMount() {
        let initialProperties = {};
        this.props.values.forEach(value => {
            initialProperties[value.propertyName] = value.default;
        });
        this.setState({properties: initialProperties});
    }

    updateProperties(propertyName: string, value: any) {
        this.setState((prevState, props) => {
            prevState.properties[propertyName] = value;
        });
    }

    submit() {
        console.log('Submit!');
        this.props.onSubmit(this.state.properties);
    }

    renderInput(editableProperty: IEditableProperty) {
        switch (editableProperty.type) {
            case 'hidden':
                return <div></div>;
            case 'disabled':
                return (
                    <div className='editor__input editor__input--disabled'>
                        {editableProperty.default}
                    </div>
                );
            case 'number':
                return (
                    <input
                        type='number'
                        onChange={e => {
                            this.updateProperties(
                                editableProperty.propertyName,
                                parseInt(e.target.value)
                            );
                        }}
                        defaultValue={editableProperty.default}
                        className='editor__input'
                    />
                );
                break;
            case 'text':
                return (
                    <input
                        type='text'
                        onChange={e => {
                            this.updateProperties(
                                editableProperty.propertyName,
                                e.target.value
                            );
                        }}
                        defaultValue={editableProperty.default}
                        className='editor__input'
                    />
                );
            case 'textList':
                return (
                    <input
                        type='text'
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
                );
            default:
                return <div>Unrecognised Type: {editableProperty.type}</div>;
                break;
        }
    }

    render() {
        return (
            <form className='editor'>
                <div className='editor__title'>{this.props.name}</div>
                {this.props.values.map(editableProp => {
                    return (
                        <div
                            className='editor__form-group'
                            key={`${editableProp.label}${this.props.name}`}>
                            <div className='editor__label'>
                                {editableProp.label}
                            </div>
                            {this.renderInput(editableProp)}
                        </div>
                    );
                })}
                <input
                    className='editor__button editor__button--submit'
                    type='button'
                    onClick={() => this.submit()}
                    value='Save'
                />
            </form>
        );
    }
}
