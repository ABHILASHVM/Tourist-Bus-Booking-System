const express = require("express")
const path = require("path")
const app = express()
let multer = require('multer')
const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
const jwt = require('jsonwebtoken')
var methodOverride = require('method-override')
var flash = require('connect-flash')
var session = require('express-session');
app.use(session ({ 
                  secret: 'nodejs',
                  resave: true, 
                  saveUninitialized: true}));
//const ejsLint = require('ejs-lint');

const LogInCollection = require("./logindb")
const LogInCollection2 = require("./adminddb")
const feedbackCollection = require("./feedbackdb")
const defaultpackage = require("./defaultpackagesdb")
const {packageBookingCollection,busBookingCollection} = require("./packagebookingdb")
const { default: mongoose } = require("mongoose")

const port = process.env.PORT || 3000
app.use(express.json())
app.use(flash());
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }))
app.use((req,res, next)=>{
    res.locals.sucess= req.flash('sucess'),
    res.locals.err = req.flash('err')
    next()
})
// Middleware to verify JWT token
// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['token'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (!token) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }
  
//     jwt.verify(token, 'secret_key', (err, user) => {
//       if (err) {
//         return res.status(403).json({ error: 'Forbidden' });
//       }
//       req.user = user;
//       next();
//     });
//   }
//   app.use((err, req, res, next) => {
//     console.error(err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   });
//    const verifyUser = (req, res, next) => {
//    const authtoken = req.header('token')
//        const payload = jwt.verify(authtoken, 'secret_key')
//      req.user = payload.cuser
//     next()}

const tempelatePath = path.join(__dirname, '../templates')
const publicPath = path.join(__dirname, '../public')
//console.log(publicPath);

app.set('view engine', 'ejs')


app.set('views', tempelatePath)
//app.set('views', tempelatePath2)
app.use(express.static(publicPath))


let storage = multer.diskStorage({
    destination:'./public/payments', //directory (folder) setting
    filename:(req, file, cb)=>{
        cb(null, Date.now()+file.originalname) // file name setting
    }
})
let upload = multer({
    storage: storage,
    fileFilter:(req, file, cb)=>{
     if(
         file.mimetype == 'image/jpeg' ||
         file.mimetype == 'image/jpg' ||
         file.mimetype == 'image/png' ||
         file.mimetype == 'image/gif'
 
     ){
         cb(null, true)
     }
     else{
         cb(null, false);
         cb(new Error('Only jpeg,  jpg , png, and gif Image allow'))
     }
    }
 })



app.get('/signup', (req, res) => {
    res.render('signup')
})
 app.get('/admLogin', (req, res) => {
   res.render('admLogin')
})
app.get('/admLogin/:id',async (req, res) => {
    const profiles = await LogInCollection.find({});
    const package = await packageBookingCollection.find({});
    const bus = await busBookingCollection.find({});
    const feedback = await feedbackCollection.find({});
    const pack = await defaultpackage.find({});
    res.status(201).render("admin", {  details:profiles,package:package,feedback:feedback,pack:pack,bus:bus })
    })
app.get('/', (req, res) => {
    res.render('home')
})
app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/account/:id',async (req, res) => {
   // const token = req.query.token;
    //console.log(token)
   
     const check = await LogInCollection.findOne({ phone: req.params.id })
     const token = jwt.sign({ userId: check._id }, 'secret_key');
     const check1 = await defaultpackage.find({})
     res.render('account',{details:check,package:check1,token:token})
    // jwt.verify(token, 'secret_key', (err, decoded) => {
    //     if (err) {
    //       // Token verification failed, handle accordingly (e.g., redirect to login)
    //       res.redirect('/login');
    //     } else {
    //       // Token verified successfully, continue with the account rendering
    //       const phone = req.params.id; // Access the phone number from the URL parameter
    //       res.render('account',{details:check,package:check1})
    //     }
    //   });
})

app.get('/bus_booking/:id', async (req, res) => {
    const check = await LogInCollection.findOne({ phone: req.params.id })
    res.render('bus_booking',{details:check})
})


