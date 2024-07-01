import { useState, useContext, useRef, useEffect } from "react";
import QuaggaScanner from '../components/QuaggaScanner';
import { BarcodeContext } from '../context/BarcodeContext';

function Scanner() {
    // Product properties extracted from json file
    const [productName, setProductName] = useState('');
    const [productCode, setProductCode] = useState('');

    const [productAllergens, setProductAllergens] = useState('');
    const [productSafe, setProductSafe] = useState('');

    const { barcode } = useContext(BarcodeContext);

    const [scannerVisible, setScannerVisible] = useState(false);
    const quaggaRef = useRef(null);

    const [codeErrorMessage, setCodeErrorMessage] = useState('');

    // Value to store allergens while still checking
    let tempProductAllergens = "";

    // Show the barcode scanner (camera)
    const showScanner = () => {
        setScannerVisible(true);
        if (quaggaRef.current) {
            quaggaRef.current.startScanner();
        }

        document.querySelector(".scanner__camera-option").style.display = "none";
        document.querySelector(".scanner__code-option").style.display = "none";
        document.querySelector(".scanner__camera").style.display = "flex";
        document.querySelector(".scanner__product").style.display = "none";
    }

    const hideScanner = () => {
        setCodeErrorMessage(null);
        document.querySelector(".scanner__camera-option").style.display = "flex";
        document.querySelector(".scanner__code-option").style.display = "flex";
        document.querySelector(".scanner__camera").style.display = "none";
        document.querySelector(".scanner__product").style.display = "none";

        setScannerVisible(false);
        if (quaggaRef.current) {
            quaggaRef.current.stopScanner();
        }
    }

    // Get input after button is clicked
    const searchProductCode = () => {
        const code = document.getElementById("code").value;

        window.fetch("https://world.openfoodfacts.org/api/v3/product/" + code + ".json").then((response) => {
            if(!response.ok){
                setCodeErrorMessage("Nie znaleziono");
                throw Error(response.statusText);
            }
            return;
        }).then(function () {
            showProductInfo(code);
        }).catch(function () {
            setCodeErrorMessage("Nie znaleziono");
        });

    }

    // Show info about product in scanner__product component
    const showProductInfo = (code) => {
        checkProduct(code);

        document.querySelector(".scanner__camera-option").style.display = "none";
        document.querySelector(".scanner__code-option").style.display = "none";
        document.querySelector(".scanner__product").style.display = "flex";
    }

    // Hide info about product in scanner__product component
    const hideProductInfo = () => {
        // Clear the product's allergens
        tempProductAllergens = "";

        document.querySelector(".scanner__camera-option").style.display = "flex";
        document.querySelector(".scanner__code-option").style.display = "flex";
        document.querySelector(".scanner__product").style.display = "none";
        document.querySelector(".scanner__camera").style.display = "none";

        setCodeErrorMessage('');
    }

    const checkProduct = (code) => {
        // Fetch the correct product
        window.fetch("https://world.openfoodfacts.org/api/v3/product/" + code + ".json")
            .then(function (response) {
                return response.json();
            }).then(function (json) {
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
                if (tempProductAllergens == "") {
                    setProductSafe("TAK");
                    tempProductAllergens = "nie zawiera";
                } else {
                    setProductSafe("NIE");
                    tempProductAllergens = tempProductAllergens.substring(0, tempProductAllergens.length - 2);
                }

                setProductAllergens(tempProductAllergens);
            }).catch(function (error) {
                console.log(error);
                setCodeErrorMessage("Nie znaleziono");
            });
    }

    const checkAllergen = (allergen, keywords, jsonAllergens) => {
        // If allergen exists in localStorage
        if (localStorage.getItem(allergen) !== null) {
            // Check if alergen is in the product
            for (let i = 0; i < keywords.length; i++) {
                if ((jsonAllergens).includes(keywords[i])) {
                    tempProductAllergens += (allergen + ", ");
                    break;
                }
            }
        }
    }

    useEffect(() => {
        if (barcode) {
            window.fetch("https://world.openfoodfacts.org/api/v3/product/" + barcode + ".json").then((response) => {
                if(!response.ok){
                    setCodeErrorMessage("Nie znaleziono");
                    throw Error(response.statusText);
                }
                return;
            }).then(function () {
                showProductInfo(barcode);
                quaggaRef.current.stopScanner();
                document.querySelector(".scanner__camera").style.display = "none";
            }).catch(function () {
                setCodeErrorMessage("Nie znaleziono");
            });
        }
    }, [barcode]);

    // Hide scanner and product info on component load
    useEffect(() => {
            setCodeErrorMessage("");
            document.querySelector(".scanner__camera-option").style.display = "flex";
            document.querySelector(".scanner__code-option").style.display = "flex";
            document.querySelector(".scanner__camera").style.display = "none";
            document.querySelector(".scanner__product").style.display = "none";
    }, []);

    return (
        <div className="scanner">
            <h1 className="scanner__title">Wprowadź produkt</h1>
            <div className="scanner__container">
                <div className="scanner__camera-option">
                    <h2 className="scanner__section-title">Skaner kodów kreskowych</h2>
                    <h2 className="scanner__section-subtitle">Dostęp do skanera wymaga kamery</h2>
                    <div className="scanner__camera-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="0.85" stroke="#23ABE1" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                    </svg>
                    </div>
                    <button className="scanner__camera-button" onClick={showScanner} >Uruchom skaner</button>
                </div>
                <div className="scanner__code-option">
                    <h2 className="scanner__section-title">Ręczne wpisanie kodu</h2>
                    <h2 className="scanner__section-subtitle">Wprowadź kod produktu</h2>
                    <input type="text" className="scanner__code-input" id="code" />
                    <p className="error-message">{codeErrorMessage}</p>
                    <button className="scanner__code-button" onClick={searchProductCode} >Wyszukaj</button>
                </div>

                <div className="scanner__camera">
                    <h2 className="scanner__section-title">Skaner kodów kreskowych</h2>
                    <QuaggaScanner ref={quaggaRef} class="scanner-container" />
                    <p className="error-message">{codeErrorMessage}</p>
                    <button className="scanner__camera-button-back" onClick={hideScanner}>Wyjdź</button>
                </div>

                <div className="scanner__product">
                    <h2 className="scanner__section-title">Informacje o produkcie</h2>
                    <div className="scanner__product__text-container">
                        <span>Nazwa: {productName}</span><br />
                        <span>Kod: {productCode}</span><br />
                        <span>Produkt bezpieczny: {productSafe}</span><br />
                        <span>Twoje alergeny: {productAllergens}</span><br />
                    </div>
                    <button className="scanner__product__button-back" onClick={hideProductInfo} >Wyszukaj kolejny produkt</button>
                </div>
            </div>
        </div>
    )
}

export default Scanner;