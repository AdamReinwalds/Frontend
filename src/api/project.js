const apiUrl =
  "https://crm-webbapp-cch9asgnhdfba3c6.swedencentral-01.azurewebsites.net/api/projects";

export const fetchProjectById = async (projectId) => {
  try {
    const response = await fetch(`${apiUrl}/${projectId}`, {
      headers: {
        "X-API-KEY": import.meta.env.VITE_X_API_KEY,
      },
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to fetch project");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching project:", error);
  }
};

export const fetchProjects = async () => {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        "X-API-KEY": import.meta.env.VITE_X_API_KEY,
      },
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to fetch projects");
    const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
};

export const updateProject = async (updatedData) => {
  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": import.meta.env.VITE_X_API_KEY,
      },
      credentials: "include",
      body: JSON.stringify(updatedData),
    });
    if (response.ok) "Project updated successfully";
    else throw new Error("Failed to update project");
  } catch (error) {
    console.error("Error updating project:", error);
  }
};

export const addProject = async (newProject) => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": import.meta.env.VITE_X_API_KEY,
      },
      credentials: "include",
      body: JSON.stringify(newProject),
    });
    if (!response.ok) throw new Error("Failed to add project");
  } catch (error) {
    console.error("Error adding project:", error);
  }
};

export const deleteProject = async (projectId) => {
  try {
    const response = await fetch(`${apiUrl}/${projectId}`, {
      method: "DELETE",
      headers: {
        "X-API-KEY": import.meta.env.VITE_X_API_KEY,
      },
    });
    if (!response.ok) throw new Error("Failed to delete project");
  } catch (error) {
    console.error("Error deleting project:", error);
  }
};
