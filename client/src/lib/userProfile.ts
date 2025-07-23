export async function getUserById(userId: number, token: string) {
  const res = await fetch(`http://localhost:5000/api/v1/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }

  return await res.json();
}

export async function updateUserById(userId: number, token: string, data: any) {
  const res = await fetch(`http://localhost:5000/api/v1/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update user");
  }

  return await res.json();
}
