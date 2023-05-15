import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
    {
        routeLink: '/home',
        icon: 'fal fa-home',
        label: 'Dashboard',
        role: 'admin'
    },
    {
        routeLink: '/d',
        icon: 'fal fa-home',
        label: 'Seguimiento (Anexo 5)',
        role: 'Tutor Academico'
    },
    {
        routeLink: '/da',
        icon: 'fal fa-home',
        label: 'Evaluación de Prácticas',
        role: 'Tutor Academico'
    },
    {
        routeLink: '/sds',
        icon: 'fal fa-home',
        label: 'Reporte Final',
        role: 'Tutor Academico'
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
                /* items: [
                    {
                        routeLink: 'products/level2.1',
                        label: 'Level 2.1',
                    },
                    {
                        routeLink: 'products/level2.2',
                        label: 'Level 2.2',
                        items: [
                            {
                                routeLink: 'products/level3.1',
                                label: 'Level 3.1'
                            },
                            {
                                routeLink: 'products/level3.2',
                                label: 'Level 3.2'
                            }
                        ]
                    }
                ] */
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
        routeLink: '/encargado-practicas/empresa/register',
        icon: 'fal fa-file',
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
        routeLink: 'media',
        icon: 'fal fa-camera',
        label: 'Obligaciones del Estudiante',
        role: 'Practicante'
    },
    {
        routeLink: 'settings',
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
        routeLink: 'media',
        icon: 'fal fa-camera',
        label: 'Ver Calificación Final',
        role: 'Practicante'
    },
    {
        routeLink: 'media',
        icon: 'fal fa-camera',
        label: 'Designación Tutor Academico',
        items: [
            {
                routeLink: 'coupens/list',
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
    },
    {
        routeLink: 'media',
        icon: 'fal fa-camera',
        label: 'Objetivos Segun Materia',
        role: 'Responsable Practicas'
    },
    {
        routeLink: 'media',
        icon: 'fal fa-camera',
        label: 'Actividades Propuestas',
        role: 'Responsable Practicas'
    },
    {
        routeLink: 'media',
        icon: 'fal fa-camera',
        label: 'Generar Convocatoria',
        role: 'Responsable Practicas'
    },
    {
        routeLink: 'convocatorias/lista-convocatorias',
        icon: 'fal fa-camera',
        label: 'Aprovación de Solicitudes Practicantes',
        role: 'Responsable Practicas'
    },
    {
        routeLink: 'media',
        icon: 'fal fa-camera',
        label: 'Elección Estudiantes',
        role: 'Director Carrera'
    },
    {
        routeLink: 'media',
        icon: 'fal fa-camera',
        label: 'Evaluación del Estudiante',
        role: 'Tutor Empresarial'
    },
];