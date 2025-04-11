import axios from "axios";

const checkDuplicate = async(company, role) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/applications`)
        const applications = Object.values(res.data);
        console.log(applications);
        return applications.some((application) => application.company === company && application.role === role);
    } catch (error) {
        console.error("Error fetching applications:", error);
        alert("Failed to fetch applications. Please try again.");
    }
};

export { checkDuplicate };