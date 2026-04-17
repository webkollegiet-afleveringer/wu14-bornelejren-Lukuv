import { Link } from "react-router"

function NotFound() {
    return (
        <>
            <section className="notfound-hero hero">
                <h1>404 - Side ikke fundet</h1>
                <p>Desværre kunne vi ikke finde siden du leder efter.</p>
            </section>

            <section className="notfound-section section">
                <div className="notfound-message">
                    <p>Siden eksisterer ikke. Gå tilbage til forsiden:</p>
                </div>
                <div className="notfound-actions">
                    <Link to="/" className="notfound-button btn">Tilbage til forsiden</Link>
                </div>
            </section>
        </>
    )
}

export default NotFound