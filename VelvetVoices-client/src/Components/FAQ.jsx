const FAQ = () => {
    return (
        <section className="  my-20">
            <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
                <h2 className="text-2xl font-semibold sm:text-4xl font-sedan text-blue-950">Frequently Asked Questions</h2>
                <p className="mt-4 mb-8 text-xl font-seaweed">Find answers to common questions about our survey platform and features.</p>
                <div className="space-y-4">
                    <details className="w-full border rounded-lg border-black">
                        <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">What is VelvetVoices?</summary>
                        <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">VelvetVoices is a platform that allows users to create, share, and participate in surveys. Our goal is to provide insightful data and opinions from a wide audience.</p>
                    </details>
                    <details className="w-full border rounded-lg border-black">
                        <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">How do I create an account?</summary>
                        <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">Creating an account is easy! Simply click on the `Sign Up` button on the homepage and fill in your details. You can also sign up using your social media accounts.</p>
                    </details>
                    <details className="w-full border rounded-lg border-black">
                        <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">Can I participate in surveys without an account?</summary>
                        <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">Yes, you can browse and view surveys without an account, but to participate and submit your responses, you need to create an account or log in. </p>
                    </details>
                    <details className="w-full border rounded-lg border-black">
                        <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">How do I create a survey?</summary>
                        <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">To create a survey, you need to be a registered user. Once logged in, go to your dashboard and click on the `Create Survey` button. Fill in the required details, add your questions, and publish your survey.</p>
                    </details>
                </div>
            </div>
        </section>
    );
};

export default FAQ;