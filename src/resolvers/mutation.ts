import { IResolvers } from 'graphql-tools';
import _ from 'lodash';
import { database } from '../data/data.store';

const mutation : IResolvers = {
    Mutation: {
        cursoNuevo(__: void, { curso }): any {
            const itemCurso = {
                id: String(database.cursos.length + 1),
                title: curso.title,
                description: curso.description,
                clases: curso.clases,
                time: curso.time,
                level: curso.level,
                logo: curso.logo,
                path: curso.path,
                teacher: curso.teacher,
                reviews: []
            }

            if (database.cursos.filter(itemCurs => itemCurs.title === itemCurso.title).length === 0) {
                database.cursos.push(itemCurso);
                return itemCurso;
            }
            return respuestaError("Ya existe un curso con este título");
        },
        modificarCurso(__: void, { curso }) : any {
            const elementoExiste = _.findIndex(database.cursos, function(o) {
                return o.id === curso.id;
            });
            if (elementoExiste > -1) {
                const valoraciones = database.cursos[elementoExiste].reviews;
                curso.reviews = valoraciones;
                database.cursos[elementoExiste] = curso;
                return curso;
            }
            return respuestaError("No se ha encotrado el curso en la BD");
        },
        eliminarCurso(__: void, { id }) : any {
            const borrarCurso = _.remove(database.cursos, function(curso){
                return curso.id === id;
            });

            if( borrarCurso[0] === undefined ){
                return respuestaError("No se ha encotrado ningún curso para eliminar con ese ID");
            }

            return borrarCurso[0];
        }
    }
}

function respuestaError(title: String): any {
    return {
        id: "-1",
        title: title,
        description: "",
        clases: 0,
        time: 0.0,
        level: "TODOS",
        logo: "",
        path: "",
        teacher: "",
        reviews: []
    };
}

export default mutation;