/*
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';

import PropTypes from 'prop-types';


import assign from 'object-assign';
import tooltip from '@mapstore/components/misc/enhancers/tooltip';
import { isString, trimStart, isFunction } from 'lodash';
import { Nav, NavItem, Glyphicon } from 'react-bootstrap';
import ContainerDimensions from 'react-container-dimensions';
const NavItemT = tooltip(NavItem);
import { scrollIntoViewId } from '@mapstore/utils/DOMUtil';
import Modal from "@mapstore/components/misc/ResizableModal";

/**
 * Plugin for navigation menu. It renders some items passed as props (or injected by other plugins)
 * An item should contain at least the `position` property to sort items correctly in the menu, one of this properties to be rendered:
 *
 *  - `href`: a link to open
 *  - `linkId`: the Id of an item in the page to scroll to.
 *  - `tool`:  a function that returns the `item` itself. The returned object should contain `href` or `linkId` (useful if you want to inject some components instead of simply configure statically the item)
 *
 * In case of `href`, or `linkId`, the item can also to contain:
 *  - `label`: a node (react element or string, for instance) to render
 *  - `glyph` icon to use when the window's width is less then `minWidth`
 *  - `labelComponent` react element to render as navItem label, label will be visible when screen size is bigger
 *  - `iconComponent` react element to render as navItem on small screen, it should contain only icon
 *
 * Examples:
 * ```
 * {
 *  tool: () => {
 *               position: 0,
 *               label: props.label || 'GeoSolutions',
 *               href: props.href || 'https://www.geo-solutions.it/',
 *               img: props.src && <img className="customer-logo" src={props.src} height="30" /> || <img className="customer-logo" src={src} height="30" />,
 *               logo: true
 *           }
 * }
 * ```
 *
 * @memberof plugins
 * @name NavMenu
 * @class
 * @prop {object[]} items items to render. Note: they can be injected also by the plugin container
 * @prop {number} [minWidth=768] min width to switch between icon and label visualization.
 *
 */
class NavMenu extends React.Component {
    static propTypes = {
        src: PropTypes.string,
        link: PropTypes.string,
        label: PropTypes.node,
        style: PropTypes.object,
        items: PropTypes.array,
        links: PropTypes.array,
        navProps: PropTypes.object,
        minWidth: PropTypes.number
    };

    static defaultProps = {
        src: <Glyphicon glyph="question-sign" />,
        link: 'https://www.geosolutionsgroup.com/',
        label: 'GeoSolutions',
        style: {
            position: "absolute",
            width: "124px",
            left: 0,
            bottom: 0
        },
        navProps: {
            pullLeft: true
        },
        minWidth: 768
    };

    state = {
        showNewIndicesDashboardDialog: false
    };

    close = () => {
        this.setState({
            showNewIndicesDashboardDialog: false,
        });
    };

    getLinks = (width) => {

        return this.props.items && [...this.props.items, ...(this.props.links || [])]
            .filter(item => item.href || item.linkId || item.tool || !item.hide)
            .map(item => item.tool && isFunction(item.tool) && item.tool(item.cfg) || item)
            .sort((itemA, itemB) => itemA.position - itemB.position)
            .map((item, idx) => {
                return width > this.props.minWidth && !item.logo ?
                    this.renderLabeledItem(item, idx) : this.renderIconedItem(item, idx);
            }) || [];
    };

    renderLabeledItem = (item, idx) => {
        return item.labelComponent ? item.labelComponent : (<NavItem
            key={idx}
            target="_blank"
            href={isString(item.href) && !item.linkId && item.href || ""}
            onClick={isString(item.linkId) ? () => scrollIntoViewId(trimStart(item.linkId, '#')) : () => { }}>
            {item.label}
        </NavItem>);
    };

    renderIconedItem = (item, idx) => {
        return item.iconComponent ? item.iconComponent : (<NavItemT
            key={idx}
            target="_blank"
            tooltip={item.label}
            tooltipPosition="bottom"
            href={isString(item.href) && !item.linkId && item.href || ""}
            onClick={ () => this.setState( { showNewIndicesDashboardDialog: true } ) }>
            {item.glyph && <Glyphicon glyph={item.glyph} /> || item.img}
        </NavItemT>);
    };

