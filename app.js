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
      // TODO: search by traits
      searchResults = selectSearch(people);
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults[0], people);
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
      mainMenu(person, people);
    // TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
    let spouse = searchBySpouse(people, person);
    displayPeopleAndRelationship(spouse, "Spouse");
    let children = displayChildren(people, person);
    displayPeopleAndRelationship(children, "Children");
    let parents = displayParents(people, person);
    displayPeopleAndRelationship(parents, "Parents");

    mainMenu(person, people);
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

function selectSearch(people){
  let searchResults = people;
  while(searchResults.length > 1){ 
  let searchChoice = promptFor("which trait would you like to search by?\n1. Gender\n2. Weight(in inches)\n3. Height\n4. Eye Color\n5. DOB\n6. Multiple Criteria", chars);
  switch(searchChoice){
    case "1":
      searchResults = searchByGender(searchResults);
      console.log(searchResults.length)
      displayPeople(searchResults);
      break;
    case "2":
        searchResults = searchByWeight(searchResults);
        displayPeople(searchResults);
        break;
    case "3":
        searchResults = searchByHeight(searchResults);
        displayPeople(searchResults);
        break;
    case "4":
        searchResults = searchByEyeColor(searchResults);
        displayPeople(searchResults);
        break;
    case "5":
        searchResults = searchByDob(searchResults);
        displayPeople(searchResults);
        break;

  }
}
return searchResults;
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson;
}

function searchByGender(people){
  let chooseGender = promptFor("What is the person's gender (Male or Female)", chars).toLowerCase();
  let foundPerson = people.filter(function(person){
    if(person.gender === chooseGender){
      return true;
    }
  })
  console.log(foundPerson);
  return foundPerson; 
}

function searchByWeight(people){
  let chooseWeight = promptFor("What is the weight", chars);
  let foundPerson = people.filter(function(person){
    if(person.weight == chooseWeight){
      return true;
    }
  })
  console.log(foundPerson);
  return foundPerson; 
}
function searchByHeight(people){
  let chooseHeight = promptFor("What is the height", chars);
  let foundPerson = people.filter(function(person){
    if(person.height == chooseHeight){
      return true;
    }
  })
  console.log(foundPerson);
  return foundPerson; 
}

function searchByEyeColor(people){
  let chooseEyeColor = promptFor("What is the person's eye color", chars).toLowerCase();;
  let foundPerson = people.filter(function(person){
    if(person.eyeColor == chooseEyeColor){
      return true;
    }
  })
  console.log(foundPerson);
  return foundPerson; 
}

function searchByDob(people){
  let chooseByDob = promptFor("What is the person's dob", chars);
  let foundPerson = people.filter(function(person){
    if(person.dob == chooseByDob){
      return true;
    }
  })
  console.log(foundPerson);
  return foundPerson; 
}

// Search for spouse
function searchBySpouse(people, person){
  let spouseSearchData = people.filter(function(el){
        if(el.id === person.currentSpouse){
          return true;
        }
      });
      console.log(spouseSearchData);
      return spouseSearchData; 
}

// Search by parents
function displayParents(people, person){
  let parentSearchData = people.filter(function(el){
    if(person.parents[0] === el.id || person.parents[1] === el.id){
      return true;
    }
  })
  console.log(parentSearchData);
  return parentSearchData;
}

// Search by children
function displayChildren(people, person){
  let childrenSearchData = people.filter(function(el){
    if(person.id === el.parents[0] || person.id === el.parents[1]){
      return true;
    }
  })
  console.log(childrenSearchData);
  return childrenSearchData;
}
// Look up someone descendants




function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPeopleAndRelationship(people, relationship){
  if(people.length === 0){
    alert(relationship + "\n no results");
  }
  else{
    alert(relationship + "\n" + people.map(function(person){
      return person.firstName + " " + person.lastName;
    }).join("\n"));
  } 
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
   personInfo += "Last Name: " + person.lastName + "\n";
   personInfo += "Gender: " + person.gender + "\n";
   personInfo += "dob: " + person.dob + "\n";
   personInfo += "Height: " + person.height + "\n";
   personInfo += "Weight: " + person.weight + "\n";
   personInfo += "eyeColor: " + person.eyeColor + "\n";
   personInfo += "occupation: " + person.occupation + "\n";
   personInfo += "spouse: " + person.currentSpouse + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
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
