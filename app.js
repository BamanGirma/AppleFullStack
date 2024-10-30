// Question 1: Create a MySQL database by the name "myDB" and create a database user by
// the name "myDBuser" with a permissions to connect with the "myDB" database. Use the
// "mysql" module to create a connection with the newly created database. Display console
// message if the connection is successful or if it has an error.
let mysql = require("mysql2");
let cors=require("cors");
let myConnection = mysql.createConnection({
  user: "myDBuser",
  password: "my@DB@user",
  host: "127.0.0.1",
  database: "mydb",
});
// myConnection.connect((err) => {
//   if (err) console.log("can't connect");
//   else console.log("connected");
// });
// Question 2: Here is a link to a document that contains the tables we need to create and
// convert the apple.com/iphones page into a dynamic page with a database. As you can see
// from the document, there are 5 tables that are needed (please scroll horizontally and
// vertically over the document to see all the 5 tables). Write a SQL query to create the
// apple.com tables inside of the "myDB" database you created above. Once you write the
// queries, use the "mysql" module to execute the queries on the database. Try both of these
// methods to initiate the execution of the queries:
// ● Include the execution code directly in the module to be executed as you run the app
// ● Use the Express module to receive requests. Configure your module in a way that it
// executes the queries when the "/install" URL is visited.

let express = require("express");
let app = express();
myConnection.connect((err) => {
  if (err) console.log("can't connect");
  else console.log("connected");
});
  app.get("/install", (req, res) => {
  let productsTable = `CREATE TABLE if not exists Products(
  product_id int auto_increment,
  product_url varchar(255) not null,
  product_name varchar(255) not null,
  PRIMARY KEY (product_id)
  )`;
  
  let descriptionTable = `CREATE TABLE if not exists ProductDescription(
  description_id int auto_increment,
  product_id int not null,
  product_brief_description TEXT not null,
  product_description TEXT not null,
  product_img varchar(255) not null,
  product_link varchar(255) not null,
  PRIMARY KEY (description_id),
  FOREIGN KEY (product_id) REFERENCES Products(product_id)
  );`;
 
  let priceTable = `CREATE TABLE if not exists ProductPrice(
  price_id int auto_increment,
  product_id int not null,
  starting_price varchar(255) not null,
  price_range varchar(255) not null,
  PRIMARY kEY (price_id),
  FOREIGN KEY (product_id) REFERENCES Products(product_id)
  )`;
  
  let userTable = `CREATE TABLE if not exists User(
  user_id int auto_increment,
  User_name varchar(255) not null,
  User_password varchar(255) not null,
  PRIMARY KEY (user_id )
  )`;
  let OrdersTable = `CREATE TABLE if not exists Orders(
  order_id int auto_increment,
  product_id int not null,
  user_id int not null,
  PRIMARY KEY (order_id ),
  FOREIGN KEY (product_id) REFERENCES Products(product_id),
  FOREIGN KEY (user_id) REFERENCES User(user_id)
   )`;

  myConnection.query(productsTable, (error) => {
    if (error) throw error;
    console.log("productsTable created!");

  });
  myConnection.query(descriptionTable, (err) => {
    if (err) throw err;
    console.log("descriptionTablecreated!");
  });
  myConnection.query(priceTable, (err, result) => {
    if (err) throw err;
    console.log("priceTable created!");
  });
  myConnection.query(userTable, (err, result) => {
    if (err) throw err;
    console.log("userTable created!");
  });
  myConnection.query(OrdersTable, (err, result) => {
    if (err) throw err;
    console.log("OrdersTable created!");
  });
  res.end("created succesfully");
});


