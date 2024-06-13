import { useState } from "react";

function Scanner() {
    // Product properties extracted from json file
    const [productName, setProductName] = useState('');
    const [productCode, setProductCode] = useState('');

    const [productAllergens, setProductAllergens] = useState('');
    const [productSafe, setProductSafe] = useState('');

    // Value to store allergens while still checking
    let tempProductAllergens = "";

    // Show info about product in scanner__product component
    const showProductInfo = () => {
        const code = document.getElementById("code").value;
        checkProduct(code);

        document.querySelector(".scanner__camera").style.display = "none";
        document.querySelector(".scanner__code").style.display = "none";
        document.querySelector(".scanner__product").style.display = "flex";
    }

    // Hide info about product in scanner__product component
    const hideProductInfo = () => {
        // Clear the product's allergens
        tempProductAllergens = "";

        document.querySelector(".scanner__camera").style.display = "flex";
        document.querySelector(".scanner__code").style.display = "flex";
        document.querySelector(".scanner__product").style.display = "none";
    }

    const checkProduct = (code) => {
        // Fetch the correct product
        window.fetch("https://world.openfoodfacts.org/api/v3/product/" + code + ".json")
            .then(function(response){
                return response.json();
            }).then(function(json){
                setProductName(json.product.product_name);
                setProductCode(json.code);

                // Check the presence of each allergen
                checkAllergen("mleko", ["milk", "mleko"], json.product.allergens);
                checkAllergen("jaja", ["eggs", "jaja"], json.product.allergens);
                checkAllergen("ryby", ["fish", "ryby"], json.product.allergens);
                checkAllergen("skorupiaki", ["crustaceans", "shrimp", "skorupiaki", "krewetki"], json.product.allergens);
                checkAllergen("gluten", ["gluten", "pszenica"], json.product.allergens);
                checkAllergen("soja", ["soybeans", "soy", "soja"], json.product.allergens);
                checkAllergen("sezam", ["sesame", "sezam"], json.product.allergens);
                checkAllergen("orzechy", ["nuts", "orzech"], json.product.allergens);
                checkAllergen("orzechy ziemne", ["peanut", "orzeszki", "ziemne"], json.product.allergens);

                // Determine product safety
                if(tempProductAllergens == "") {
                    setProductSafe("TAK");
                    tempProductAllergens = "nie zawiera";
                } else {
                    setProductSafe("NIE");
                    tempProductAllergens = tempProductAllergens.substring(0, tempProductAllergens.length - 2);
                }

                setProductAllergens(tempProductAllergens);
            }).catch(function(error) {
                console.log(error);
            });
    }

    const checkAllergen = (allergen, keywords, jsonAllergens) => {
        // If allergen exists in localStorage
        if(localStorage.getItem(allergen) !== null) {
            // Check if alergen is in the product
            for (let i = 0; i < keywords.length; i++) {
                if((jsonAllergens).includes(keywords[i])) {
                    tempProductAllergens += (allergen + ", ");
                    break;
                }
            }
        }
    }

    return (
        <div className="scanner">
            <h1 className="scanner__title">Wprowadź produkt</h1>
            <div className="scanner__container">
                <div className="scanner__camera">
                    <h2>Opcja 1</h2>
                    <h2>Skaner dostępny tylko dla urządzeń mobilnych</h2>
                    <div className="scanner__camera-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="0.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                        </svg>
                    </div>
                </div>
                <div className="scanner__code">
                    <h2>Opcja 2</h2>
                    <h2>Wprowadź kod produktu</h2>
                    <input type="text" className="scanner__code-input" id="code" />
                    <button className="scanner__code-submit" onClick={showProductInfo} >Wyszukaj</button>
                </div>

                <div className="scanner__product">
                    <p>Informacje o produkcie</p>
                    <span>Nazwa: {productName}</span>
                    <span>Kod: {productCode}</span>
                    <span>Produkt bezpieczny: {productSafe}</span>
                    <span>Twoje alergeny: {productAllergens}</span>
                    <button className="scanner__product__button-back" onClick={hideProductInfo} >Wyszukaj kolejny produkt</button>
                </div>
            </div>
        </div>
    )
}

export default Scanner;