import * as React from 'react';
import './Editor.scss';

interface IEditablePair {
    label: string;
    type: string;
}

interface IEditorProps {
    values: Array<IEditablePair>;
    onChange: any;
    onSubmit: any;
}

export class Editor extends React.Component<IEditorProps, any> {
    render() {
        return (
            <form className='editor' onSubmit={this.props.onSubmit}>
                {this.props.values.map(value => {
                    return (
                        <div className='editor__form-group'>
                            <div className='editor__label'>{value.label}</div>
                            <input
                                type={value.type}
                                onChange={() => this.props.onChange}
                                className='editor__input'
                            />
                        </div>
                    );
                })}
                <input
                    className='editor__button editor__button--submit'
                    type='submit'>
                    Save
                </input>
            </form>
        );
    }
}
