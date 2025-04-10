import { useEffect, useState } from "react";

export const UseProjects = () => {
  const [projects, setProjects] = useState([]);
  //const [loading, setLoading] = useState(true);
  const apiUrl = "https://localhost:7285/api/projects";

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      setProjects(data);

      return data;
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const updateProject = async (projectId, updatedData) => {
    try {
      const response = await fetch(`${apiUrl}/${projectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error("Failed to update project");
      const updatedProject = await response.json();
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === projectId ? updatedProject : project
        )
      );
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };
  const addProject = async (newProject) => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      });
      if (!response.ok) throw new Error("Failed to add project");
      const result = await response.text();
      console.log(result);
      fetchProjects();
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };
  return {
    projects,
    fetchProjects,
    updateProject,
    addProject,
  };
};
