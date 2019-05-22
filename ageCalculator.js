const validator = require('validator');
const standard_input = process.stdin;

standard_input.setEncoding('utf-8');
// Function for return no. of days in specified Month and year.
const getDaysInMonth = function(month,year){
	return new Date(year, month, 0).getDate();
};
// Function for calculating Age.
const calculateAge = function(datevalue){
	const temp = datevalue.split('/');
	const today = new Date();
	let dNow = today.getDate();
	let mNow = today.getMonth() + 1; //January is 0
	let yNow = today.getFullYear();
	const dt = temp[1]+ '/' + temp[0] + '/' + temp[2];
	const td = mNow + '/' + dNow + '/' + yNow;
	let output;
	if(validator.isBefore(dt,td)){
		const dDob = temp[0];
		const mDob = temp[1];
		const yDob = temp[2];
		if(dDob > dNow){
			mNow = mNow - 1;
			dNow = dNow + getDaysInMonth(mNow , yNow);
		}

		if(mDob>mNow){
			yNow= yNow - 1;
			mNow= mNow + 12;
		}

		let days = dNow - dDob;
		let months = mNow - mDob;
		let years = yNow - yDob;

		years = years<10?('0' + years):years;
		months = months<10?('0' + months):months;
		days = days<10?('0' + days):days;
		output = "Your Age is " + years + " Year, " + months + " Month and " + days + " Days."; 
      }else {
      	output = "Date should be in form of dd/mm/yyyy and must not be today or future date."
      }
      return output;
  }

process.stdout.write("Enter Date of Birth(DD/MM/YYYY) or type 'exit' for stop execution: ");

// When user input data and click enter key.
standard_input.on('data', function (data) {
    // User input exit.
    if(data.trim() == 'exit'){
    	console.log("User input complete, program exit.");
    	process.exit();
    }else {
        // Print Output in console.
        console.log(calculateAge(data) + '\n');
    }
    process.stdout.write("Enter Date of Birth(DD/MM/YYYY) or type 'exit' for stop execution: ");
});