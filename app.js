"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults = searchByTrait(people);
      break;
      default:
    app(people); // restart app
      break;
  }

  const userSelection = selectPerson(searchResults)
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(userSelection, people);
}

function selectPerson(people){
  displayPeople(people)
  let finalSelectionPrompt = promptFor("Please pick your option from the list <first name>", chars);
  let foundPerson = people.filter(function(person){
    if(person.firstName === finalSelectionPrompt){
      return true;
    }
    else{
      return false;
    }
  })
  
  let person = foundPerson[0];
  return person;
  
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", validateAndCapitalizeString);
  let lastName = promptFor("What is the person's last name?", validateAndCapitalizeString);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson;
}

function searchByTrait(people){
  let userInput = promptFor("What trait (or additional traits) would you like to search for? <gender, height, weight, occupation, eye color, finished>",chars);
  let searchResult;
  switch(userInput){
    case "gender":
      searchResult = searchByGender(people);
      break;
    case "height":
      searchResult = searchByHeight(people);
      break;
    case "weight":
      //searchResult = searchByWeight(people);
      const weightSelection = data.filter(function(trait){
  if(trait.weight === userinput) {
    return true;
  }
});
    break;

    case "occupation":
      //searchResult = searchByOccupation(people);
      const occupationSelection = data.filter(function(trait){
  if(trait.occupation === userinput) {
    return true;
  }
});
    break;

    case "eyeColor":
      //searchResult = searchByeyeColor(people);
       const eyeColorSelection = data.filter(function(trait){
  if(trait.eyeColor === userinput) {
    return true;
  }
});
    break;

    case "finished":
      return searchResult;
    default:
    return app(people); // ask again

  }
  searchByTrait(searchResult);
}

function searchByGender(people){
  let userInput = promptFor("Which gender would you like to search for? <male, female>",chars);
  var genderSelection = people.filter(function(trait){
    if(trait.gender === userInput) {
      return true;
    }
})

  return genderSelection;
}

function searchByHeight(people){
  let userInput = promptFor("What height would you like to search for? <Enter height by inches>",chars);
  var heightSelection = people.filter(function(trait){
    if(trait.height === userInput) {
      return true;
    }
})

  return heightSelection;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input (JJ)
function promptFor(question, valid){
  do{
    var response = prompt(question);
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers 
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

// converts input to a string word with first letter capitalize

function validateAndCapitalizeString(input){
  input.toLowerCase();
  var correctedString = input.charAt(0).toUpperCase() + input.slice(1);
  return correctedString;
}
