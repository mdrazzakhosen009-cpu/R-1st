const express=require('express');
const path=require('path');const fs=require('fs');const multer=require('multer');const jwt=require('jsonwebtoken');
const {Pool}=require('pg');
const app=express();const PORT=process.env.PORT||10000;const SECRET=process.env.JWT_SECRET||'change-secret';const ADMIN_PASSWORD=process.env.ADMIN_PASSWORD||'admin12345';
const DATA=path.join(__dirname,'data.json');const UP=path.join(__dirname,'public','uploads');fs.mkdirSync(UP,{recursive:true});
app.use(express.json({limit:'4mb'}));app.use(express.urlencoded({extended:true}));
const upload=multer({dest:UP,limits:{fileSize:7*1024*1024},fileFilter:(req,file,cb)=>cb(null,/^image\/(jpeg|png|webp|gif)$/.test(file.mimetype))});
const pool=process.env.DATABASE_URL?new Pool({connectionString:process.env.DATABASE_URL,ssl:{rejectUnauthorized:false}}):null;
const readLocal=()=>JSON.parse(fs.readFileSync(DATA,'utf8'));const writeLocal=d=>fs.writeFileSync(DATA,JSON.stringify(d,null,2));
async function initDb(){if(!pool)return;await pool.query('CREATE TABLE IF NOT EXISTS rtex_content(id integer primary key,data jsonb not null)');const r=await pool.query('SELECT id FROM rtex_content WHERE id=1');if(!r.rowCount)await pool.query('INSERT INTO rtex_content(id,data) VALUES(1,$1)',[readLocal()])}
async function getData(){if(!pool)return readLocal();const r=await pool.query('SELECT data FROM rtex_content WHERE id=1');return r.rows[0]?.data||readLocal()}
async function saveData(d){if(!pool)return writeLocal(d);await pool.query('UPDATE rtex_content SET data=$1 WHERE id=1',[d])}
function auth(req,res,next){try{req.user=jwt.verify((req.headers.authorization||'').replace('Bearer ',''),SECRET);next()}catch(e){res.status(401).json({error:'Unauthorized'})}}
app.post('/api/login',(req,res)=>{const {username,password}=req.body||{};if(username!=='admin'||password!==ADMIN_PASSWORD)return res.status(401).json({error:'Invalid credentials'});res.json({token:jwt.sign({role:'admin'},SECRET,{expiresIn:'8h'})})});
app.get('/api/content',async(req,res)=>res.json(await getData()));
app.put('/api/content',auth,async(req,res)=>{await saveData(req.body);res.json({ok:true})});
app.post('/api/orders',async(req,res)=>{const d=await getData(),o=req.body||{};if(!o.customer?.name||!o.customer?.phone||!o.customer?.address||!Array.isArray(o.items)||!o.items.length)return res.status(400).json({error:'Please complete your details'});o.id='RTX-'+String((d.orders?.length||0)+1).padStart(6,'0');o.createdAt=new Date().toISOString();o.status='Pending';d.orders=d.orders||[];d.orders.unshift(o);await saveData(d);res.json(o)});
app.get('/api/orders',auth,async(req,res)=>res.json((await getData()).orders||[]));
app.patch('/api/orders/:id',auth,async(req,res)=>{const d=await getData(),o=(d.orders||[]).find(x=>x.id===req.params.id);if(!o)return res.status(404).json({error:'Order not found'});Object.assign(o,req.body);await saveData(d);res.json(o)});
app.post('/api/upload',auth,upload.single('image'),(req,res)=>{if(!req.file)return res.status(400).json({error:'Image required'});const ext=(req.file.mimetype.split('/')[1]||'jpg').replace('jpeg','jpg');const name=Date.now()+'-'+Math.random().toString(36).slice(2)+'.'+ext;fs.renameSync(req.file.path,path.join(UP,name));res.json({url:'/uploads/'+name})});
app.use(express.static(path.join(__dirname,'public')));
app.get('/admin',(req,res)=>res.sendFile(path.join(__dirname,'public','admin.html')));
app.use((req,res)=>res.sendFile(path.join(__dirname,'public','index.html')));
initDb().then(()=>app.listen(PORT,()=>console.log('R TEX BD running on '+PORT))).catch(e=>{console.error(e);process.exit(1)});