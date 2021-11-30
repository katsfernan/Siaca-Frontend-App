import { Proveedor } from "./user.interface";

export interface PagoRetencionIva {
    "pagRetIva_doc_num": number,
    "pagRetIva_periodo": string,
    "pagRetIva_fecha_doc": Date,
    "pagRetIva_doc_num_control": string,
    "pagRetIva_nro_doc_afectado":string,
    "pagRetIva_monto_documento":number,
    "pagRetIva_base_imponible": number,
    "pagRetIva_monto_ret_imp": number,
    "pagRetIva_num_comprobante": number,
    "pagRetIva_alicuota": number,
    "provDesc": string,
    "provRif":string,
    "provDireccion": string
} 

export interface PagoRetencionISLR {
    "pagRentReng_co_islr": string,
    "pagRentReng_monto": number,
    "pagRentReng_monto_reten": number,
    "pagRentReng_sustraendo": number,
    "pagRentReng_porc_retn": number,

    "fecha": Date,
    "numPago": string,
    "tipoPago": string,
    "nroDoc": string,
    // "nroControl": string,
}

export interface PagoRetencionISLRReporte {
    "proveedor" : Proveedor,
    "pagos": PagoRetencionISLR[]
}

