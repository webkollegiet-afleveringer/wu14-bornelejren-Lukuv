import { useEffect, useRef, useState } from "react"
import { Link } from "react-router"

const AUTO_PLAY_DELAY = 4500
const DRAG_THRESHOLD = 45

function Home() {
    const galleryImages = [
        "/Billeder/Fotos/13226644_958660240918611_3434291679470295660_n.jpg",
        "/Billeder/Fotos/13255943_958660250918610_4280467747354417614_n.jpg",
        "/Billeder/Fotos/420605_371193742998600_251405456_n.jpg",
        "/Billeder/Fotos/57325198_2075682595883031_8842221344629194752_n.jpg",
        "/Billeder/Fotos/65597_371193986331909_1972008760_n.jpg",
        "/Billeder/Fotos/935231_371193959665245_700749190_n.jpg",
        "/Billeder/Fotos/936700_371193732998601_1760819839_n.jpg"
    ]

    const [activeIndex, setActiveIndex] = useState(0)
    const [dragOffset, setDragOffset] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const dragStartX = useRef(0)

    const goToNext = () => {
        setActiveIndex((previousIndex) => (previousIndex + 1) % galleryImages.length)
    }

    const goToPrevious = () => {
        setActiveIndex((previousIndex) => (previousIndex - 1 + galleryImages.length) % galleryImages.length)
    }

    const goToSlide = (index) => {
        setActiveIndex(index)
    }

    const handlePointerDown = (event) => {
        setIsDragging(true)
        setIsPaused(true)
        dragStartX.current = event.clientX
        setDragOffset(0)
    }

    const handlePointerMove = (event) => {
        if (!isDragging) {
            return
        }

        setDragOffset(event.clientX - dragStartX.current)
    }

    const finishDrag = () => {
        if (!isDragging) {
            return
        }

        if (dragOffset <= -DRAG_THRESHOLD) {
            goToNext()
        } else if (dragOffset >= DRAG_THRESHOLD) {
            goToPrevious()
        }

        setIsDragging(false)
        setDragOffset(0)
        setIsPaused(false)
    }

    useEffect(() => {
        if (isPaused || isDragging) {
            return undefined
        }

        const timer = window.setInterval(() => {
            setActiveIndex((previousIndex) => (previousIndex + 1) % galleryImages.length)
        }, AUTO_PLAY_DELAY)

        return () => {
            window.clearInterval(timer)
        }
    }, [galleryImages.length, isDragging, isPaused])

    return (
        <>
            <section className="home-hero hero">
                <h1>Velkommen til Børnelejren på Langeland</h1>
                <p>En velgørende forening der giver dårligt stillede børn og unge en fantastisk oplevelse i naturskønne omgivelser</p>
            </section>

            <section className="home-section section">
                <h2>Om børnelejren</h2>

                <div className="home-content-grid content-grid">
                    <div>
                        <p>Børnelejren på Langeland er en forening, der udelukkende har til formål at sende dårligt stillede børn og unge sammen med deres pædagoger på et ophold i landlige omgivelser på det naturskønne Sydlangeland.</p>

                        <p>Der er mange børn i verden, der ikke har det så godt, som de burde have det. Det gælder desværre også i Danmark. Der er børn med medfødte handicap, børn der er blevet alvorligt syge, børn der lider under omsorgssvigt eller bliver udsat for overgreb, børn der har mistet én af eller begge deres forældre, børn der er tvangsfjernet fra deres hjem og familie, børn der bliver mobbet i skolen, børn der vokser op i meget fattige familier, børn fra skilsmisse- og sammenbragte familier - vi kender allesammen et barn, der tilhører en af disse grupper, og det er disse børn, vi gerne vil gøre noget for.</p>

                        <p>Foreningen Børnelejren på Langeland samler penge ind fra erhvervslivet, fonde og private til at sende dårligt stillede børn på et velfortjent lejrophold på Søgård. <strong>Hjælp os med at hjælpe dem!</strong></p>
                    </div>

                    <div className="home-image image-container">
                        <img src="/Billeder/Fotos/65597_371193986331909_1972008760_n.jpg" alt="Børnelejren aktiviteter" />
                    </div>
                </div>

                <div className="home-cta">
                    <Link to="/sponsor" className="home-cta-button btn">Bliv sponsor nu</Link>
                </div>
            </section>

            <section className="home-gallery section">
                <h2>Glimt fra lejren</h2>
                <p className="home-gallery-intro">Et lille udpluk af stemningen, fællesskabet og oplevelserne på lejren.</p>

                <div
                    className="home-carousel"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => !isDragging && setIsPaused(false)}
                >
                    <button
                        type="button"
                        className="home-carousel-control home-carousel-control--prev"
                        aria-label="Forrige billede"
                        onClick={goToPrevious}
                    >
                        &#10094;
                    </button>

                    <div
                        className={`home-carousel-viewport ${isDragging ? "is-dragging" : ""}`}
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={finishDrag}
                        onPointerCancel={finishDrag}
                        onPointerLeave={finishDrag}
                    >
                        <div
                            className="home-carousel-track"
                            style={{
                                transform: `translateX(calc(-${activeIndex * 100}% + ${isDragging ? dragOffset : 0}px))`,
                                transition: isDragging ? "none" : "transform 0.45s ease"
                            }}
                        >
                            {galleryImages.map((image, index) => (
                                <figure key={image} className="home-gallery-item">
                                    <img
                                        src={image}
                                        alt={`Børnelejr billede ${index + 1}`}
                                        loading={index === 0 ? "eager" : "lazy"}
                                        onDragStart={(event) => event.preventDefault()}
                                    />
                                </figure>
                            ))}
                        </div>
                    </div>

                    <button
                        type="button"
                        className="home-carousel-control home-carousel-control--next"
                        aria-label="Næste billede"
                        onClick={goToNext}
                    >
                        &#10095;
                    </button>

                    <div className="home-carousel-dots" aria-label="Vælg billede i galleriet">
                        {galleryImages.map((image, index) => (
                            <button
                                key={image}
                                type="button"
                                className={`home-carousel-dot ${activeIndex === index ? "is-active" : ""}`}
                                aria-label={`Gå til billede ${index + 1}`}
                                aria-current={activeIndex === index}
                                onClick={() => goToSlide(index)}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home