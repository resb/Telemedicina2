'use strict'
/**
 * Module dependencies
 */

 var path = require('path'),
 mongoose=require('mongoose'),
 Tarjeta=mongoose.model('Tarjeta'),
 errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
 _=require('lodash');

 exports.create=function (req,res) {
     var tarjeta = new Tarjeta(req.body);
     tarjeta.user = req.user;

     tarjeta.save(function (err) {
        if(err){ 
        return res.status(400).send({
             message:errorHandler.getErrorMessage(err)
         });
     }else{
        res.jsonp(tarjeta);
     }
      });
 };
 /**
  * Sow the current Tarjeta 
  */
  exports.read=function (req,res) {
      var tarjeta = req.tarjeta?req.tarjeta.toJSON():{};
      // Add a custom field to the Article, for determining if the current user is the owner
      //NOTE:This field is NOT persisted to the database since it doesn't exist in the Article model
      tarjeta.isCurrentUserOwner=req.user&&tarjeta.user&&tarjeta.user._id.toString()===req.user.toString();
        res.jsonp(tarjeta);
    }

    /**
     * Update a Tarjeta
     */

     exports.update=function (req,res) {
         var tarjeta =req.tarjeta;
         tarjeta=_.extend(tarjeta,req.body);

         tarjeta.save(function (err) {
             if (err) {
                 return res.status(400).send({
                     message: errorHandler.getErrorMessage(err)
                 });
             }else{
                 res.jsonp(tarjeta);
             }
         });
     };

     /**
      * Delete an Tarjeta
      */

      exports.delete =function (req,res) {
          var tarjeta = req.tarjeta;
          tarjeta.remove(function (err) {
              if (err) {
                  return res.status(400).send({
                      message:errorHandler.getErrorMessage(err)
                  });
              }else{
                  res.jsonp(tarjeta);
              }
          });
      };

      exports.list=function (req,res) {
          Tarjeta.find().sort('-created').populate('user','displayName').exec(function (err,tarjetas) {
              if (err) {
                  return res.status(400).send({
                      message: errorHandler.getErrorMessage(err)
                  });
              }else{
                  res.jsonp(tarjetas)
              }
          });
      };

   /*   exports.listforUser=function (req,res) {
        var tarjeta = req.tarjeta?req.tarjeta.toJSON():{};
        Tarjeta.find({"user":ObjectId(req.tarjeta.userId)}).sort('-created').populate('user','displayName').exec(function (err,tarjetas) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            }else{
                res.jsonp(tarjetas)
            }
        });
    };*/

      /**
       * Tarjeta middleware
       */

       exports.tarjetaByID=function (req,res,next,id) {
           if (!mongoose.Types.ObjectId.isValid(id)) {
               return res.status(400).send({
                   message: 'Tarjeta es invalida'
               });
           }
           Tarjeta.findById(id).populate('user','displayName').exec(function (err,tarjeta) {
               if (err) {
                   return next(err);
               }else if (!tarjeta) {
                   return res.status(400).send({
                       message:'No Tarjeta with that identifier has benn found'
                   });
               }
               req.tarjeta=tarjeta;
               next();
           });
       };