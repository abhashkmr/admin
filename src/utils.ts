import bcrypt from 'bcrypt'

export async function hashPassword(password: string) {
    const saltRounds = 10
    return await bcrypt.hash(password, saltRounds)
}

export async function comparePasswords(
    plaintextPassword: string,
    hashedPassword: string
) {
    return await bcrypt.compare(plaintextPassword, hashedPassword)
}

export function validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}
