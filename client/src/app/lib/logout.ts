export async function logoutUser() {
  try {
    const res = await fetch('/auth/logout', {
      method: 'POST',
    });

    if (!res.ok) throw new Error('Logout API failed');
  } catch (err) {
    console.error('Client logout error:', err);
  }
}
