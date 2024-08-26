import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";

function Allergens() {
    useEffect(() => { checkLocalStorage(); allergensToString(); },[]);

    const changeActiveSection = () => (event) => {
        const links = document.querySelectorAll('.link');
        links.forEach(link => link.classList.remove('link__active'));
        const scannerLink = document.getElementById("scannerLink");
        scannerLink.classList.add('link__active');
    }

    // Dynamic string value with all checked allergens
    const [allergens, setAllergens] = useState('');

    // Checking correct boxes on load
    const checkLocalStorage = () => {
        const array = document.getElementsByTagName("input");
        // Check if values exist in localStorage and check the correct boxes
        for (let i = 0; i < array.length; i++) {
            if (localStorage.getItem(array[i].value) !== null) {
                array[i].checked = true;
            } else {
                array[i].checked = false;
            }
        }
    }

    const allergensToString = () => {
        // Add all checked allergens to a string and return
        const array = document.getElementsByTagName("input");
        let allergensString = "";
        for (let i = 0; i < array.length; i++) {
            if (array[i].checked == true) {
                allergensString = allergensString.concat(array[i].value + ", ");
            }
        }

        // Remove the last comma from string
        allergensString = allergensString.substring(0, allergensString.length - 2);

        if (allergensString == "") setAllergens("nie wybrano");
        else setAllergens(allergensString);
    }

    // Saving an allergen to localStorage
    const setAllergen = (allergen) => {
        if(localStorage.getItem(allergen) === null) localStorage.setItem(allergen, allergen);
        else localStorage.removeItem(allergen);

        // Update the info about chosen allergens
        allergensToString();
    }

    return (
        <div className="allergens">
            <h1 className="allergens__title">Lista alergenów</h1>
            <div className="allergens__checkboxes">
                <div className="allergens__checkbox-group">
                    <div className="allergens__checkbox">
                        <input type="checkbox" id="mleko" value="mleko" onChange={() => setAllergen("mleko")} />
                        <label htmlFor="mleko">Mleko</label>
                    </div>
                    <div className="allergens__checkbox">
                        <input type="checkbox" id="jaja" value="jaja" onChange={() => setAllergen("jaja")} />
                        <label htmlFor="jaja">Jaja</label>
                    </div>
                    <div className="allergens__checkbox">
                        <input type="checkbox" id="ryby" value="ryby" onChange={() => setAllergen("ryby")} />
                        <label htmlFor="ryby">Ryby</label>
                    </div>
                </div>

                <div className="allergens__checkbox-group">
                    <div className="allergens__checkbox">
                        <input type="checkbox" id="skorupiaki" value="skorupiaki" onChange={() => setAllergen("skorupiaki")} />
                        <label htmlFor="skorupiaki">Skorupiaki</label>
                    </div>
                    <div className="allergens__checkbox">
                        <input type="checkbox" id="gluten" value="gluten" onChange={() => setAllergen("gluten")} />
                        <label htmlFor="gluten">Gluten</label>
                    </div>
                    <div className="allergens__checkbox">
                        <input type="checkbox" id="soja" value="soja" onChange={() => setAllergen("soja")} />
                        <label htmlFor="soja">Soja</label>
                    </div>
                </div>

                <div className="allergens__checkbox-group">
                    <div className="allergens__checkbox">
                        <input type="checkbox" id="sezam" value="sezam" onChange={() => setAllergen("sezam")} />
                        <label htmlFor="sezam">Sezam</label>
                    </div>
                    <div className="allergens__checkbox">
                        <input type="checkbox" id="orzechy" value="orzechy" onChange={() => setAllergen("orzechy")} />
                        <label htmlFor="orzechy">Orzechy</label>
                    </div>
                    <div className="allergens__checkbox">
                        <input type="checkbox" id="orzechyziemne" value="orzechy ziemne" onChange={() => setAllergen("orzechy ziemne")} />
                        <label htmlFor="orzechyziemne">Orzechy ziemne</label>
                    </div>
                </div>
            </div>
            <div className="allergens__chosen">
                <p>Twoje alergeny: {allergens}</p>
            </div>
            <div className="allergens__disclaimer">
                <p>Wybór zostanie zapamiętany do momentu wyczyszczenia przeglądarki.</p>
                &nbsp;<p className="allergens__disclaimer-link"><Link to="/" onClick={changeActiveSection("scanner")}>Przejdź do Skanera</Link></p>
            </div>
        </div>
    )
}

export default Allergens;