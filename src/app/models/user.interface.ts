//Interface para el Login
//post
export interface User{ 
    "username": string,
    "password": string,
    "user_type": string
}
//array de permisos
export interface Permisos{
    "codigo": string,
    "nombre": string
}
//get
export interface UserResponse{
    "token": string,
    "user_id": number;
    "user_data": {
        "data": {
            "emp_id": number,
            "departamento":{
                "dep_id": number
            },
            "rol": {
                "rol_id": number
            }     
        }
        "permissions": Permisos
    }
}