    render() {
        return (
            <>
                <ContainerDimensions>
                    {({width}) => (
                        <Nav {...this.props.navProps}>
                            {this.getLinks(width)}
                        </Nav>
                    )}
                </ContainerDimensions>

                <Modal
                    clickOutEnabled={true}
                    showClose={true}
                    show={this.state.showNewIndicesDashboardDialog}
                    onClose={this.close}
                    title={"Aide"}
                    size={"lg"}
                    fitContent
                    buttons={[{
                        text: "Fermer",
                        onClick: this.close
                    }]}

                >
                    <div className="ms-detail-body">
                        <div>
                            <p>
                            Cet outil, développé dans le cadre d'un partenariat entre l'Université de Sherbrooke et Nature Québec, permet de créer des cartographies web afin de visualiser l'indice de bien-être
                            et de verdure à l'échelle d'une municipalité.<br/></p>
                            <p>
                            Si vous souhaitez participer à cette initiative, communiquez avec
                            <a href={"https://naturequebec.org/a-propos/equipe/"}> la personne responsable du programme <i>Milieux de vie en santé</i> de Nature Québec</a>.<br/></p>
                        </div>
                        <h4><b>Créer une nouvelle visualisation cartographique</b></h4>
                        <p>
                            La fonction de création de nouvelles visualisations cartographiques est accessible seulement
                            suite à l'authentification d'un utilisateur. Pour se connecter, cliquez sur le menu
                            dans le coin supérieur droit.
                        </p>

                        <h4><u>Formulaire de création d'une nouvelle visualisation cartographique</u></h4>
                        <ul>
                            <li><p><i>"Nom de la municipalité":</i> Il s'agit du nom de la carte qui sera affiché</p></li>
                            <li><p><i>"Visible pour tout le monde":</i> Lorsque cette option est activée, tous les visiteurs
                                ou utilisateurs ont un accès à la visualisation en lecture seule. Si l'option est désactivée
                                (par défaut), la visualisation est accessible exclusivement à l'utilisateur spécifique
                                qui l'a créée (lecture et écriture).
                            </p></li></ul>
                            <h5><u>Indice de bien-être</u></h5>
                            <p>L'indice de bien-être peut être visualisé selon trois échelles d'agrégation</p>
                                <ul>

                                    <li style={{paddingBottom: 8+"px"}}>
                                        <i>Aires de diffusion:</i> Couche vectorielle surfacique en format ESRI Shapefile (compressé en format ZIP)
                                        représentant les aires de diffusion du découpage de Statistique Canada contenant
                                            tous les champs correspondant à l'indice de bien-être, à chacune des dimensions
                                            et chacun de critères les composant (valeurs de 0 à 100).

                                    </li>
                                    <li style={{paddingBottom: 8+"px"}}>
                                        <i>Îlots de diffusion:</i> Couche vectorielle surfacique en format ESRI Shapefile (compressé en format ZIP)
                                        représentant les îlots de diffusion du découpage de Statistique Canada contenant
                                        tous les champs correspondant à l'indice de bien-être, à chacune des dimensions
                                        et chacun de critères les composant (valeurs de 0 à 100).
                                    </li>
                                    <li style={{paddingBottom: 8+"px"}}>
                                        <i>Hexagones:</i> Couche vectorielle surfacique en format ESRI Shapefile (compressé en format ZIP)
                                        représentant les des polygones de forme hexagonale contenant
                                        tous les champs correspondant à l'indice de bien-être, à chacune des dimensions
                                        et chacun de critères les composant (valeurs de 0 à 100).
                                    </li>
                                </ul>

                        <h5><u>Indice de verdure</u></h5>
                                <ul>
                                    <li>
                                        <i>Indice de verdure</i>: Couche matricielle en formation GeoTiff contenant
                                        une bande dont les valeurs se situent entre 0 et 100.
                                    </li>
                                </ul>

                        <h4><b>Comptes et accès</b></h4>
                        <p>
                            Si vous êtes un partenaire municipal et que vous désirez
                            obtenir un accès, communiquez avec <a href={"https://naturequebec.org/a-propos/equipe/"}> la personne responsable du programme <i>Milieux de vie en
                            santé</i> de Nature Québec</a>.
                        </p>
                        <p>
                            Un compte utilisateur doit être créé afin de permettre à un nouveau partenaire municipal de créer une nouvelle visualisation. Si vous êtes un administrateur, connectez-vous afin de créer de nouveaux utilisateurs.
                        </p>
                    </div>
                </Modal>
            </>
        );
    }
}

export default {
    NavMenuPlugin: assign(NavMenu, {
        OmniBar: {
            position: 5,
            tool: props => <NavMenu {...props}/>,
            priority: 1
        }
    })
};
