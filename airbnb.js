var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var database=require('./database');

var htmlContent; 
var count=0;
var lastPageNumber=18;
var globalID;
var mainUrl="https://www.airbnb.com/s/Austin--TX--United-States/homes?refinements%5B%5D=homes&in_see_all=true&allow_override%5B%5D=&s_tag=QkGJ9fp6";


var webpageScapper=function(url,currentpageNumber){
    var homesList=[];
    var rooms=[];
    var price=[];
    var superHost=[];

    if(currentpageNumber==0)
    {
      url=mainUrl;
    }

    else
    {
          url=url+"&section_offset="+currentpageNumber;

    }
    request(url,function(err,resp,body){
    var $=cheerio.load(body);                         // Using cheerio to load webpage into node.js platform
        $('._o0r6eqm').each(function(){               // Extract Home Names from each page
	       	item={};
        	item["name"]=$(this).text();
        	homesList.push(item);
          });


       $('._1127fdt6').each(function(){               // Extract room space information
    	   item1={};
    	   item1["room"]=$(this).text();
    	   rooms.push(item1);
         }); 

       $('._hylizj6').each(function(){                // Extract price information
           var temp=$(this).text();
 		   if(temp=="From" || temp=="Per night"){}
 		   else
    	    {
    		  item2={};
    	      item2["price"]=$(this).text();
    	      price.push(item2);
    	    }
        });

      $('._1uyh6pwn').each(function(){               // Superhost status (YES/NO)
  	 	var temp=$(this).text();
 		if(temp.includes("Superhost")){
 			superHost.push("YES");
 		}
 		else
 		{
            superHost.push("NO");
    	}
     });
          
        count++;
        globalID=rank(currentpageNumber);
        if(homesList)
            {
              database.insertData(lastPageNumber,globalID,homesList,rooms,price,superHost); //inserting all the values into database (databse.js(MONGO DB))
            }
             console.log("PAGE:"+count+" ### data extracted successful ###");
     });
}

var rank=function(pos){

  if(pos==0) return 1;
  else if(pos>0) return ((18*pos)+1);
       
}

var mainCall=function(){	         //main function calling all the pages sequential
		var currentpageNumber=0;
		while(currentpageNumber<lastPageNumber)
		{
		webpageScapper(mainUrl,currentpageNumber);
		currentpageNumber++;
		}
}

console.log("##Gathering data##");
mainCall();
app.listen('8080')
console.log("Processing...");
