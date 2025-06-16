const registerModel=(sequelize,DataTypes)=>{
    const registeruser=sequelize.define("registeruser",{
        name:{
            type:DataTypes.STRING
        },
             email:{
            type:DataTypes.STRING
        },
             password:{
            type:DataTypes.STRING
        },
             confirm_password:{
            type:DataTypes.STRING
        },
    })
    return registeruser
}
module.exports=registerModel