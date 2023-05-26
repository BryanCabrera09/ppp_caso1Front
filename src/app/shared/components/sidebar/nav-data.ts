import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
    {
        routeLink: '/tutor-academico',
        icon: 'fa-solid fa-house',
        label: 'Dashboard',
        role: 'Tutor Academico'
    },
    {
        routeLink: '/d',
        icon: 'fa-solid fa-house',
        label: 'Seguimiento (Anexo 5)',
        role: 'Tutor Academico'
    },
    {
        routeLink: '/da',
        icon: 'fa-solid fa-house',
        label: 'Evaluación de Prácticas',
        role: 'Tutor Academico'
    },
    {
        routeLink: 'anexos/anexocho',
        icon: 'fa-solid fa-house',
        label: 'Reporte Final',
        role: 'Tutor Academico'
    },
    {
        routeLink: '/responsable-empresa',
        icon: 'fa-solid fa-house',
        label: 'Dashboard',
        role: 'Responsable Empresa'
    },
    {
        routeLink: 'products',
        icon: 'fal fa-box-open',
        label: 'Envio de Solicitud',
        role: 'Responsable Empresa',
        items: [
            {
                routeLink: 'products/level1.1',
                label: 'Registro Solicitud',
            },
            {
                routeLink: 'products/level1.2',
                label: 'Lista Solicitud',
            }
        ]
    },
    {
        routeLink: 'statistics',
        icon: 'fal fa-chart-bar',
        label: 'Seleccion de Estudiantes',
        role: 'Responsable Empresa',
        items: [
            {
                routeLink: 'products/level1.1',
                label: 'Proceso de Selección',
            },
            {
                routeLink: 'products/level1.2',
                label: 'Lista Estudiantes',
            }
        ]
    },
    {
        routeLink: 'coupens',
        icon: 'fal fa-tags',
        label: 'Asignación Tutores Especificos y Generales',
        role: 'Responsable Empresa',
    },
    {
        routeLink: '/practicante',
        icon: 'fa-solid fa-house',
        label: 'Dashboard',
        role: 'Practicante'
    },
    {
        routeLink: 'postulacion/postulacion-estudiante',
        icon: 'fas fa-file',
        label: 'Postulacion PPP',
        role: 'Practicante'
    },
    {
        routeLink: 'media',
        icon: 'fal fa-camera',
        label: 'Solicitudes Aceptadas/Rechazadas',
        role: 'Practicante'
    },
    {
        routeLink: 'generate/report',
        icon: 'fas fa-book',
        label: 'Obligaciones del Estudiante',
        role: 'Practicante'
    },
    {
        routeLink: 'salud/report',
        icon: 'fal fa-cog',
        label: 'Induccion Salud Ocupacional',
        expanded: true,
        role: 'Practicante'
    },
    {
        routeLink: 'media',
        icon: 'fal fa-camera',
        label: 'Reporte Semanal de Actividades',
        role: 'Practicante'
    },
    {
        routeLink: 'practica/calificacion-practicante',
        icon: 'fas fa-star',
        label: 'Ver Calificación Final',
        role: 'Practicante'
    },
    {
        routeLink: '/encargado-practicas',
        icon: 'fa-solid fa-house',
        label: 'Dashboard',
        role: 'Responsable Practicas'
    },
    /* {
        routeLink: 'media',
        icon: 'fas fa-chalkboard-teacher',
        label: 'Designación Tutores',
        items: [
            {
                routeLink: 'practicas/lista-practicas',
                label: 'Designación Tutor',
                role: 'Responsable Practicas'
            },
            {
                routeLink: 'coupens/create',
                label: 'Listado Tutores',
                role: 'Responsable Practicas'
            }
        ],
        role: 'Responsable Practicas',
    }, */
    {
        routeLink: 'empresa/register-empresa',
        icon: 'fas fa-building',
        label: 'Ver Empresas',
        role: 'Responsable Practicas'
    },
    {
        routeLink: 'media',
        icon: 'fas fa-bullseye',
        label: 'Objetivos Segun Materia',
        role: 'Responsable Practicas'
    },
    {
        routeLink: 'media',
        icon: 'fas fa-tasks',
        label: 'Actividades Propuestas',
        role: 'Responsable Practicas'
    },
    {
        routeLink: 'convocatoria/lista',
        icon: 'fas fa-file-signature',
        label: 'Generar Convocatoria',
        role: 'Responsable Practicas'
    },
    {
        routeLink: 'convocatorias/lista-convocatorias',
        icon: 'fa-solid fa-person-circle-check',
        label: 'Convocatorias',
        role: 'Responsable Practicas'
    },
    {
        routeLink: 'empresa/solicitud-empresa',
        icon: 'fas fa-check-circle',
        label: 'Solicitudes Empresas',
        role: 'Responsable Practicas'
    },
    {
        routeLink: '/director-carrera',
        icon: 'fa-solid fa-house',
        label: 'Dashboard',
        role: 'Director Carrera'
    },
    {
        routeLink: 'convocatorias/lista-convocatoria',
        icon: 'fal fa-camera',
        label: 'Solicitudes Practicantes',
        role: 'Director Carrera'
    },
    {
        routeLink: '/responsable-empresa',
        icon: 'fa-solid fa-house',
        label: 'Dashboard',
        role: 'Tutor Especifico'
    },
    {
        routeLink: 'media',
        icon: 'fal fa-camera',
        label: 'Evaluación del Estudiante',
        role: 'Tutor Especifico'
    },
    {
        routeLink: '/sup-admin',
        icon: 'fa-solid fa-house',
        label: 'Dashboard',
        role: 'Administrador'
    },
    {
        routeLink: '/sup-admin/register',
        icon: 'fas fa-users',
        label: 'Asignar Usuarios',
        role: 'Administrador'
    },
    {
        routeLink: '/sup-admin/list-users',
        icon: 'fas fa-address-book',
        label: 'Listado Usuarios',
        role: 'Administrador'
    },
];