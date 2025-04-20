const apiUrl =
  "https://crm-webbapp-cch9asgnhdfba3c6.swedencentral-01.azurewebsites.net/api/users";
export const fetchUsers = async () => {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        "X-API-KEY": import.meta.env.VITE_X_API_KEY,
      },
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to fetch users");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
