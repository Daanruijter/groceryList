const express = require("express");
const router = express.Router();
const groceryModel = require("../model/groceryModel");
const checkIdArrayModel = require("../model/checkIdArrayModel");
const updateIdArrayModel = require("../model/updateIdArrayModel");


//GROCERYMODEL

router.get("/", (req, res) => {
  groceryModel
    .find()
    .then((files) => {
      return res.send(files);
    })
    .catch((err) => console.log(err));
});

//add user grocery input to Mongo
router.post("/groceryitems", (req, res) => {
  const groceryInput = new groceryModel(req.body);
  groceryInput
    .save()
    .then((files) => {
      return res.send(files);
    })
    .catch((err) => console.log(err));
});


//remove all items

router.get("/groceryitems/deleteall", (req, res) => {
 groceryModel.remove()
    
    
    .then((files) => {
      return res.send(files);
    })
    .catch((err) => console.log(err));
});


//get user grocery inputs from Mongo
router.get("/groceryitems", (req, res) => {
  groceryModel.find()
  .then((files) => {
    return res.send(files);
  })
  .catch((err) => console.log(err));
});

//delete item from Mongo
router.post("/groceryitems/deleteitem", (req, res) => {
  let id = req.body.id

  groceryModel.deleteOne(
  { "_id": id },
  )
  .then((files) => {
    return res.send(files);
  })
  .catch((err) => console.log(err));
});

//send updated item to Mongo to replace the old one
router.post("/groceryitems/groceryitemsupdated", (req, res) => {
  let id = req.body.id
  
  let productUpdated = req.body.productUpdated
  let amountUpdated = req.body.amountUpdated
  let informationUpdated = req.body.informationUpdated
  let currentProduct =   req.body.currentProduct
  let currentAmount = req.body.currentAmount
  let currentInformation =   req.body.currentInformation

console.log(productUpdated !== currentProduct)
console.log(amountUpdated !== currentAmount)
console.log(informationUpdated !== currentInformation)

  if(currentProduct !== productUpdated && productUpdated !== ""){
    currentProduct = productUpdated
  }
  if(currentAmount !== amountUpdated && amountUpdated !== ""){
    currentAmount = amountUpdated
  }
  if(currentInformation !== informationUpdated && informationUpdated !== ""){
    currentInformation = informationUpdated
  }
      
  groceryModel.findOneAndUpdate(
    {_id:id},  
    { $set: { product : currentProduct, amount : currentAmount, information : currentInformation   } },
    )

    .then((files) => {
    return res.send(files);
  })
  .catch((err) => console.log(err));
  
  

});


//CHECKIDARRAYMODEL

//get id for check
router.get("/groceryitems/getidforcheck", (req, res) => {
  checkIdArrayModel.find()
  .then((files) => {
    return res.send(files);
  })
  .catch((err) => console.log(err))

});

//push id for check
router.post("/groceryitems/pushidforcheck", (req, res) => {
  let checkId = req.body.id
  console.log(checkId)
 

  checkIdArrayModel.findOneAndUpdate(
        
  { _id :  "5fff06269ffd8a52073b933b"  },
  { $addToSet: { checkIdArray : checkId } }
  )
    
    .then((files) => {
      return res.send(files);
    })
    .catch((err) => console.log(err));
});

router.post("/groceryitems/getidforcheck/removeid", (req, res) => {
  let checkId = req.body.id
  console.log(checkId)
 

  checkIdArrayModel.findOneAndUpdate(
    { _id: "5fff06269ffd8a52073b933b" },
    { $pull: { checkIdArray: checkId } } ,
    { new: true }
  

  )
    
    .then((files) => {
      return res.send(files);
    })
    .catch((err) => console.log(err));
});

//delete all ids in the checked array if a user deletes all items
router.post("/groceryitems/deleteallidsfromcheckidarray", (req, res) => {
  checkIdArrayModel.findOneAndUpdate(
    { _id: "5fff06269ffd8a52073b933b" },
    { $set: { checkIdArray:  []  } },
    { new: true }
  )
      
     
     .then((files) => {
       return res.send(files);
     })
     .catch((err) => console.log(err));
 });

//UPDATEIDARRAYMODEL

router.post("/groceryitems/deleteallidsfromupdateidarray", (req, res) => {
  
  updateIdArrayModel.findOneAndUpdate(
    { _id: "5f328223d4d09937268acc88" },
    { $set: { updateIdsArray:  []  } },
    { new: true }
  )
    // updateIdArrayModel.update({}, { $unset : { 'checkIdArray': {} }}, {multi:true} )
        
    .then((files) => {
      return res.send(files);
    })
    .catch((err) => console.log(err));
});

router.get("/groceryitems/getupdatearray", (req, res) => {
  
  updateIdArrayModel.find()
           
    .then((files) => {
      return res.send(files);
    })
    .catch((err) => console.log(err));
});

//send clicked update item id to mongo
router.post("/groceryitems/sendupdateid", (req, res) => {
  
let id = req.body.id
updateIdArrayModel.findOneAndUpdate(
        
  { _id :  "5f328223d4d09937268acc88"  },
  { $addToSet: { updateIdsArray : id } }
  )

           
    .then((files) => {
      return res.send(files);
    })
    .catch((err) => console.log(err));
});

//get the array of update elements where user clicked on
router.get("/groceryitems/getupdatearray2", (req, res) => {
  
    updateIdArrayModel.find()
 
             
      .then((files) => {
        return res.send(files);
      })
      .catch((err) => console.log(err));
  });
  
  //remove the id of an update element if a user clicked for the second time on it
  router.post("/groceryitems/deleteidfromupdateidarray", (req, res) => {
  
    let id = req.body.id
 
   
    updateIdArrayModel.findOneAndUpdate(
    { _id: "5f328223d4d09937268acc88" },
    { $pull: { updateIdsArray: id } } ,
    )
               
        .then((files) => {
          return res.send(files);
        })
        .catch((err) => console.log(err));
    });
    
  
module.exports = router;
