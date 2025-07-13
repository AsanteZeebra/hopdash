import react from "react";

const Footer = () => {
    const year = new Date().getFullYear(); // Get the current year
    return (
       <>
       <div className="app-footer">
                        <span>© House of Power {year}</span>
                    </div>
       </>
    );
}

export default Footer;