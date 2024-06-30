function Info() {
    const showInfoTooltip = () => {
        document.querySelector(".info__tooltip").style.display = "inline";
    }

    const hideInfoTooltip = () => {
        document.querySelector(".info__tooltip").style.display = "none";
    }

    return (
        <div className="info">
            <div className="info__image-container">
                <a href="https://drgralec.pl/wp-content/uploads/anafilaksja.webp" onMouseOver={showInfoTooltip} onMouseLeave={hideInfoTooltip}><img src="/anafilaksja.webp" alt="anafilaksja" /></a>
                <span className="info__tooltip">Powiększ obrazek</span>
            </div>
        </div>
    )
}

export default Info;