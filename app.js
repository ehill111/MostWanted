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
  let foundPeople = people.filter(function(person){
    if(person.firstName === finalSelectionPrompt){
      return true;
    }
    else{
      return false;
    }
  })

  let person = foundPeople[0];
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
      displayPerson(person);
    break;
    case "family":
    displayFamily(person, people);
    break;
    case "descendants":
    // TODO: get person's descendants
    // recursion is a form of iteration. think of it as a for loop
    //use Joy Madden as test case
      let descendants = [];
      getDescendants(person, people, descendants);
      displayPeople(descendants);
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

function getDescendants(person, people, descendants){ //Joy Madden
  //array.filter to filter out everyone who is a child of person i.e. 4 people
  //for loop to iterate over person's descendants
  //use recursion by calling getDescendants inside the for loop
  //i.e. getDescendants(foundDescendants[0], people);

  var foundDescendants = people.filter(function(children){
    if(person.id === children.parents[0] || person.id === children.parents[1]){
      descendants.push(children);
      return true;
    }
    else{
      return false;
    }
  })

  if (foundDescendants.length === 0){
    return;
  } else{
    for(let i = 0; i < foundDescendants.length; i++){
      getDescendants(foundDescendants[i], people, descendants);
    }
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
  let searchResult = people;
  let searchComplete = false;

  switch(userInput){
    case "gender":
      searchResult = searchByGender(people);
      break;
    case "height":
      searchResult = searchByHeight(people);
      break;
    case "weight":
      searchResult = searchByWeight(people);
      break;
    case "occupation":
      searchResult = searchByOccupation(people);
      break;
    case "eyeColor":
      searchResult = searchByEyeColor(people);
      break;
    case "finished":
      searchComplete = true;
      break;
    default:
    return app(people); // ask again
  }

  if(searchComplete == false){
    return searchByTrait(searchResult);
  }
  
  return searchResult;
  
}

function searchByGender(people){
  let userInput = promptFor("Which gender would you like to search for? <male, female>",chars);
  var genderSelection = people.filter(function(person){
    if(person.gender === userInput) {
      return true;
    }
})

  return genderSelection;
}

function searchByHeight(people){
  let userInput = promptFor("What height would you like to search for? <Enter height by inches>",chars);
  var heightSelection = people.filter(function(person){
    if(person.height === userInput) {
      return true;
    }
})

  return heightSelection;
}

function searchByWeight(people){
  let userInput = promptFor("What weight would you like to search for? <Enter weight by pounds>",chars);
  var weightSelection = people.filter(function(person){
    if(person.weight === userInput) {
      return true;
    }
})

  return weightSelection;
}

function searchByOccupation(people){
  let userInput = promptFor("What occupation would you like to search for?",chars);
  var occupationSelection = people.filter(function(person){
    if(person.occupation === userInput) {
      return true;
    }
})

  return occupationSelection;
}

function searchByEyeColor(people){
  let userInput = promptFor("What eye color would you like to search for?",chars);
  var eyeColorSelection = people.filter(function(person){
    if(person.eyeColor === userInput) {
      return true;
    }
})
  return eyeColorSelection;
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
  personInfo += "Gender:" + person.gender + "\n";
  personInfo += "Date of Birth:" + person.dob + "\n";
  personInfo += "Height:" + person.height + "\n";
  personInfo += "Weight:" + person.weight + "\n";
  personInfo += "Eye Color:" + person.eyeColor + "\n";
  personInfo += "Occupation:" + person.occupation + "\n";

  alert(personInfo);
  return(personInfo);
}

function displayFamily(person, people){
  var parents;
  var currentSpouse;
  var siblings = [];
  var familyMembers = [];
  if (person.parents.length > 0){
    var parentsId = person.parents.filter(function(parent){
      return true;
    }); 

      parents = people.filter(function(person){
        if(parentsId[0] == person.id || parentsId[1] == person.id){
          person.Relation = "Parent";
          familyMembers.push(person);
          return true;
        }
        else{
          return false;
        }
        });     
  }

  if (person.currentSpouse !== null){
    currentSpouse = people.filter(function(person){
      if(person.currentSpouse === person.id){
        person.Relation = "Spouse";
        familyMembers.push(person);
        return true;
      }
      else{
        return false;
      }
      });     
  }

  siblings = people.filter(function(person){
  if(person.parents[0] == parentsId[0] || person.parents[1] == parentsId[0]){
    person.Relation = "Sibling";
    familyMembers.push(person);
    return true;
  }
  else if(person.parents[0] == parentsId[1] || person.parents[1] == parentsId[1]){
    person.Relation = "Sibling";
    familyMembers.push(person);
    return true;
  }
  else{
    return false;
  }
  });

  displayPeople(familyMembers);
  return mainMenu(person,people);
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
