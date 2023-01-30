// This blocker is used to block unproductive websites.

const fs = require('fs');

const filePath = "/etc/hosts";
const redirectPath = "127.0.0.1";
let websites = [ "www.youtube.com","www.zhihu.com", "www.bilibili.com"];
let delay = 10000;


let blocker = () => {
	let date = new Date();
	let hours = date.getHours();
	let minutes = date.getMinutes();
	
	// Block the websites when it's later than 5pm or earlier than 7am.
	if(hours >= 17 || hours < 7) {
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
		console.log('Time to unblock websites');
		// Initialize the empty string
		let completeContent = '';
		// Read the file line by line
		fs.readFileSync(filePath) .toString() .split() .forEach((line) => {
			// Replace the file contents by `completeContent` variable
			fs.writeFile(filePath, completeContent, (err) => {    
				if (err) {        
					return console.log('Error!', err);    
				}
			});

			let flag = 1;
			for (let i = 0; i < websites.length; i++) {    
				if (line.indexOf(websites[i]) >= 0) {  // line contains website
					flag = 0;        
					break;    
				}				
			}
			if(flag == 1) {    
				if (line === '')    completeContent += line;    // If last line
				else    completeContent += line + "\n";			// Not last line
			}

		})
	}
};

blocker(); 						// Need to run once before setInterval	
setInterval(blocker, delay);  	// Keeps repeating the blocker function after a specific time interval
