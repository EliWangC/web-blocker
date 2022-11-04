// This blocker is used to block unproductive websites.

const fs = require('fs');

const filePath = "/etc/hosts";
const redirectPath = "127.0.0.1";
let websites = [ "www.youtube.com","www.zhihu.com" ];
let delay = 10000;


let blocker = () => {
	let date = new date();
	let hours = date.getHours();
	
	// Block the websites when it's later than 8pm or earlier than 8am.
	if(hours >= 20 || hours < 8) {
		console.log('Time to block websites');
		fs.readFile(filePath, (err, data) => {    
			fileContents = data.toString();    
			for(let i = 0; i < websites.length; i++) {        
				let addWebsite = "\n" + redirectPath + " " + websites[i];        
				if (fileContents.indexOf(addWebsite) < 0) {            
					console.log('Website not present in hosts file');            
					fs.appendFile(filePath, addWebsite, (err) => {                
						if (err)  return console.log(err);                
						console.log('File Updated Successfully');
					});        
				} 
				else {            
					console.log('Website is present');        
				}    
			}
		});

	} 
	else {
		console.log('Time to unblock websites');    ....    ....}
};
