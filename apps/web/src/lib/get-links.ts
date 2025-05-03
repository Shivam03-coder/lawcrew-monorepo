// lib/user-links.ts
export const getUserLinks = (role?: string, userId?: string) => {
    if (!role || !userId) return null
  
    const basePath = `/legal-management/${role.toLowerCase()}/${userId}`
  

  }
  