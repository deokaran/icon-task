export default function Location() {
    return (
        <section id="location" className="w-full max-w-4xl mx-auto px-4 sm:px-6 my-10 sm:my-16">
            <h3 className="text-2xl sm:text-3xl font-bold font-['Orbitron'] text-center mb-2">
                Campus Location
            </h3>
            <p className="text-center text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mb-6">
                How to Reach?
            </p>
            <div className="w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-md border border-zinc-200 dark:border-zinc-800">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7541.587943182015!2d72.897806!3d19.072794!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c89d872d6e89%3A0x2d6190e60dcda447!2sK%20J%20Somaiya%20Institute%20of%20Management!5e0!3m2!1sen!2sin!4v1789304839951!5m2!1sen!2sin"
                    width="100%"
                    height="280"
                    style={{ border: 0 }}
                    loading="lazy"
                    className="w-full block"
                    title="Somaiya Campus Location"
                />
            </div>
        </section>
    );
}