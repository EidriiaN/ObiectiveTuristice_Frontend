import React from "react";
import imgArrowLeft from "../images/arrow_back_FILL0_wght400_GRAD0_opsz48.svg"
import imgArrowRight from "../images/arrow_forward_FILL0_wght400_GRAD0_opsz48.svg"
import munteleFuji from "../images/Muntele-Fuji-Japonia.jpg"
import pietre from "../images/pietre.jpg"
import sfinxul from "../images/sphinx-bucegi-romania.jpg"


// var slideIndex = 1;
// showDivs(slideIndex);

// function plusDivs(n) {
//     showDivs(slideIndex += n);
// }

// function showDivs(n) {
//     var i;
//     var x = document.getElementsByClassName("slideshow--array");
//     if (n > x.length) { slideIndex = 1 }
//     if (n < 1) { slideIndex = x.length };
//     for (i = 0; i < x.length; i++) {
//         x[i].style.display = "none";
//     }
//     x[slideIndex - 1].style.display = "block";
//     console.log(x);
// }



export default function SlideShow() {


    return (

        <div className="slideshow">

            {/* <div className="slideshow--arrow-left">

                <img src={imgArrowLeft} alt="arrow-left" width="58" height="58" />
            </div> */}
            <button className="w3-button w3-display-left">&#10094;</button>

            <div className="slideshow--image">

                <div className="slideshow--array">

                    <img src={munteleFuji} alt="muntele-fuji" />

                </div>

                <div className="slideshow--array">

                    <img className="slideshow--array" src={pietre} alt="pietre" />

                </div>

                <div className="slideshow--array">

                    <img className="slideshow--array" src={sfinxul} alt="sfinx" />

                </div>

            </div>

            {/* <div className="slideshow--arrow-right">

                <img src={imgArrowRight} alt="arrow-left" width="58" height="58" />

            </div> */}
            <button className="w3-button w3-display-right">&#10095;</button>

        </div>
    )
}