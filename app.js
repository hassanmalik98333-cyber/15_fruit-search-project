const searchContainer = document.getElementById('search');
const input = document.querySelector('#fruit');
const suggestionsDiv = document.getElementById('suggestions-div');
const suggestions = document.querySelector('.suggestions ul'); 
// did not use suggestions, as my solution does not work with it. Instead I used suggestionsDiv.firstChildElement(tho I know of another solution which could work with this, I got it by a suggestion by chat gpt but will not use it in this project)


const fruits = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

// I used this a lot, so I made it a function, applying the concept of DRY.
function remove(){
        suggestionsDiv.firstElementChild.remove(); 
        const ul = document.createElement('ul');
        suggestionsDiv.append(ul);
};

function search(str) {
	let results = [];
    
    for(let fruit of fruits ){
       let lowerFruit = fruit.toLowerCase();
       if(lowerFruit.includes(str.toLowerCase()) ){
            results.push(fruit);
       };
    };
                
    return results;
};  


function searchHandler(e) {

    const searched = input.value.trim();
    const reducedResults = []; // will put the first 6 results in here so that it does not show too many on screen.
    const lowerSearched = searched.toLowerCase();
    let results;

    // this fixes the bug where the appended reducedResults stay on the page if the input.value is empty.
    if(searched === '') remove();

    if(searched){ // this prevents the suggestions from appearing due to pressing space, or shift, or alt, etc...( same as: searched !== '')
        results = search(searched); // input.value.trim()(searched) makes it so that if the user searches when they put spaces, it will work.
    };
   
    for(let i = 0; i<6; i++){
        // I put (results[i] !== undefined) to prevent putting the value undefined in the array. Without this I could get: 
        // (6) ['Apple', 'Custard apple', 'Pineapple', undefined, undefined, undefined]
        if(results[i] !== undefined){ 
        reducedResults.push(results[i]);
        };
    }; 
 
    // to remove the existing ul so that the appended searched items (reducedResults) do not stack on top of eachother(it get earased everytime the input.value.trim() changes).
    remove();
    

    // appending the reducedResults onto the page and adding bold letters.
    for(let apRes of reducedResults){
        const li = document.createElement('li');
        const apResLow = apRes.toLowerCase();
        const b = document.createElement('b');
        const indx = apResLow.indexOf(lowerSearched); // to find the index position the input in the search bar is at in apRes so that I can bold only the letters that correspond with what is in the search box.

        li.append(apRes.substring(0,indx)); // not bolded
        b.append(apRes.substring(indx,indx + searched.length)); // bolded part which is equal to what is writted in the input.
        li.append(b);
        li.append(apRes.substring(indx + searched.length, apRes.length)); // not bolded

        suggestionsDiv.firstElementChild.append(li);
    };
    // I did the above on my own, But I did get vague hints from chat gpt(nothing obvious just vague, I had to figure it out on my own, the code is mine).

};
// I used suggestionsDiv.firstElementChild instead of suggestions, because my solution does not work if I use suggestions.


function useSuggestion(e) {
	   if(e.target.tagName === 'B'){ 
	input.value = e.target.parentElement.innerText;
    // without this, if a bolded letter was selected, it would make input.value = the bolded letter(unbolded).
    } else{
        input.value = e.target.innerText;
    };

    // remove() bellow makes it so that when the suggestion is selected, the drop down menue disappears.
    remove();
};

input.addEventListener('keyup', searchHandler); 
suggestionsDiv.addEventListener('click', useSuggestion);

// I know I didnt do it exactly according to the project steps, but the end result is the same, and it was my own solution.


// ai suggestion: instead of doing remove(), do ul.innerHTML = ''; to clear the ul everytime. remove() can break if the html changes(like I add a paragraph, this is only a concern if someone else works on code, otherwise, I could ust add these elements after the div that the ul is in.). This issue can be removed if I add lots of obvious comments to the html saying to not add anything to the div(I did this even tho I am working alone on this).







