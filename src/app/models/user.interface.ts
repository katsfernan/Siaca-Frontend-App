

export interface User{ 
    "username": string,
    "password": string,
    "user_type": string
}

export interface Permisos{
    "codigo": string,
    "nombre": string
}

export interface UserResponse{
    "token": string,
    "user_id": number;
    "user_data": {
        "data": {
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