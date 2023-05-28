import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
    {
        routeLink: '/tutor-academico',
        icon: 'fa-solid fa-house',
        label: 'Dashboard',
        role: 'Tutor Academico'
    },
    {
        routeLink: '/tutor-academico/registro-visitas/plan',
        icon: 'fas fa-clipboard-list card-icon',
        label: 'Seguimiento (Anexo 5)',
        role: 'Tutor Academico'
    },
    {
        routeLink: '/tutor-academico/calificacion/practica-tutor',
        icon: 'fas fa-clipboard-check card-icon',
        label: 'Evaluación Prácticas',
        role: 'Tutor Academico'
    },
    {
        routeLink: '/tutor-academico/plan-aprendizaje/practica-tutor',
        icon: 'fal fa-camera',
        label: 'Plan de aprendizaje',
        role: 'Tutor Academico'
    },
   
    {
        routeLink: '/responsable-empresa',
        icon: 'fa-solid fa-house',
        label: 'Dashboard',
        role: 'Responsable Empresa'
    },
    {
        routeLink: 'soli/listemp',
        icon: 'fas fa-paper-plane',
        label: 'Envio de Solicitud',
        role: 'Responsable Empresa'
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
        routeLink: '/responsable-empresa/practicas/lista-practicas',
        icon: 'fas fa-user-tie',
        label: 'Asignación Tutor Específico',
        role: 'Responsable Empresa',
    },
    {
        routeLink: '/practicante',
        icon: 'fa-solid fa-house',
        label: 'Dashboard',
        role: 'Practicante'
    },

    {

        routeLink: '/practicante/postulacion/seleccion-empresa',
        icon: 'fas fa-file-signature',
        label: 'Postulacion PPP',
        role: 'Practicante'
    },
    {
        routeLink: 'media',
        icon: 'fas fa-check accepted-icon',
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
        icon: 'fas fa-hard-hat card-icon',
        label: 'Induccion Salud Ocupacional',
        expanded: true,
        role: 'Practicante'
    },
    {
        routeLink: 'reporte/semanal',
        icon: 'fas fa-clipboard-list card-icon',
        label: 'Reporte Semanal de Actividades',
        role: 'Practicante'
    },
    {
        routeLink: 'anexos/lista-practicas',
        icon: 'fas fa-file-alt card-icon',
        label: 'Reporte Final',
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
    {
        routeLink: 'empresa/register-empresa',
        icon: 'fas fa-building',
        label: 'Ver Empresas',
        role: 'Responsable Practicas'
    },
    {
        routeLink: 'objetivos/registrar-objetivos',
        icon: 'fas fa-bullseye',
        label: 'Objetivos Segun Materia',
        role: 'Responsable Practicas'
    },
    {
        routeLink: '/encargado-practicas/actividades/actividad-propuesta',
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
        routeLink: 'convocatorias/lista-convocatorias',
        icon: 'fa-solid fa-person-circle-check',
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
        routeLink: '/tutor-especifico/calificacion/practica-tutor',
        icon: 'fas fa-clipboard-check card-icon',
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
