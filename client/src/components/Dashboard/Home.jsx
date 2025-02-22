const Home = ({ setActiveTab }) => (
<div>
    <h1 className="text-2xl font-bold mb-4">Home</h1>
    <div className="p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Alzheimer's Detection</h1>
        
        <p className="text-gray-600 mb-4">
            Our platform helps assess cognitive health by analyzing responses to a simple test. 
            This tool is designed to provide insights into early signs of Alzheimer's disease. 
            It is not a medical diagnosis but can serve as an initial assessment.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mb-2">How It Works</h2>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
            <li>Click on the <strong>"Take a Test"</strong> button to start the cognitive test.</li>
            <li>Answer a series of simple numeric-based questions.</li>
            <li>Your results will be processed and stored securely.</li>
            <li>You can view your previous test history under the <strong>"History"</strong> tab.</li>
            <li>Check out the <strong>"Tips"</strong> and <strong>"Exercise"</strong> sections for brain health improvement.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Why Early Detection Matters</h2>
        <p className="text-gray-600 mb-4">
            Early detection of Alzheimer's can help in better management and treatment. 
            Cognitive tests are an easy way to track memory and thinking abilities over time.
        </p>
    </div>
    </div>
);

export default Home;