app.get('/:di/package_booking/:id', async (req, res) => {
    const check = await LogInCollection.findOne({ phone: req.params.id })
    const pack = await defaultpackage.findOne({ name: req.params.di})
    res.render('package_booking',{details:check,pack:pack})
   
})
app.get('/package1/:id',async (req, res) => {
    const check = await LogInCollection.findOne({ phone: req.params.id })
    const check1 = await defaultpackage.find({name: "package1"})
    console.log(check1)
    res.render('package1',{details:check,package:check1})
})
app.get('/package2/:id',async (req, res) => {
    const check = await LogInCollection.findOne({ phone: req.params.id })
    res.render('package2',{details:check})
})
app.get('/package3/:id',async (req, res) => {
    const check = await LogInCollection.findOne({ phone: req.params.id })
    res.render('package3',{details:check})
})
app.get('/package4/:id',async (req, res) => {
    const check = await LogInCollection.findOne({ phone: req.params.id })
    res.render('package4',{details:check})
})
app.get('/package5/:id',async (req, res) => {
    const check = await LogInCollection.findOne({ phone: req.params.id })
    res.render('package5',{details:check})
})
app.get('/bus_booking', (req, res) => {
    res.render('bus_booking')
})
app.get('/contact_us/:id', async (req, res) => {
    const check = await LogInCollection.findOne({ phone: req.params.id })
    res.render('contact_us',{details:check})
})
app.get('/mypage/:id',async (req,res,next) =>{
    const check = await LogInCollection.findOne({ phone: req.params.id })
    const bus = await busBookingCollection.find({ email: check.email }) 
    const package = await packageBookingCollection.find({email: check.email});
    res.render('mypage',{details:check,package:package,bus:bus})
})
app.get('/edit/:id', async (req, res) => {
    const check = await LogInCollection.findOne({ phone: req.params.id })
    res.render('user_edit',{details:check})
})
app.get('/package/edit/:id', async (req, res) => {
    const check = await defaultpackage.findOne({ name: req.params.id })
    res.render('package_edit',{details:check})
})
app.get('/package/delete/:di', async (req, res) => {
    const check = await packageBookingCollection.findOne({ _id: req.params.di })
    res.render('package_delete',{details:check})
})
app.get('/user/delete/:di', async (req, res) => {
    const check = await LogInCollection.findOne({ _id: req.params.di })
    res.render('user_delete',{details:check})
})
app.get('/bus/delete/:id', async (req, res) => {
    const check = await busBookingCollection.findOne({ _id: req.params.id })
    res.render('bus_delete',{details:check})
})



mongoose.connect('mongodb://0.0.0.0:27017/LoginFormPractice')
.then(() =>{
    console.log('mongoose connected');
})
.catch((e) =>{
    console.log('failed');
})
// app.get('/home', (req, res) => {
//     res.render('home')
// })

app.post('/signup', async (req, res) => {

    const data = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: await bcrypt.hash(req.body.password, 10)
        
       
    }

    const checking = await LogInCollection.findOne({ email: req.body.email })

   try{
    if (checking) {
        res.send("user details already exists")
    }
    else{
        //const hashedPassword = await bcrypt.hash(password, 10);
      //  data.password=hashedPassword
        await LogInCollection.insertMany([data])
    }
   }
   catch{
    res.send("wrong inputs")
   }

    res.status(201).render("home", {
        naming: req.body.email
    })
})


app.post('/login', async (req, res) => {
    const check = await LogInCollection.findOne({ email: req.body.email })
    try {
       
        const validPassword = await bcrypt.compare(req.body.password, check.password);
      //  console.log(validPassword)
        if (!validPassword) {
            return res.status(401).send('Incorrect password');
          }
       
        //res.json({ token });
       

        // if (check.password === req.body.password) {
        //    // res.render( "/account",{naming:check})
        //     res.redirect('/account/' + check.phone)
        //    // { naming: `${req.body.password}+${req.body.email}` })
        // }

        //  {
        //     //res.send("incorrect password")
        //     res.send("error in logging in")
        // }

       // const token = jwt.sign({ userId: check._id }, 'secret_key');
        //console.log(token)
        //res.redirect(`/account/${check.phone}?token=${token}`);
        res.redirect(`/account/`+ check.phone);
    } 
    
    catch (e) {

        res.send("wrong details")
        

    }
    
})



app.post('/admLogin', async (req, res) => {

    try {
      
       
        const check = await LogInCollection2.findOne({ email: req.body.email })
        
        if (check.password === req.body.password && check.name === req.body.name && check.email === req.body.email)
         {
                res.redirect('/admLogin/' + check._id )
               
               // res.status(201).render("admin", { naming: `${req.body.password}+${req.body.name}+${req.body.email}` })
                }
            
        else {
          if(check.name != req.body.name)
            {
            res.send("incorrect code");
            }
           else if(check.email != req.body.email)
            {
            res.send("incorrect email");
            }
           else if(check.password != req.body.password)
            { 
            res.send("incorrect password");
            }
        }
    

}
    
    catch (e) {
        res.send("wrong details")
    }


})

app.post('/contact_us', async (req, res) => {

    const data = {
        name: req.body.name,
        contact: req.body.contact,
        feedback: req.body.feedback
        
       
    }

   try{
        

        await feedbackCollection.insertMany([data])

}
   catch{
    res.send("wrong inputs")
   }

    res.status(201).redirect("/account/" + req.body.contact)
})


