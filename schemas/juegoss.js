import yup from 'yup';

export const juegoSchema = yup.object
({
    name: yup.string("llenar el campo").required("necesario"),

    genero: yup.string("llenar el campo").required("necesario"),

    desa: yup.string("llenar el campo").required("necesario"),

    edicion: yup.number("llenar el campo").required("necesario")
});

export const juegoActuSchema = yup.object
({
    name: yup.string("llenar el campo"),

    genero: yup.string("llenar el campo"),

    desa: yup.string("llenar el campo"),

    edicion: yup.number("llenar el campo")
});