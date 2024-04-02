import { imageEntity } from "../entity/image.entity"
import { projectEntity } from "../entity/project.entity"
import { ERRORS, SUCCESS } from "../shared/messages.js"

export class ProjectService {
    createProject = async (title, description, email, tecnologies, contactNumber) => {
        try {

            await projectEntity.sync()
            const newProject = await projectEntity.create({
                title, description, email, tecnologies, contactNumber
            })

            return { message: `Projeto ${SUCCESS.CREATED}`, newProject }
        } catch (error) {
            console.log('não foi possivel criar o projeto', error)

        }

    }


    readProject = async () => {
        try {

            await projectEntity.sync()
            const projects = await projectEntity.findAll()

            return projects
        } catch (error) {
            console.log('não foi possivel carregar o projeto', error)

        }

    }


    getProjectDetails = async (projectId) => {
        try {

            const projectFinded = projectEntity.findByPk(projectId, {
                include: imageEntity
            })

            if (!projectFinded) {
                return `Project ${ERRORS.NOT_FOUND} `
            }

            return projectFinded
        } catch (error) {
            console.log('Não foi possivel pegar o projeto especifico ', error)
        }

    }

    updateProject = async (projectId, title, description, email, tecnologies, contactNumber) => {
        try {

            await projectEntity.sync()

            const findedProject = await projectEntity.findByPk(projectId)

            if (!findedProject) {
                return `Project ${ERRORS.NOT_FOUND}`
            }

            findedProject.title = title;
            findedProject.description = description;
            findedProject.email = email;
            findedProject.tecnologies = tecnologies;
            findedProject.contactNumber = contactNumber

            findedProject.save()


            return { message: `Projeto ${SUCCESS.UPDATED}`, findedProject }


        } catch (error) {
            console.log('Não foi possivel atualizar o projeto', error)
        }

    }

    deleteProject = async (projectId) => {
        try {
            await projectEntity.sync()
            const projectFinded = projectEntity.findByPk(projectId)

            if(!projectFinded){
                return `Projeto ${ERRORS.NOT_FOUND}`
            }

           await  projectFinded.destroy()


           return `Project ${SUCCESS.DELETED}`

        } catch (error) {
          console.log('Nao foi possivel apagar a messagem',error)
        }
    }

}