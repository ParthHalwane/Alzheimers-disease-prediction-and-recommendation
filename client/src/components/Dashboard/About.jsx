const About = ({ setActiveTab }) => (
    <div>
        <h1 className="text-2xl font-bold mb-4">About</h1>
        <p className="text-gray-700 mb-4">
            This application helps detect early signs of Alzheimer’s through cognitive testing.
            It securely stores and analyzes test results to provide insights to users.
        </p>
        <h2 className="text-xl font-semibold mb-2">Key Features:</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Easy-to-use cognitive test interface.</li>
            <li>Secure data storage in MongoDB Atlas.</li>
            <li>Personalized history tracking.</li>
            <li>Health tips and brain exercises.</li>
        </ul>
    </div>
);

export default About;
