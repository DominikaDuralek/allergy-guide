import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function Allergens() {
    useEffect(() => { checkLocalStorage(); allergensToString(); },[]);

    // Dynamic string value with all checked allergens
    const [allergens, setAllergens] = useState('');

    // Checking correct boxes on load
    const checkLocalStorage = () => {
        const array = document.getElementsByTagName("input");
        // Check if values exist in localStorage and check the correct boxes
        for (let i = 0; i < array.length; i++) {
            if (localStorage.getItem(array[i].id) !== null) {
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
                // If last item reached
                if (i == array.length - 1) allergensString = allergensString.concat(array[i].id);
                else allergensString = allergensString.concat(array[i].id + ", ");
            }
        }

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
                        <input type="checkbox" id="alergen1" value="alergen1" onChange={() => setAllergen("alergen1")} />
                        <label htmlFor="allergen1">Alergen 1</label>
                    </div>
                    <div className="allergens__checkbox">
                        <input type="checkbox" id="alergen2" value="alergen2" onChange={() => setAllergen("alergen2")} />
                        <label htmlFor="alergen2">Alergen 2</label>
                    </div>
                    <div className="allergens__checkbox">
                        <input type="checkbox" id="alergen3" value="alergen3" onChange={() => setAllergen("alergen3")} />
                        <label htmlFor="alergen3">Alergen 3</label>
                    </div>
                </div>

                <div className="allergens__checkbox-group">
                    <div className="allergens__checkbox">
                        <input type="checkbox" id="alergen4" value="alergen4" onChange={() => setAllergen("alergen4")} />
                        <label htmlFor="alergen4">Alergen 4</label>
                    </div>
                    <div className="allergens__checkbox">
                        <input type="checkbox" id="alergen5" value="alergen5" onChange={() => setAllergen("alergen5")} />
                        <label htmlFor="alergen5">Alergen 5</label>
                    </div>
                    <div className="allergens__checkbox">
                        <input type="checkbox" id="alergen6" value="alergen6" onChange={() => setAllergen("alergen6")} />
                        <label htmlFor="alergen6">Alergen 6</label>
                    </div>
                </div>

                <div className="allergens__checkbox-group">
                    <div className="allergens__checkbox">
                        <input type="checkbox" id="alergen7" value="alergen7" onChange={() => setAllergen("alergen7")} />
                        <label htmlFor="alergen7">Alergen 7</label>
                    </div>
                    <div className="allergens__checkbox">
                        <input type="checkbox" id="alergen8" value="alergen8" onChange={() => setAllergen("alergen8")} />
                        <label htmlFor="alergen8">Alergen 8</label>
                    </div>
                    <div className="allergens__checkbox">
                        <input type="checkbox" id="alergen9" value="alergen9" onChange={() => setAllergen("alergen9")} />
                        <label htmlFor="alergen9">Alergen 9</label>
                    </div>
                </div>
            </div>
            <div className="allergens__chosen">
                <p>Twoje alergeny: {allergens}</p>
            </div>
            <div className="allergens__disclaimer">
                <p>Wybór zostanie zapamiętany do momentu wyczyszczenia przeglądarki.</p>
                <p><Link to="/">Przejdź do Skanera</Link></p>
            </div>
        </div>
    )
}

export default Allergens;