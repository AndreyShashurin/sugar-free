
export interface UserCreate {
    username: string,
    password: string,
    email: string
}
export interface UserCreateResult {
    id: string,
    is_authenticated: string,
}