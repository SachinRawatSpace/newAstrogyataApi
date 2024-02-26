const express = require("express");
const router = express.Router();
 

const {
    add_event,
    eventlist,
    getone_event,
    edit_event,
    dlt_event
   
} = require("../controller/bookevent");

 
 
 router.post("/user/add_event", add_event);
 router.get("/admin/eventlist", eventlist);
 router.get("/admin/getone_event/:id", getone_event);
 router.post("/admin/edit_event/:id", edit_event);
 router.get("/admin/dlt_event/:id", dlt_event);

module.exports = router;

