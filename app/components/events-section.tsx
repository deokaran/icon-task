"use client";

const CodeEditorCard = () => {
    const sections = [
        {
            name: "Technical Events",
            cards: [
                {
                    title: "CodeIcon",
                    subtitle: "Hackathon",
                    image: "/events/Icon_Hackathon.jpeg",
                    date: "13 February 2026",
                    registration: "₹500",
                    prize: "₹15,000 / ₹5,000 / ₹2,500",
                    teamSize: "2 to 4",
                    venue: "K J Somaiya Institute of Management",
                },
            ],
        },

        {
            name: "Non-Technical Events",
            cards: [
                {
                    title: "Treasure Hunt",
                    image: "/events/Icon_TreasureHunt.jpeg",
                    date: "14 February 2026",
                    registration: "₹250",
                    prize: "₹2,000",
                    teamSize: "3",
                    venue: "K J Somaiya Institute of Management",
                },
                {
                    title: "Tech Fair",
                    image: "/events/icon_techfair.png",
                    date: "13 February 2026",
                    venue: "Amphitheatre, K J Somaiya Institute of Management",
                },
            ],
        },

        {
            name: "Gaming Events",
            cards: [
                {
                    title: "Pickleball",
                    image: "/events/pickleball.jpeg",
                    date: "14 February 2026",
                    registration: "₹200",
                    prize: "₹2,000",
                    venue: "Pickleball Court",
                },
                {
                    title: "FIFA",
                    image: "/events/fifa.jpeg",
                    date: "14 February 2026",
                    registration: "₹120",
                    prize: "₹2,000",
                    venue: "K J Somaiya Institute of Management",
                },
                {
                    title: "Football",
                    image: "/events/football.jpeg",
                    date: "13 February 2026",
                    registration: "₹500",
                    prize: "₹5,000",
                    teamSize: "8",
                    venue: "K J Somaiya Institute of Management",
                },
                {
                    title: "Chess",
                    image: "/events/Icon_chess.jpeg",
                    date: "14 February 2026",
                    registration: "₹100",
                    prize: "₹1,000",
                    venue: "K J Somaiya Institute of Management",
                },
            ],
        },
    ];

    return (
        <section className="w-full px-6 pb-10">
            <h1 className="mb-10 text-center text-4xl font-bold text-blue-900">
                ICON Events
            </h1>

            <div className="mx-auto flex max-w-6xl flex-col gap-16">

                {sections.map((section) => (
                    <div key={section.name}>

                        {/* Section heading */}
                        <h2 className="mb-6 text-3xl font-bold text-blue-900">
                            {section.name}
                        </h2>

                        {/* Horizontal card scroll */}
                        <div className="overflow-x-auto pb-4">
                            <div className="flex gap-6">

                                {section.cards.map((card) => (
                                    <div
                                        key={card.title}
                                        className="w-[300px] shrink-0 overflow-hidden rounded-xl border border-black/10 bg-white shadow-md md:w-[350px]"
                                    >
                                        <img
                                            src={card.image}
                                            alt={card.title}
                                            className="h-auto w-full object-contain"
                                        />

                                        <div className="border-t border-black/10 p-5">
                                            <h3 className="text-2xl font-medium text-[#be2635]">
                                                {card.title}
                                            </h3>

                                            <div className="mt-4 space-y-1 text-sm text-gray-600">
                                                {card.date && (
                                                    <p>{card.date}</p>
                                                )}

                                                {card.registration && (
                                                    <p>
                                                        Registration:{" "}
                                                        {card.registration}
                                                    </p>
                                                )}

                                                {card.prize && (
                                                    <p>
                                                        Prize Pool:{" "}
                                                        {card.prize}
                                                    </p>
                                                )}

                                                {card.teamSize && (
                                                    <p>
                                                        Team Size:{" "}
                                                        {card.teamSize}
                                                    </p>
                                                )}

                                                {card.venue && (
                                                    <p>{card.venue}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </section>
    );
};

export default CodeEditorCard;