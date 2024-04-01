import multer from 'multer';
import sharp from 'sharp';
import fs from 'fs';
import { imageServices } from '../services/Image.service.js';

const parser = multer({ dest: 'public/uploads/' });

const instanceServiceImage = new imageServices();


const resizeImage = async (inputPath, outputPath) => {

    const tempOutputPath = `${outputPath}.temp`;


    await sharp(inputPath)
        .resize({ height: 750, width: 750, fit: 'inside' })
        .toFile(tempOutputPath);

    await fs.promises.rename(tempOutputPath, outputPath);
}

export const createImage = (req, res, next) => {
    console.log('Iniciando processamento de imagem...');
    parser.single('avatar')(req, res, async err => {
        if (err) {
            console.error('Erro ao processar imagem:', err);
            res.status(500).json({ message: 'Não foi possível processar a imagem', error: 1, payload: err.message });
            return;
        }

        console.log('Processamento da imagem concluído.tamo  Criando  a imagem...');

        const inputPath = req.file.path;

        const outputPath = `public/uploads/${req.file.filename}`;

        await resizeImage(inputPath, outputPath);


        const imageCreated = await instanceServiceImage.serviceCreateImage(req.file.filename, `/uploads/${req.file.filename}`);

        console.log('Imagem criada com sucesso:', imageCreated);

        res.status(200).json({ error: 0, payload: { id: req.file.filename, url: `/uploads/${req.file.filename}` } });

    });
}


export const getAllImages = async (req,res) => {
     const allImages = await instanceServiceImage.serviceReadAllImages()
     res.status(201).json({allImages})
}


export const  deleteImage  = async(req,res) =>{
    const {id} = req.params;

    const deletedImage = instanceServiceImage.serviceDeleteImage(id)
    res.status(200).json({deletedImage})
}