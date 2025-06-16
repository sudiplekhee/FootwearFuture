const userModel=(sequelize,DataTypes)=>{
    const user=sequelize.define("user",{
        name:{
            type:DataTypes.STRING
        },
           email:{
            type:DataTypes.STRING
        },
           message:{
            type:DataTypes.STRING
        },
    })
    return user
}
module.exports=userModel