import { sequelize } from '../database/connection.js';
import { projectEntity } from "./project.entity.js";
import { imageEntity } from "./image.entity.js";


projectEntity.hasMany(imageEntity, { onDelete: 'CASCADE',as: 'images', foreignKey: 'projectId', constraints: false});
imageEntity.belongsTo(projectEntity, { foreignKey: 'projectId' });

// Sincronizar as tabelas
sequelize.sync({ alter: true }) // Remova { force: true }
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso.');
    // Agora você pode prosseguir com outras operações, como criar imagens, etc.
  })
  .catch((error) => {
    console.error('Erro ao sincronizar tabelas:', error);
  });
