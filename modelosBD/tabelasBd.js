import { DataTypes} from "sequelize";
import ssequelize from "./bdDeclaracao.js";

const sequelize = ssequelize;



const Produto = sequelize.define('Produto', {
    id_produto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
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
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(50),
    },
    sobrenome: {
        type: DataTypes.STRING(50),
      },
    email: {
      type: DataTypes.STRING,
    },
    endereco: {
      type: DataTypes.STRING(100),
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
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
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
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'Pedido',
  });
  
  const Telefone = sequelize.define('Telefone', {
    id_telefone: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    telefone: {
      type: DataTypes.STRING(20),
    },
  }, {
    tableName: 'Telefone',
  });
  
  const ItemPedido = sequelize.define('ItemPedido', {
    id_item: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    fk_Produto_id_produto: {
      type: DataTypes.INTEGER,
    },
    fk_Pedido_id_pedido: {
      type: DataTypes.INTEGER,
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
  
  
  // Usuario -> Telefone
  Telefone.belongsTo(Usuario, { foreignKey: 'fk_Usuario_id_usuario', onDelete: 'NO ACTION' });
  
  // Pedido -> Usuario
  Pedido.belongsTo(Usuario, { foreignKey: 'fk_Usuario_id_usuario', onDelete: 'CASCADE' });
  
  // ItemPedido -> Produto
  ItemPedido.belongsTo(Produto, { foreignKey: 'fk_Produto_id_produto', onDelete: 'SET NULL' });
  
  // ItemPedido -> Pedido
  ItemPedido.belongsTo(Pedido, { foreignKey: 'fk_Pedido_id_pedido', onDelete: 'SET NULL' });
  

export {Produto, Usuario, Pedido, Telefone, ItemPedido};











