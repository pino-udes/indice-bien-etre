/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import src from "../../assets/Nature-Quebec-logo.png";
import udes from "../../assets/universite_de_sherbrooke_logo.png";

// import HTML from '@mapstore/components/I18N/HTML';

/**
 * Footer plugin, section of the homepage.
 * description of footer can be overridden by
 * `home.footerDescription` message id in the translations
 * @prop {object} cfg.logo logo data to change image and href, set to null to hide the logo
 * @prop {object} cfg.logo.src source of the logo
 * @prop {object} cfg.logo.width width of the logo image
 * @prop {object} cfg.logo.height height of the logo image
 * @prop {object} cfg.logo.title title of the logo image
 * @prop {object} cfg.logo.alt alternative text of the logo image
 * @memberof plugins
 * @class
 * @name Footer
 */

class Footer extends React.Component {

    static propTypes = {
        logo: PropTypes.object,
        logoudes: PropTypes.object
    };

    static defaultProps = {
        logo: {
            src,
            width: 'auto',
            height: 90,
            href_nq: 'https://naturequebec.org/',
            title: 'Nature Québec',
            alt: 'Nature Québec'
        },
        logoudes: {
            src: udes,
            width: 'auto',
            height: 110,
            href_udes: 'https://www.usherbrooke.ca/',
            title: 'Université de Sherbrooke',
            alt: 'Université de Sherbrooke'
        }
    };

    render() {
        const { href_nq, ...logo } = this.props.logo || {};
        const { href_udes, ...logoudes } = this.props.logoudes || {};
        const image = (
            <img
                src={logo.src}
                width={logo.width || 'auto'}
                height={logo.height || 'auto'}
                title={logo.title || ''}
                alt={logo.alt || ''}
                style={{padding: 20 + "px" }}/>
        );
        const imageUdeS = (
            <img
                src={logoudes.src}
                width={logoudes.width || 'auto'}
                height={logoudes.height || 'auto'}
                title={logoudes.title || ''}
                alt={logoudes.alt || ''}
                style={{padding: 20 + "px" }}/>
        );
        return (
            <Grid>
                <Row>
                    <Col xs={12} className="text-center">
                        <div>
                            <p>
                                Cet outil a été développé par des étudiant(e)s du programme de <i>Géomatique appliquée à l'environnement</i>
                                de l'<i>Université de Sherbrooke</i><br/>
                                en partenariat avec <i>Nature Québec</i> dans le cadre du programme <i>Milieux de vie en santé</i>
                            </p>
                        </div>
                        <div>
                            {href_nq ? <a target="_blank" href={href_nq}>
                                {image}
                            </a> : image}

                            {href_udes ? <a target="_blank" href={href_udes}>
                                {imageUdeS}
                            </a> : imageUdeS}
                        </div>
                        <div>
                            Code source disponible <a href={"https://github.com/pino-udes/indice-bien-etre"}>ici</a>
                        </div>
                    </Col>

                </Row>
            </Grid>
        );
    }
}

export const FooterPlugin = Footer;
