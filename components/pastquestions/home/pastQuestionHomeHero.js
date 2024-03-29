import Container from "@components/container"

export default function PastQuestionHomeHero() {
    return (
        <div className="bg-gray-100 py-12 md:py-20">
            <Container>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold">Free WAEC and JAMB Past Questions</h1>
                <div className="text-md sm:text-lg md:text-xl">
                    We strive to bring WAEC and JAMB past questions to your screens. Here are freely provided past questions on Mathematics, Physics, Chemistry, and other subjects from over four years.
                </div>
            </Container>
        </div>
    )
}