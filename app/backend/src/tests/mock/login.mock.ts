export const loginMockValid = {
  email: "admin@admin.com",
  password: "secret_admin"
}

export const tokenValidAdmin = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjg2ODY0NzIyfQ.tjvXMW12augxk7baksjyAE9OXL0IpWh5AOUBw7Qr9K4'

export const loginMockInvlidEmail = {
  "email": "adminadmin.com",
  "password": "secret_admin"
}

export const loginMockInvlidPassword = {
  "email": "admin@admin.com",
  "password": "secretadmin"
}

export const loginMockWithoutEmail = {
  "password": "secret_admin"
}

export const loginMockWithoutPassword = {
  "email": "admin@admin.com"
}