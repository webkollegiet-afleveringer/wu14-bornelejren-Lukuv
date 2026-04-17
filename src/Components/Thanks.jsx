import { Link } from "react-router"

function Thanks() {
    return (
        <>
            <section className="thanks-hero hero">
                <h1>Tak til dig!</h1>
                <p>Vi takker uendeligt meget for dit sponserskab og glæder os til at arbejde med jeres virksomhed.</p>
            </section>

            <section className="thanks-section section">
                <h2>Din sponsering betyder alt</h2>
                <p>Børneleijen på Langeland takker alle, der på den ene eller anden måde, har støttet foreningens arbejde med at sende dårligt stillede børn på et ophold på Søgård Hovedgård - det være sig ved naturaliesponsorater eller økonomisk støtte fra støttemedlemmer, virksomhedssponsorer og donationer fra fonde.</p>
                <Link className="notfound-button" to="/sponsor">Gå til sponsor liste</Link>
                
                <p className="thanks-message">En særlig tak til alle vores generøse sponsorer som gør en forskel i børnenes liv!</p>
            </section>
        </>
    )
}

export default Thanks