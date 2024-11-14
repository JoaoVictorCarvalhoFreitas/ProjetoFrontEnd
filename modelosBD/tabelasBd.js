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
        type: DataTypes.STRING(50),
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
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      nome: {
        type: DataTypes.STRING(50),
        allowNull: false,
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
          defaultValue: DataTypes.NOW,
      },
    }, {
      tableName: 'Usuario',
      timestamps: false,

      hooks: {
        afterCreate: async (usuario) => {
          await Carrinho.create({
            id_usuario: usuario.id_usuario,
          });
        },
      },
      
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
        defaultValue:1
      },
      valor_total: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      entrega: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      fk_Usuario_id_usuario: {
        type: DataTypes.INTEGER,
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
        allowNull: false,
      },
    }, {
      tableName: 'ItemPedido',
      timestamps: false,
    });

    const Carrinho = sequelize.define('Carrinho', {
      id_usuario: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: 'Usuario',
              key: 'id_usuario',
          },
          primaryKey: true,
      },
   }, {
      tableName: 'Carrinho',
      timestamps: true,
   });

  const itensCarrinho = sequelize.define('itensCarrinho', {
    id_usuario: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Usuario',
        key: 'id_usuario',
      },
      primaryKey: true,
    },
    id_produto: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Produto',
        key: 'id_produto',
      },
      primaryKey: true,
      
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    preco: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
 }, {
    tableName: 'itensCarrinho',
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

  // Usuario <- Carrinho
  Usuario.hasOne(Carrinho, {
    foreignKey: 'id_usuario',
    as: 'carrinho',
    onDelete: 'CASCADE',
});


// Carrinho -> Usuario
// Carrinho.belongsTo(Usuario, {
//   foreignKey: 'id_usuario',
//   as: 'usuario',
// });

// Produto.hasMany(itensCarrinho, {
//    foreignKey: 'id_produto',
//    as: 'itens',
// });

// itensCarrinho.belongsTo(Carrinho, {
//   foreignKey: 'id_usuario',
//   as: 'carrinho',
//   onDelete: 'cascade',
// });

// itensCarrinho.belongsTo(Produto, {
//   foreignKey: 'id_produto',
//   as: 'produto',
// });

// Um produto pode estar em vários itens de carrinho
Produto.hasMany(itensCarrinho, {
  foreignKey: 'id_produto',
  as: 'itensCarrinho',
});

// Um item do carrinho refere-se a um produto
itensCarrinho.belongsTo(Produto, {
  foreignKey: 'id_produto',
  as: 'produto',
});

// Relacionamento entre Carrinho e itensCarrinho
Carrinho.hasMany(itensCarrinho, {
  foreignKey: 'id_usuario',
  as: 'itens',
});

itensCarrinho.belongsTo(Carrinho, {
  foreignKey: 'id_usuario',
  as: 'carrinho',
  onDelete: 'CASCADE',
});



  

export {Produto, Usuario, Pedido, Telefone, ItemPedido,Carrinho,itensCarrinho};











