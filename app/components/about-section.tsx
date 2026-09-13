export default function About() {
    return (
        <section id="about" className="w-full py-10 sm:py-16">
            <div className="my-10 sm:my-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center">
                <div className="about-icon order-1">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-[Orbitron]">
                        About ICON
                    </h2>
                    <p className="my-5 text-sm sm:text-base leading-relaxed">
                        ICON is the official techfest of Department of Data Science and Technology , it has always been our primary motive to encourage scientific thinking, innovation, creativity and some good old-fashioned fun.
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">
                        At ICON, competitions are just a medium to bridge the way to inspire new ideas and get new learning experience from peers and experts alike. We create a platform where all youth are welcomed to exhibit their skills and explore their potential, while uplifting the festive spirit all along.
                    </p>
                </div>

                <div className="order-2 flex justify-center">
                    <img 
                        src="/old-images/5.webp" 
                        alt="About ICON" 
                        className="w-full max-w-lg h-auto rounded-2xl shadow-md object-cover" 
                    />
                </div>
            </div>

            <div className="my-10 sm:my-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center">
                <div className="order-2 md:order-1 flex justify-center">
                    <img 
                        src="/old-images/11.webp" 
                        alt="About the Theme" 
                        className="w-full max-w-lg h-auto rounded-2xl shadow-md object-cover" 
                    />
                </div>

                <div className="about-icon order-1 md:order-2">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-[Orbitron]">
                        About the Theme
                    </h2>
                    <p className="my-5 text-sm sm:text-base leading-relaxed">
                        ICON 2026 embraces DATATRON, a celebration of the ever-expanding world of data and the intelligent systems that power our future. In an era where information drives innovation, DATATRON represents the fusion of data, automation, and futuristic technology. The theme highlights how data transforms industries, fuels AI, shapes digital experiences, and accelerates human progress. Through workshops, competitions, and interactive showcases, ICON 2026 invites participants to explore the engines behind modern tech from machine learning and analytics to automation and cyber intelligence. DATATRON is not just a theme; it’s a journey into the core of tomorrow’s digital revolution.
                    </p>
                </div>
            </div>

            <div className="my-10 sm:my-20">
                <div className="about-icon">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-[Orbitron]">
                        About KJSIM
                    </h2>
                    <p className="my-5 text-sm sm:text-base leading-relaxed">
                        ICON 2026 embraces DATATRON, a celebration of the ever-expanding world of data and the intelligent systems that power our future. In an era where information drives innovation, DATATRON represents the fusion of data, automation, and futuristic technology. The theme highlights how data transforms industries, fuels AI, shapes digital experiences, and accelerates human progress. Through workshops, competitions, and interactive showcases, ICON 2026 invites participants to explore the engines behind modern tech from machine learning and analytics to automation and cyber intelligence. DATATRON is not just a theme; it’s a journey into the core of tomorrow’s digital revolution.
                    </p>
                </div>
            </div>
        </section>
    );
}