app.post('/package_booking/:id',upload.single('single_input'), async (req, res) => {

    const data = {
        email: req.body.email,
        count: req.body.count,
        packname: req.body.packname,
        price: req.body.price,
        amount: req.body.amount,
        picture:req.file.filename,
        id: req.body.id
        
    }
   
    //console.log(pack)
    //res.render('package_booking',{details:check,pack:pack})
    const pack = await defaultpackage.findOne({ packname: req.body.packname })
    const check = await LogInCollection.findOne({ email: req.body.email })
   try{
        if(pack.packname == req.body.packname)
        {
            if(check.email == req.body.email)
            {   
                  // await packageBookingCollection.create({picture:req.file.filename})
                  //res.send(req.file.filename)
                 await packageBookingCollection.insertMany([data])
            }
            else
                res.send("Plese enter your registered email");
        }
        else
            res.send("package don't exist");
    }
   catch{
    res.send("wrong inputs")
   }
   req.flash('sucess','booking confirmed')
   res.redirect('/account/'+ check.phone)
   //res.status(201).render("package_booking", {
    //details:check,pack:pack})
})



app.post('/bus_booking/:id',upload.single('single_input'), async (req, res) => {
       
    const data = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        destinations: req.body.destinations,
        date: req.body.date,
        seats: req.body.seats,
        days: req.body.days,
        requirements: req.body.requirements,
        amount: req.body.amount,
        picture:req.file.filename,
        id: req.body.id
    }
    //const check = await LogInCollection.findOne({ phone: req.params.id })
    try{
   // console.log(data)
         await busBookingCollection.insertMany([data])
    
    }
    catch{
        res.send("wrong inputs")
       }
       res.redirect('/account/'+ req.body.phone)
      // res.render("bus_booking",{details:check})
})



app.put("/mypage/:id", async (req, res) => {   
            
         LogInCollection.updateOne({phone:req.params.id},{
             $set:{
                        name:req.body.name,
                        email:req.body.email,
                        phone:req.body.phone
                    }
                })
                .then(async(x)=>{
                  
                      res.redirect('/')
                }) 
                .catch((y)=>{
                    console.log(y)
                })
})

app.put("/edit/:id", async (req, res) => {   
            
    LogInCollection.updateOne({phone:req.params.id},{
        $set:{
                   name:req.body.name,
                   email:req.body.email,
                   phone:req.body.phone
               }
           })
           .then(async(x)=>{
             
                 res.redirect('/edit/' + req.body.phone)
           }) 
           .catch((y)=>{
               console.log(y)
           })
})

app.put("/package/edit/:di", async (req, res) => {   
            
    defaultpackage.updateOne({name:req.params.di},{
        $set:{
                   name:req.body.name,
                   packname:req.body.packname,
                   price:req.body.price
               }
           })
           .then(async(x)=>{
             
                 res.redirect('/package/edit/'+ req.body.name)
           }) 
           .catch((y)=>{
               console.log(y)
           })
})

app.delete('/package/delete/:id', async (req, res)=>{
    const check = await LogInCollection2.findOne({ name: "admin" })
    packageBookingCollection.deleteOne({_id:req.params.id})
    
    
    .then(async(x)=>{
       
        console.log(req.params.id)
        const check1=await feedbackCollection.findOne({feedback:req.params.id })
        console.log(check1.feedback)
        if(req.params.id == check1.feedback)
        {
            // feedbackCollection.deleteMany({feedback:req.params.id})
            
            
        }
        req.flash('sucess', 'Your Data has delete')
        
        res.redirect('/admLogin/'+ check._id )
    })
    .catch((y)=>{
        console.log(y)
    })
})
app.delete('/bus/delete/:id', async (req, res)=>{
    const check = await LogInCollection2.findOne({ name: "admin" })
    
    busBookingCollection.deleteOne({_id:req.params.id})
    
    .then((x)=>{
        req.flash('sucess', 'Your Data has delete')
        
        res.redirect('/admLogin/'+ check._id )
    })
    .catch((y)=>{
        console.log(y)
    })
})
app.get('/feedback/delete/:id', async (req, res)=>{
    const check = await LogInCollection2.findOne({ name: "admin" })
    feedbackCollection.deleteOne({_id:req.params.id})
    .then((x)=>{
        req.flash('sucess', 'Your Data has delete')
        
        res.redirect('/admLogin/'+ check._id )
    })
    .catch((y)=>{
        console.log(y)
    })
})
app.delete('/user/delete/:id',async (req, res)=>{
    const check = await LogInCollection2.findOne({ name: "admin" })
    LogInCollection.deleteOne({_id:req.params.id})
    
    .then((x)=>{
        req.flash('sucess', 'Your Data has delete')
        res.redirect('/admLogin/' + check._id)
    })
    .catch((y)=>{
        console.log(y)
    })
})

app.listen(port, () => {
    console.log('port connected');
})