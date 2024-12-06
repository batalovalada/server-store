const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Users = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: "USER", allowNull: false }
})

const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const BasketDevices = sequelize.define('basket_devices', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const BrandType = sequelize.define('brand_type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Favorites = sequelize.define('favorites', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const FavoritesDevices = sequelize.define('favorites_devices', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Types = sequelize.define('types', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
})

const Brands = sequelize.define('brands', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
})

const DeviceFeatures = sequelize.define('device_features', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    discription: { type: DataTypes.STRING}
})

const Device = sequelize.define('device', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    discription: { type: DataTypes.STRING},
    price: { type: DataTypes.REAL, allowNull: false },
    rating: { type: DataTypes.REAL, defaultValue: 0},
    salePercent: { type: DataTypes.REAL },
    img: { type: DataTypes.STRING, allowNull: false}
})

const Rating = sequelize.define('rating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rate: { type: DataTypes.INTEGER,allowNull: false }
})

Users.hasOne(Basket)
Basket.belongsTo(Users)

Users.hasOne(Favorites)
Favorites.belongsTo(Users)

Users.hasMany(Rating)
Rating.belongsTo(Users)

Favorites.hasMany(FavoritesDevices)
FavoritesDevices.belongsTo(Favorites)

FavoritesDevices.hasMany(Device)
Device.belongsTo(FavoritesDevices)

Device.hasMany(DeviceFeatures, {as: 'features'})
DeviceFeatures.belongsTo(Device)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Types.hasMany(Brands)
Brands.belongsTo(Types)

Brands.hasMany(Types)
Types.belongsTo(Brands)

Basket.hasMany(BasketDevices)
BasketDevices.belongsTo(Basket)

BasketDevices.hasMany(Device)
Device.belongsTo(BasketDevices)

Brands.hasMany(Device)
Device.belongsTo(Brands)

Types.hasMany(Device)
Device.belongsTo(Types)

Types.belongsToMany(Brands, {through: BrandType})
Brands.belongsToMany(Types, { through: BrandType })

module.exports = {
    Users,
    Basket,
    BasketDevices,
    BrandType,
    Favorites,
    FavoritesDevices,
    Types,
    Brands,
    DeviceFeatures,
    Device,
    Rating
}