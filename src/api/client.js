const apiUrl =
  "https://crm-webbapp-cch9asgnhdfba3c6.swedencentral-01.azurewebsites.net/api/clients";

export const fetchClients = async () => {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        "X-API-KEY": import.meta.env.VITE_X_API_KEY,
      },
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to fetch clients");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    return [];
  }
};
