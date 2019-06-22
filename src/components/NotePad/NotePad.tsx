import * as React from 'react';
import './NotePad.scss';

interface INotePadProps {
    name: string;
}

class NotePad extends React.Component<INotePadProps, any> {
    public render() {
        return (
            <div className='notepad'>
                <div className='notepad__title'>{this.props.name}</div>
                <textarea className='notepad__textarea'></textarea>
            </div>
        );
    }
}

export default NotePad;
