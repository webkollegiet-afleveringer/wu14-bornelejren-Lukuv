import { useNavigate } from "react-router"
import { useState, useEffect } from "react"

function Sponsor() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        companyName: '',
        email: '',
        phone: '',
        address: '',
        amount: ''
    })
    const [sponsors, setSponsors] = useState([])

    useEffect(() => {
        const savedSponsors = localStorage.getItem('sponsors')
        if (savedSponsors) {
            try {
                const parsed = JSON.parse(savedSponsors)
                const normalizedSponsors = parsed.map((sponsor) => {
                    if (sponsor.supportType) {
                        return sponsor
                    }

                    return {
                        ...sponsor,
                        supportType: getSupportTypeFromAmount(sponsor.amount)
                    }
                })

                const sorted = normalizedSponsors.sort((a, b) => b.amount - a.amount)
                setSponsors(sorted)
                localStorage.setItem('sponsors', JSON.stringify(sorted))
            } catch (error) {
                console.error('Fejl ved læsning af sponsors fra localStorage:', error)
            }
        }
    }, [])

    const getSupportTypeFromAmount = (amountValue) => {
        const amount = Number(amountValue)

        if (Number.isNaN(amount) || amount <= 0) {
            return "Ikke valgt endnu"
        }
        if (amount >= 4000) {
            return "Børnesponsorat"
        }
        if (amount >= 2000) {
            return "Lejrsponsorat"
        }
        if (amount >= 1000) {
            return "Diplomsponsor"
        }

        return "Ikke berettiget (min. 1.000 kr.)"
    }

    const selectedSupportType = getSupportTypeFromAmount(formData.amount)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const newSponsor = {
            id: Date.now(),
            companyName: formData.companyName,
            amount: Number(formData.amount),
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            supportType: selectedSupportType,
            date: new Date().toISOString()
        }

        const savedSponsors = localStorage.getItem('sponsors')
        let allSponsors = []
        
        if (savedSponsors) {
            try {
                allSponsors = JSON.parse(savedSponsors)
            } catch (error) {
                console.error('Fejl ved læsning af localStorage:', error)
            }
        }
        
        allSponsors.push(newSponsor)
        const sorted = allSponsors.sort((a, b) => b.amount - a.amount)
        
        localStorage.setItem('sponsors', JSON.stringify(sorted))
        setSponsors(sorted)
        
        setFormData({
            companyName: '',
            email: '',
            phone: '',
            address: '',
            amount: ''
        })
        
        navigate("/thanks")
    }

    return (
        <>
            <section className="sponsor-hero hero">
                <h1>Bliv sponsor</h1>
                <p>Hjælp med at sende dårligt stillede børn på en uforglemmelig lejrtur</p>
            </section>

            <section className="sponsor-section section">
                <h2>Sponsormulighederne</h2>
                <p>
                    <strong>
                        Tilmelding som sponsor
                    </strong>
                </p>
                <p>
                    Da det er meget individuelt, hvor meget en virksomhed kan og ønsker at støtte med, har vi
                    opdelt støttemulighederne i 3 kategorier:
                </p>

                <div className="sponsor-cards cards">
                    <div className="sponsor-card card">
                        <h3>🧒 Børnesponsorat</h3>
                        <p><strong>Fra 4.000 kr.</strong></p>
                        <p>Dækk omkostningerne for et navngivet barns ophold og transport til og fra Langeland.</p>
                        <p>Inkluderer transport, forplejning, forsikring, udflugter, adgangsbilletter og små gaver.</p>
                    </div>

                    <div className="sponsor-card card">
                        <h3>⛺ Lejrsponsorat</h3>
                        <p><strong>Fra 2.000 kr.</strong></p>
                        <p>Vær med til at dække all omkostningerne ved børnelejren.</p>
                        <p>Hjælper til drifts- og vedligeholdelsesomkostninger samt specialuddannet personale.</p>
                    </div>

                    <div className="sponsor-card card">
                        <h3>🎖️ Støtte til foreningen </h3>
                        <p><strong>Fra 1.000 kr.</strong></p>
                        <p>Støt foreningens arbejde med et mindre beløb.</p>
                        <p>Modtag et trykt diplom til ophængning i virksomheden.</p>
                    </div>
                </div>

                <h2>Nuværende sponsorer</h2>
                {sponsors.length > 0 ? (
                    <table className="sponsor-list">
                        <tr className="sponsor-list-header">
                            <th className="sponsor-list-name">Firmanavn</th>
                            <th className="sponsor-list-type">Sponsortype</th>
                            <th className="sponsor-list-amount">Beløb</th>
                        </tr>
                        {sponsors.map((sponsor) => (
                            <tr key={sponsor.id} className="sponsor-list-item">
                                <td className="sponsor-list-name">{sponsor.companyName}</td>
                                <td className="sponsor-list-type">{sponsor.supportType}</td>
                                <td className="sponsor-list-amount">{sponsor.amount.toLocaleString('da-DK')} kr.</td>
                            </tr>
                        ))}
                    </table>
                ) : (
                    <p className="sponsor-list-empty">Ingen sponsorer endnu. Vær den første!</p>
                )}

                <h2>Tilmeld dig som sponsor</h2>

                <form onSubmit={handleSubmit} className="sponsor-form">
                    <div className="sponsor-form-grid">
                        <div className="sponsor-form-group form-group">
                            <label htmlFor="companyName">Firmanavn *</label>
                            <input
                                id="companyName"
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                required
                                placeholder="Skriv virksomhedens navn"
                                className="sponsor-form-input"
                            />
                        </div>

                        <div className="sponsor-form-group form-group">
                            <label htmlFor="phone">Telefon *</label>
                            <input
                                id="phone"
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                placeholder="Telefonnummer"
                                className="sponsor-form-input"
                            />
                        </div>

                        <div className="sponsor-form-group form-group">
                            <label htmlFor="email">Email *</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="virksomhed@eksempel.dk"
                                className="sponsor-form-input"
                            />
                        </div>

                        <div className="sponsor-form-group form-group">
                            <label htmlFor="address">Adresse *</label>
                            <input
                                id="address"
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                placeholder="Virksomhedens adresse"
                                className="sponsor-form-input"
                            />
                        </div>

                        <div className="sponsor-form-group form-group sponsor-form-group--full">
                            <label htmlFor="amount">Beløb (kr.) *</label>
                            <input
                                id="amount"
                                type="number"
                                name="amount"
                                min="1"
                                value={formData.amount}
                                onChange={handleChange}
                                required
                                placeholder="Hvilket beløb ønsker i at sponsorere med?"
                                className="sponsor-form-input"
                            />
                        </div>

                        <div className="sponsor-form-group form-group sponsor-form-group--full">
                            <label htmlFor="calculatedSupportType">Beregnet sponsorpakke</label>
                            <input
                                id="calculatedSupportType"
                                type="text"
                                value={selectedSupportType}
                                readOnly
                                className="sponsor-form-input sponsor-form-input--readonly"
                            />
                        </div>
                    </div>

                    <button type="submit" className="sponsor-form-button btn">Tilmeld som sponsor</button>
                </form>
            </section>
        </>
    )
}

export default Sponsor