import Express from "express";
const app = Express();
import mongoose from "mongoose";
import Document from "./model/Document.js";

const mongoDB = "";

app.set("view engine", "ejs");
app.use(Express.static('public'));
app.use(Express.urlencoded({extended : true}));

mongoose.set('strictQuery', true);
mongoose.connect(mongoDBCred, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})

app.get("/", (req,res)=>{
    const code = `Welcome to HasteBin!`
    res.render("code-display", {code:code, language: 'plaintext'})
})

app.get("/new", (req, res) => {
    res.render("new")
})

app.post('/save', async (req,res)=>{
    const value = req.body.value;
    try{
        const document = await Document.create({value});
        res.redirect(`/${document.id}`)
    }
    catch( error )
    {
        res.render("new", {value});
    }
    
})

app.get("/:id/duplicate", async (req, res) => {
    const id = req.params.id
    try {
      const document = await Document.findById(id)
      res.render("new", { value: document.value })
    } catch (e) {
      res.redirect(`/${id}`)
    }
  })

app.get("/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const document = await Document.findById(id);
        res.render("code-display", {code: document.value})
    }
    catch( error )
    {
        res.redirect("/")
    }
})

const PORT = 3000;
app.listen(3000, () => `Server running on port: ${PORT}..`);
