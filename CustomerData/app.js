const createError = require('http-errors')
const express = require('express')
const path = require('path')
const MySQL = require('./models/mysql')
const app = express()

const PORT = 3000
let db = null

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(logger('dev'));
app.use(express.json())
// app.use(express.urlencoded({ extended: false }));

// // app.use('/', indexRouter);
// // app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// BEN HILA

app.get('/:id', async (req, res, next) => {
  /**
   * get the customer data by id
   */
  const customerData = await db.getCustomer(req.params.id)  // get data about this id

  let data = { exists: false }
  if (!!customerData) {
    data = {
      exists: true,
      customerData
    }
  }
  res.json(data)
})

app.post('/add', async (req, res, next) => {
  /**
   * add a new customer record to the dataset
   */
  console.log("app.js/post")
  const answer = await db.addCustomer(req.body.record)
  res.json({ answer: "OK" })
})

app.delete('/:id', async (req, res, next) => {
  /**
   * delete the customer with the given id from the dataset
   */
   const answer = await db.deleteCustomer(req.params.id)
   res.json({ answer: "OK" })
})

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
  db = new MySQL();
})

