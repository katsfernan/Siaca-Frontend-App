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

export interface Proveedor {
    "pro_cod": string,
    "pro_rif": number,
    "pro_descripcion": string,
    "pro_direc1": string,
    "pro_direc2": string | null,
    "pro_estatus": boolean,
    "rol": {
        "rol_id": number,
        "rol_nombre": string,
        "rol_descripcion": string,
        "rol_fecha_modif": Date,
        "rol_estatus": boolean
    }

}