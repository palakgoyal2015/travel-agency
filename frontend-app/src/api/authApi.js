const BASE_URL = 'http://localhost:8080/api/v1';

export async function signUp({ firstName, lastName, email, password }) {
    const response = await fetch(`${BASE_URL}/auth/sign-up`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw { status: response.status, message: data.message };
    }

    return data;
}
