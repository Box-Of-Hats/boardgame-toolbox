import * as React from 'react';
import './Rules.scss';

interface IRulesProps {
    name: string;
    text: string;
}

class Rules extends React.Component<IRulesProps, any> {
    public render() {
        return (
            <div className='rules'>
                <div className='rules__title'>
                    {this.props.name ? this.props.name : 'Rules'}
                </div>
                <div className='rules__text'>
                    {this.props.text
                        .toString()
                        .split('\n')
                        .map(line => {
                            return <div className='rules__line'>{line}</div>;
                        })}
                </div>
            </div>
        );
    }
}

export default Rules;
