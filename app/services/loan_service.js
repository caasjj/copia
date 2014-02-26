'use strict';

// Loan service use loans controller
var mongoose = require('mongoose'),
    loans = require('../controllers/loans'),
    users = require('../controllers/users'),
    Loan = mongoose.model('Loan');

exports.create = function(request, response) {
  //check if user already has loan
  Loan.find({ borrower_id: request.params.userId, status: "pending" }, function(err, loan) {
    console.log("LOAN CREATE: ", err, loan);
    if( loan.length > 0 ) {
      response.send(401, "Unauthorized");
    } else {
    loans.create(request, response);
    }
  });
};

exports.get = function(request, response) {
  console.log("GET to: ",request.url, "-->Get Loan" );
  loans.loan(request, response, request.params.loanId);
};

exports.all = function(request, response) {
  loans.all(request, response);
}

exports.update = function(request, response) {
  loans.update(request, response, request.params.loanId);
};

exports.delete = function(request, response) {
  console.log("DELETE to: ",request.url, "-->Delete Loan" );
  loans.destroy(request, response, request.params.loanId);
};