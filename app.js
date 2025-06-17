const express = require("express");
const app = express();
const db = require("./config/db");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static('images'));
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")

app.get("/", (req, res) => {
    res.render("home.ejs");
});
app.get("/navbar", (req, res) => {
    res.render("partials/Navbar.ejs");
});
app.get("/product", (req, res) => {
    res.render("product.ejs");
});
app.get("/about", (req, res) => {
    res.render("about.ejs");
});
app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});
app.get("/register", (req, res) => {
    res.render("authentication/register.ejs");
});
app.get("/login", (req, res) => {
    res.render("authentication/login.ejs");
});
app.get("/Productadd",(req,res)=>{
    res.render("todo/product.ejs");
})
app.post("/productadd", async (req, res) => {
  try {
    const { name, description, category, brand, price, discount } = req.body;

    console.log("👉 Product Data Received:", {
      name, description, category, brand, price, discount,
    });

    const newProduct = await db.Products.create({
      name,
      description,
      category,
      brand,
      price,
      discount,
    });

    console.log("✅ Product added successfully:", newProduct);

    res.redirect("/product");
  } catch (error) {
    console.error("🔥 ERROR while adding product:", error); // this is the key line
    res.status(500).send("Something went wrong while adding product");
  }
});


app.post('/submit-contact', async (req, res) => {
    const { name, email, message } = req.body;
    console.log('Form Data:', { name, email, message });
    await db.users.create({
        name: name,
        email: email,
        message: message
    });
    res.redirect('/');
}); 

app.post("/register", async (req, res) => {
    console.log("Full req.body:", req.body);
    const { name, email, password, confirm_password } = req.body;

    if (password !== confirm_password) {
        return res.send("Passwords do not match");
    }

    await db.registerusers.create({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        confirm_password: bcrypt.hashSync(confirm_password, 10) // Match table schema
    });

    res.redirect("/login");
});
app.post("/login",async(req,res)=>{
    const {email,password}=req.body
     const users=await db.registerusers.findAll({
        where:{
            email:email
        }
     })
     if(users.length==0){
        res.send("Not registered email")
     }
     else{
       const ispassword= bcrypt.compareSync(password,users[0].password)
       if(ispassword){
        const token=jwt.sign({name:"sudip"},"secretcode",{
            expiresIn:"10d"
        })
        res.cookie("token",token)
        res.send(token)
        // res.send("Logged in succesfully")
       }
       else{
        res.send("invalid credential")
       }
     }
})


app.listen(1000, () => {
    console.log("The port is started lets do the project");
});