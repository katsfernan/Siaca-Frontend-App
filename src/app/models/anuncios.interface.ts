
//Inteface para los anuncios 
//post
export interface Anuncio{
    
        "anu_titulo": string,
        "anu_mensaje": string
        "id": string
    
} 

//get
export interface Mensaje{
    
        "anu_id": string ,
        "anu_titulo": string,
        "anu_mensaje": string,
        "anu_fecha_modif": string,
        "anu_status": boolean,
        "anu_usu_modif_fk": number
    
}

//post
export interface Actualizar{
        "anuncio_id": string
}