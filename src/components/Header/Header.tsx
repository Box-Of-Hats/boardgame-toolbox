import * as React from 'react';
import './Header.scss';
import {Link} from 'react-router-dom';

interface IHeaderProps {
    title?: string;
    backLink?: string;
}

class Header extends React.Component<IHeaderProps, any> {
    public render() {
        return (
            <div className='header'>
                {this.props.backLink && (
                    <Link to={this.props.backLink}>
                        <div className='header__link header__link--back'>
                            <i className='material-icons'>arrow_back_ios</i>
                        </div>
                    </Link>
                )}
                {!this.props.backLink && <div></div>}

                <div className='header__title'>
                    {this.props.title ? this.props.title : 'Header'}
                </div>
                <div className='header__link header__link--other'></div>
            </div>
        );
    }
}

export default Header;
