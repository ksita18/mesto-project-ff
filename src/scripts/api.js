const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-12",
  headers: {
    authorization: "3c4d4007-3d18-45e0-a9dc-c82c5cee4085",
    "Content-Type": "application/json",
  },
};

export function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так. Ошибка: ${res.status}`);
}

export function apiRequest(apiRequestSettings) {
  return fetch(`${config.baseUrl}/${apiRequestSettings.url}`, {
    method: `${apiRequestSettings.method}`,
    headers: config.headers,
    body: JSON.stringify(apiRequestSettings.body),
  }).then(handleResponse);
}
