/**
 * Copyright 2015, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';

import I18N from '@mapstore/components/I18N/I18N';

class About extends React.Component {
    render() {
        return (
            <div style={{
                // backgroundImage: 'url("' + msLogo + '")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            }}>
                <h1>Utilisation de l'outil</h1>
                <p>
                    Pour visualiser l'indice de bien-être et de verdure, cliquez à un endroit sur la carte. S'il existe des
                    résultats à l'endroit cliqué, ceux-ci peuvent être visualisés dans la fenêtre de gauche.
                </p>
                <h3>Indice de bien-être</h3>
                <p>
                    L'indice de bien-être se décompose en trois dimensions (environnementale, sociale et économique) qui
                    se décomposent elles-mêmes en plusieurs indicateurs.
                </p>
                <h4>Contrôles</h4>
                <p>
                    Il est possible d'ajuster l'opacité des polygones contenant les résultats du calcul de l'indice de bien-être
                    en se servant du curseur prévu à cet effet.
                </p>
                <p>
                    Il est possible de visualiser l'indice de bien-être sous trois échelles différentes soit par aires de diffusions,
                     par îlots de diffusion (divisions de recensement de Statistique Canada) ou par hexagones de 200 m.
                    Pour basculer entre les différentes échelles de visualisation, cliquez sur les boutons correspondant à chacune d'entre elles
                </p>
                <p>
                    Cliquez sur l'icône à droite de chacune des dimensions (environnementale, sociale et économique) afin
                    de fixer la visualisation sur une dimension en particulier. Ceci aura pour effet d'afficher les résultats
                    seulement pour la dimension sélectionnée.
                </p>
                <p>
                    Une légende est disponible dans le coin supérieur droit de la section "Indice de bien-être"
                </p>
                <p>
                    Les indicateurs de chacune des dimensions peuvent être visualisés en cliquant sur une dimension.
                </p>
                <h3>Indice de verdure</h3>
                <p>
                    Il est possible d'ajuster l'opacité de l'indice de verdure en se servant du curseur prévu à cet effet.
                </p>
                <p>
                    Une légende est disponible dans le coin supérieur droit de la section "Indice de verdure"
                </p>
                <h1>Crédits</h1>
                <div>
                    <p>
                        Cet outil a été développé par des étudiant(e)s du programme de <i>Géomatique appliquée à
                        l'environnement</i> de l'<i>Université de Sherbrooke</i> en partenariat avec <i>Nature
                        Québec</i> dans le cadre du programme <i>Milieux de vie en santé</i>.
                    </p>
                    <p>
                        <ul>
                            <li>Nesrine Achouri: Méthodologie pour le calcul de l'indice de verdure</li>
                            <li>Alex Camon: Méthodologie pour le calcul de l'indice de verdure</li>
                            <li>Chad Marier: Méthodologie pour le calcul de l'indice de verdure</li>
                            <li>Patrice Pineault: Programmation et développement du SIG web</li>
                        </ul>
                    </p>
                </div>

                <div>
                    Code source disponible <a href={"https://github.com/pino-udes/indice-bien-etre"}>ici</a>.
                </div>
            </div>
        );
    }
}

export default About;
