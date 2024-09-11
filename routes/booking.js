const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bookings = require('../schema');


router.get('/', (req,res)=>{
    bookings.find()
                .then((bookingsfound) => {
                    if(bookingsfound.length > 0)
                    {res.render('currentBooking',{'bookingList': bookingsfound, title:"All Bookings"});}
                    else{
                        res.end("Sorry, no one wants to touch grass yet")
                    }
            }, (err) => next(err))
        .catch((err) => next(err));
        }
)

router.get('/newBook',(req,res,next) =>{
    res.render('newBooking.ejs',{ title:'Make booking' })
})
.post('/newBook',(req,res,next)=>{
    bookings.create(req.body)
        .then((bookingCreated)=>{
            bookings.find()
                .then((bookingsfound) => {
                    res.render('currentBooking',{'bookingList': bookingsfound, title:"All Bookings"});
            }, (err) => next(err))
        .catch((err) => next(err));
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /booking/newBook');
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.end('Delete operation not supported on /booking/newBook');
    });
router.get('/update/:id',(req,res,next)=>{
    bookings.findById(req.params.id)
            .then((bookingUpdate) => {
                res.render('updateBooking.ejs',{ booking :bookingUpdate});
            },(err) => next(err)).catch((err)=>next(err))
        })   
router.post('/update/complete',(req,res,next)=>{
    bookings.findByIdAndUpdate(req.body._id, req.body)
        .then((bookingsaved) => {
            bookings.find()
            .then((bookingsfound) => {
                res.render('currentBooking',{'bookingList': bookingsfound, title:"All Bookings"});
            },(err)=>next(err).
            catch((err)=>next(err))),
            (err) => next(err)
            .catch((err)=>next(err));
        })
})

router.get('/delete/:id',(req,res,next)=>{
    bookings.findById(req.params.id)
        .then((bookingDelete)=>{
            res.render('deleteBooking',{booking : bookingDelete});
        },(err)=>next(err).catch((err)=>next(err)))
})
router.post('/delete/complete',(req,res,next)=>{
    bookings.findByIdAndDelete(req.body._id)
        .then((bookingsdeleted)=>{
            bookings.find()
                .then((found)=>{
                    res.render('currentBooking',{'bookingList':found, title:'all bookings'})
                },(err)=>next(err)
                .catch((err)=>next(err)))
        },(err)=>next(err)
            .catch((err)=> next(err))
        )
})

router.get('/find',(req,res,next)=>{
    res.render('findBooking');
})
router.post('/find',(req,res,next)=>{
    bookings.find({
        name : req.body.name,
        BookedFor:{
            $gte: req.body.start,
            $lte: req.body.end
        }
    })
        .then((found)=>{
            if(found.length > 0){
            res.render('currentBooking',{'bookingList':found,title:'found bookings'})
        }
        else{
            res.end('bookings not found')
        }
        }), (err) => next(err)
        .catch((err)=>next(err))
})
module.exports = router;