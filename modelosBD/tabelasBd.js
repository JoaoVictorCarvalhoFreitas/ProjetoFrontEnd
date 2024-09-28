import { DataTypes, INTEGER, Sequelize} from "sequelize";
import ssequelize from "./bdDeclaracao.js";

const sequelize = ssequelize;

const Produto = sequelize.define('Produto', {
    id_produto: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,

    },
    nome: {
      type: DataTypes.STRING,
      unique: true,
    },
    descricao: {
      type: DataTypes.TEXT,
    },
    preco: {
      type: DataTypes.DOUBLE,
    },
    categoria: {
      type: DataTypes.INTEGER,
    },
    imagemUrl: {
      type: DataTypes.TEXT,
  },
    }, 
    {
    tableName: 'Produto',
  });
  
  
  const Usuario = sequelize.define('Usuario', {
    id_usuario: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4, 
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    sobrenome: {
        type: DataTypes.STRING(50),
      },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senha:{
        type: DataTypes.STRING,
        allowNull: false,

    },
    data_criacao: {
        type: DataTypes.DATE,
    },
  }, {
    tableName: 'Usuario',
    timestamps: false,
  });
  
  const Pedido = sequelize.define('Pedido', {
    id_pedido: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4, 
      primaryKey: true,
      allowNull: false,
    },
    data_pedido: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.INTEGER,
    },
    valor_total: {
      type: DataTypes.DOUBLE,
    },
    entrega: {
      type: DataTypes.BOOLEAN,
    },
    fk_Usuario_id_usuario: {
      type: Sequelize.UUID,
    },
  }, {
    tableName: 'Pedido',
  });
  
  const Telefone = sequelize.define('Telefone', {
    id_telefone: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4, 
      primaryKey: true,
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING(20),
    },
  }, {
    tableName: 'Telefone',
  });
  
  const ItemPedido = sequelize.define('ItemPedido', {
    id_item: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    fk_Produto_id_produto: {
      type: INTEGER
    },
    fk_Pedido_id_pedido: {
      type: Sequelize.UUID,
    },
    preco_unitario: {
      type: DataTypes.DOUBLE,
    },
    quantidade: {
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'ItemPedido',
    timestamps: false,
  });
  
  
// Telefone -> Usuario
  Telefone.belongsTo(Usuario, { foreignKey: 'fk_Usuario_id_usuario', onDelete: 'CASCADE' });
  
  // Pedido -> Usuario
  Pedido.belongsTo(Usuario, { foreignKey: 'fk_Usuario_id_usuario', onDelete: 'CASCADE' });
  
  // ItemPedido -> Produto
  ItemPedido.belongsTo(Produto, { foreignKey: 'fk_Produto_id_produto', onDelete: 'SET NULL' });
  
  // ItemPedido -> Pedido
  ItemPedido.belongsTo(Pedido, { foreignKey: 'fk_Pedido_id_pedido', onDelete: 'SET NULL' });
  

export {Produto, Usuario, Pedido, Telefone, ItemPedido};











