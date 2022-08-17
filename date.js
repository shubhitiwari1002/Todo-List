
 module.exports = getDate;

//  shorten the code and add some new code see last video

function getDate(){

    let today = new Date();

    //Alternate option to do this using java script.
  
    let options = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };
  
    let day = today.toLocaleDateString("en-US", options);

    return day;
  
    //    var currentDay = today.getDay();
  
    //    var day = "";
  
    // switch (currentDay){
    //     case 0:
    //         day = "Sunday";
    //         break;
    //     case 1:
    //         day = "Monday";
    //         break;
    //     case 2:
    //         day = "Tuesday";
    //         break;
    //      case 3:
    //         day = "Wednesday";
    //         break;
  
    //     case 4:
    //         day = "Thursday";
    //         break;
  
    //     case 5:
    //         day = "Friday";
    //         break;
  
    //     default :
    //         day = "Saturday";
    //         break;
  
    // }

    //    if(currentDay == 6 || currentDay == 0){
  //        res.send("Yay! It's holiday.");
  //    }
  //    else{
  //     res.sendFile(__dirname + "/index.html");
  //    }

  //if want to send more html elements without using index.html use re.write/) function.
}