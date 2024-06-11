function Allergens() {
    // Checking correct boxes on load
    const checkLocalStorage = () => {
        const array = document.getElementsByTagName("input");
        console.log("check");
    }

    window.onload = checkLocalStorage();

    // Saving an allergen to localStorage
    const setAllergen = (allergen) => {
        if(localStorage.getItem(allergen) === null) localStorage.setItem(allergen, allergen);
        else localStorage.removeItem(allergen);
    }

    return (
        <div className="allergens">
            Alergeny
            <div className="allergens__checkboxes">
                <div className="allergens__checkbox-group">
                    <div className="allergens__checkbox">
                        <input type="checkbox" id="alergen1" value="alergen1" onChange={() => setAllergen("allergen1")} />
                        <label htmlFor="allergen1">Alergen 1</label>
                    </div>
                    <div className="allergens__checkbox">
                        <input type="checkbox" id="alergen2" value="alergen2" onChange={() => setAllergen("allergen2")} />
                        <label htmlFor="allergen2">Alergen 2</label>
                    </div>
                    <div className="allergens__checkbox">
                        <input type="checkbox" id="alergen3" value="alergen3" onChange={() => setAllergen("allergen3")} />
                        <label htmlFor="allergen3">Alergen 3</label>
                    </div>
                </div>

                <div className="allergens__checkbox-group">
                    <div className="allergens__checkbox">
                        <input type="checkbox" id="alergen4" value="alergen4" />
                        <label htmlFor="allergen4">Alergen 4</label>
                    </div>
                    <div className="allergens__checkbox">
                        <input type="checkbox" id="alergen5" value="alergen5" />
                        <label htmlFor="allergen5">Alergen 5</label>
                    </div>
                    <div className="allergens__checkbox">
                        <input type="checkbox" id="alergen6" value="alergen6" />
                        <label htmlFor="allergen6">Alergen 6</label>
                    </div>
                </div>

                <div className="allergens__checkbox-group">
                    <div className="allergens__checkbox">
                        <input type="checkbox" id="alergen7" value="alergen7" />
                        <label htmlFor="allergen7">Alergen 7</label>
                    </div>
                    <div className="allergens__checkbox">
                        <input type="checkbox" id="alergen8" value="alergen8" />
                        <label htmlFor="allergen8">Alergen 8</label>
                    </div>
                    <div className="allergens__checkbox">
                        <input type="checkbox" id="alergen9" value="alergen9" />
                        <label htmlFor="allergen9">Alergen 9</label>
                    </div>
                </div>
            </div>
            <div className="allergens__disclaimer">
                <p>Wybór zostanie zapamiętany do momentu wyczyszczenia przeglądarki.</p>
            </div>
        </div>
    )
}

export default Allergens;