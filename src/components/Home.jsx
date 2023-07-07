import React, { useState, useEffect } from "react";
import SlideShow2 from "./SlideShow2";
import Axios from 'axios';
import Card from "./Card";

export default function Home() {


    return (

        <div className="home">
            <SlideShow2 />
            <div className="intro_text">
                <h2>Bun venit pe website-ul nostru dedicat obiectivelor turistice din Romania!</h2>
                <p> Suntem încântați să te avem alături și să îți oferim o incursiune virtuală în frumusețea și diversitatea turistică a țării noastre. Romania este o destinație deosebită, plină de farmec și bogată în atracții ce merită descoperite.

                    Indiferent dacă ești în căutarea peisajelor spectaculoase ale munților, fascinației istoriei și culturii, sau experiențelor autentice în satele pitorești, vei găsi aici o gamă largă de obiective turistice ce îți vor satisface toate dorințele.

                </p>
                <p>
                    De la celebrele castele medievale, precum Castelul Bran, cu legenda contelui Dracula, sau Castelul Peleș, reședința regală impresionantă, până la peisajele fascinante ale Deltei Dunării sau ale Transilvaniei, vei fi uimit de diversitatea și frumusețea pe care Romania le oferă.

                    În plus, vei putea descoperi orașe pline de istorie și cultură, precum București, capitala vibrantă, sau Sibiu, declarat orașul cultural european în 2007. De asemenea, vei avea ocazia să te bucuri de gastronomia românească autentică, să te relaxezi în stațiuni balneare de renume sau să te aventuri în natura sălbatică prin parcurile naționale și rezervațiile naturale.
                </p>

                <p>
                Pe acest website, vei găsi informații detaliate despre cele mai impresionante obiective turistice din Romania, cu imagini captivante și descrieri complete. Vom încerca să îți oferim și recomandări pentru rutele turistice, informații practice despre transport, cazare și activități disponibile în fiecare zonă.

                Indiferent dacă ești un turist străin sau un local care dorește să exploreze mai mult din țara sa, suntem aici pentru a te ghida și a te inspira în călătoria ta prin România.

                Așadar, începe-ți aventura prin frumoasa țară a lui Decebal, a lui Burebista și a lui Mircea cel Bătrân, și lasă-te cucerit de peisajele, tradițiile și oamenii acestui colț de rai al Europei.

                Bun venit în minunata lume a obiectivelor turistice din Romania!</p>
        </div>

        </div >
    )
}