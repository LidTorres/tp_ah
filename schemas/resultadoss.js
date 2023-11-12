import yup from 'yup';

export const resultadoSchema = yup.object
({
    Jugabilidad: yup.number().min(1).max(10, 'selecione un numero entre 1 a 10').required("necesario"),

    Arte: yup.number().min(1).max(10, 'selecione un numero entre 1 a 10').required("necesario"),

    Sonido: yup.number().min(1).max(10, 'selecione un numero entre 1 a 10').required("necesario"),
    
    Tematica: yup.number().min(1).max(10, 'selecione un numero entre 1 a 10').required("necesario"),
});
