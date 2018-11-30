module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT,
    gifter: DataTypes.STRING,
    gift: DataTypes.TEXT
  });
  return Example;
};
