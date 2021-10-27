export interface FacturaVenta {
    "fac_doc_num": number,
    "fac_fecha_emi": Date,
    "fac_fecha_venc": Date,
    "fac_fecha_reg": Date,
    "fac_num_control":  string,
    "fac_tasa": number,
    "fac_total_bruto":number,
    "fac_monto_imp": number,
    "fac_monto_total": number,
    "clienteDesc":string,
    "clienteDocNum":string,
    "clienteDireccion":string,
    "clienteTelefonos":string,
    "condicionPagoDesc":string,

}

export interface FacturaVentaRenglon {
    "facren_id": number,
    "facren_reng_num": number,
    "facren_cod_alm": number,
    "facren_total_art": number,
    "facren_precio_venta": number,
    "facren_porc_imp": number,
    "facren_monto_imp": number,
    "facren_reng_neto": number,
    "facren_pendiente": number, 
    "facren_comentario": string,
    "facren_fac_doc_fk": number,
    "articuloCod": string,
    "articuloDesc": string
}

export interface FacturaVentaRenglonItems extends Array<FacturaVentaRenglon> {}

export interface FacturaVentaReporte {
    "encabezado": FacturaVenta,
    "renglon": FacturaVentaRenglonItems
}