import * as React from 'react';

import {Link} from 'types/Link.interface';
import './Footer.scss';

interface IFooterProps {
    links: Link[];
}

const Footer = (props: IFooterProps) => {
    return (
        <div className='footer'>
            {props.links.map(link => {
                return (
                    <a className='footer__link' href={link.href}>
                        {link.text}
                    </a>
                );
            })}
        </div>
    );
};

export default Footer;