// Question 3: Create an HTML file called, “index.html” with a form to populate the
// "products" table you created above.
// ● The form on the HTML page should send a POST request to a URL named
// "/add-product"
// ● Use Express to receive the POST request
// ● Use the body-parser module to parse the POST request sent to your Express server
// ● Write a SQL query to insert the data received from the HTML form into the
// "products" table
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.post("/add-Product",(req,res)=>{
    console.table(req.body);
    //let pID=req.body.productID;
   const {
      productUrl,
      productName,
      productImagePath,
      productLink,
      StartingPrice,
      priceRange,
      productDescription,
      briefDescription,
    } = req.body;
    //const {pUrl,pName,pImage,pLink,startingPrice,priceRange,pDesc,briefDesc}=req.body;
   // const {id,url,pname,img,link,sprice,prange,pdesc,bdesc}=req.body;
    let insertProduct =
      "INSERT INTO products (product_url, product_name) VALUES (?,?)";
      let insertDescription =
        "INSERT INTO ProductDescription( product_id ,product_brief_description, product_description, product_img, product_link) VALUES (?,?,?,?,?) ";
        let insertPrice =
          "INSERT INTO ProductPrice(product_id ,starting_price, price_range) VALUES (?,?,?)";
    myConnection.query(
      insertProduct,
      [productUrl, productName],
      (err, result) => {
        if (err) {
          throw err;
        }
        console.table(result);
        const productId = result.insertId;

        myConnection.query(
          insertDescription,
          [
            productId,
            briefDescription,
            productDescription,
            productImagePath,
            productLink,
          ],
          (err, result) => {
            if (err) {
              throw err;
            }
            console.log(result);
          }
        );
        myConnection.query(
          insertPrice,
          [productId, StartingPrice, priceRange],
          (err, result) => {
            if (err) {
              throw err;
            }
            console.log(result);
          }
        );
      }
    );
    
    res.end("data inserted sucessfuly");
    console.log("data inserted sucessfuly"); 
   
});
//selection
 app.get("/getProductInfo",(req,res)=>{
  myConnection.query(
    "SELECT * FROM products JOIN ProductDescription JOIN ProductPrice ON products.product_id =ProductDescription.product_id AND products.product_id=ProductPrice.product_id ",(err,results,fields)=>{
      console.log(fields);
      if(err) console.log("error on selection",err);
     
      res.send(results);
      console.log(results);
    }
  );
      

 })
 app.get("/getProduct",(req,res)=>{
  myConnection.query(
     "SELECT  products.product_id AS ID, products.product_name AS product_name, ProductPrice.starting_price AS starting_price FROM products JOIN ProductPrice ON products.product_id = ProductPrice.product_id",(err,results,fields)=>{
      console.log(fields);
      if(err) console.log("error on selection",err);
     
      res.send(results);
      console.log(results);
    }
  );
  
 });
 //updating 
 app.put("/update", (req, res) => {
   const { newPrice,newRange,id } = req.body;
   let updatePrice = `UPDATE ProductPrice SET starting_price = ?,price_range=? WHERE product_id = ?`;
   myConnection.query(updatePrice, [newPrice,newRange, id], (err, results, fields) => {
     if (err) throw err;
     console.log(results.affectedRows + " record(s) updated");
     res.send(results);
   });
 });
 //deleting
 app.delete("/remove-product", (req, res) => {
  const { id } = req.body;
  let removeProduct = `DELETE FROM products WHERE product_id = ?`;
  let removePDescription = `DELETE FROM ProductDescription  WHERE product_id = ?`;
  let removePrice = `DELETE FROM ProductPrice WHERE product_id = ?`;

  myConnection.query(removePDescription, [id], (err, results) => {
    if (err) throw err;
    console.log(results.affectedRows + " record(s) Deleted");
  });
  
  myConnection.query(removePrice, [id], (err, results) => {
    if (err) throw err;
    console.log(results.affectedRows + " record(s) Deleted");
  });
  myConnection.query(removeProduct, [id], (err, results) => {
    if (err) throw err;
    console.log(results.affectedRows + " record(s) Deleted");
    res.send(results);
  });

});
app.listen(3000, () => console.log("listening to:3000"));

