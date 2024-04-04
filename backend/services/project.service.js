    import { imageEntity } from "../entity/image.entity.js"
    import { projectEntity } from "../entity/project.entity.js"
    import { ERRORS, SUCCESS } from "../shared/messages.js"

    export class ProjectService {
        createProject = async (title, description, email, technologies, contactNumber) => {
            try {
                await projectEntity.sync();
                
                const newProject = await projectEntity.create({
                    title, 
                    description, 
                    email,
                    technologies,
                    contactNumber,
                });
                
                return { message: `Projeto ${SUCCESS.CREATED}`, id: newProject.id, newProject };
            } catch (error) {
                console.log('Não foi possível criar o projeto:', error);
                throw new Error(`Erro ao criar o projeto: ${error.message}`);
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
                throw error
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

                await findedProject.save()


                return { message: `Projeto ${SUCCESS.UPDATED}`, findedProject }


            } catch (error) {
                console.log('Não foi possivel atualizar o projeto', error)
                throw error
            }

        }

        deleteProject = async (projectId) => {
            try {
                await projectEntity.sync()
                const projectFinded = projectEntity.findByPk(projectId,{
                    include: [imageEntity]
                })
        

                await Promise.all(projectFinded.images.map(async (image) =>{
                    await image.destroy()
                }))


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