import { useEffect, useState } from "react";

const UseProjects = () => {
  const [projects, setProjects] = useState([]);
  //   const [loading, setLoading] = useState(true);
  const apiUrl = "https://localhost:7285/api/projects";

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch projects");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return { projects };
};

export default UseProjects;
