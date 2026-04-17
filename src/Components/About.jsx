function About() {
    return (
        <>
            <section className="about-hero hero">
                <h1>Om os</h1>
                <p>Læs mere om vores mission og arbejde</p>
            </section>

            <section className="about-section section">
                <h2>Om foreningen</h2>

                <p>Børnelejren på Langeland er en velgørende, non-profit forening, som afholder finansierede lejre for dårligt stillede børn og unge fra hele landet. Børnelejrene bliver afholdt på foreningens bondegård, Søgård Hovedgård, som ligger i naturskønne omgivelser på sydspidsen af Langeland.</p>

                <p>Samtlige omkostninger til alle børns ophold og transport til/fra lejren bliver finansieret af foreningen, og det er et krav fra foreningens side, at der ikke opkræves brugerbetaling af børnenes forældre for opholdet på Søgård.</p>

                <h3>Vores dedikation</h3>
                <p>Foreningens bestyrelse og frivillige hjælpere arbejder ulønnet for Foreningen. Medarbejderne fra institutionerne på foreningens lejre, får ikke kolonitillæg udbetalt af Foreningen.</p>

                <p>Det er primært virksomheder og støttemedlemmer, der finansierer foreningens drift og aktiviteter. Vi har heldigvis erfaret, at rigtig mange virksomheder er villige til at bakke op omkring lejren, ligesom vi håber på endnu flere private, passive støttemedlemmer.</p>

                <div className="about-cards cards">
                    <div className="about-card card">
                        <h3>Kontakt</h3>
                        <div className="about-contact-info">
                            <strong>Adresse:</strong><br />
                            Knud Bro Alle 1, st. mf.<br />
                            3660 Stenløse
                            <br /><br />
                            <strong>Telefon:</strong><br />
                            38 71 12 60
                        </div>
                    </div>
                    <div className="about-card card">
                        <h3>Åbningstider</h3>
                        <p>Sekretariatet har åbent efter aftale.</p>
                        <p>Foreningens formand er dagligt at træffe i sekretariatet.</p>
                    </div>
                    <div className="about-card card">
                        <h3>Vores mission</h3>
                        <p>At give dårligt stillede børn og unge en fantastisk oplevelse fyldt med glæde, fællesskab og positive minder.</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default About