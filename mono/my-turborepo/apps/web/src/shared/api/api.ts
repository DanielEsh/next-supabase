import axios from 'axios'

export const $api = axios.create({
  baseURL: 'http://localhost:8000',
})

$api.interceptors.request.use(
  (config) => {
    const ACCESS_TOKEN =
      'eyJhbGciOiJIUzI1NiIsImtpZCI6ImxjZmFNcHBtR3greEN3ZnciLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzEyNTA3MDUzLCJpYXQiOjE3MTI1MDM0NTMsImlzcyI6Imh0dHBzOi8vaGJuYWJ3eGJmYnRzbWZvZ2J5dGguc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjA1Y2JjN2Y3LTVhYmQtNDE1OS04MWMxLWQ2NDMzYmUzMjZjYiIsImVtYWlsIjoiam9uQHN1cGFiYXNlLmNvbTIiLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7ImVtYWlsIjoiam9uQHN1cGFiYXNlLmNvbTIiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcnN0X25hbWUiOiJmbmFtZSIsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwic3ViIjoiMDVjYmM3ZjctNWFiZC00MTU5LTgxYzEtZDY0MzNiZTMyNmNiIiwidXNlcm5hbWUiOiJ1c2VybmFtZSJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzEyNTAzNDUzfV0sInNlc3Npb25faWQiOiIzOWYyZmJkMC1kYTEwLTRkODAtODI0NS1kZGUyNzZmYjg1ZmUiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.lD-cO165X_bllvERpxoMfkggID09IlyyFkm9T5-pYO8'
    if (ACCESS_TOKEN && config.url !== 'auth/refresh') {
      config.headers['Authorization'] = `Bearer ${ACCESS_TOKEN}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
