import { imageEntity } from "../entity/image.entity.js";
import { ERRORS, SUCCESS } from "../shared/messages.js";

export class ImageServices{
    serviceCreateImage=  async (fileName,url) => {
        try {
            await imageEntity.sync()
            const newImage = imageEntity.create({
                fileName,
                url

            })
            return {message:`Imagem ${SUCCESS.CREATED}`,newImage}

        } catch (error) {
            console.log('Não foi possivel criar a imagem no banco de dados!',error)
        }

    }

    serviceReadAllImages = async () => {
        try {
            await imageEntity.sync()
            const images = imageEntity.findAll()
            return images
        } catch (error) {
            console.log('Não foi possivel retornar as mensagens')
        }
    }

    serviceDeleteImage = async (id) => {
        try {
            await imageEntity.sync();
            const imageFinded = await imageEntity.findByPk(id);
            if (!imageFinded) {
                return  `Imagem ${ERRORS.NOT_FOUND}`
            }
            await imageEntity.destroy({
                where: {
                    id
                }
            })

            return `Imagem ${SUCCESS.DELETED}`
        } catch (error) { 
            console.log('Não foi possivel apagar a imagem!')
        }
    }

}