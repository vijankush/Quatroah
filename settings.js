import { rootCertificates } from "tls";

/**
 * 
 * user object must be created 
 * @param user   A user object 
 */
export const renderUserInfo = function(user) {

    // TODO: Generate HTML elements to represent the user
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    return `<div>  
    
        <div class = "user" style = "height: 100%; background-color: ${hero.backgroundColor}"></div>
        <h1>${user.first}</h1>
        <h1> ${user.last}</h1>
        <img src = ${hero.img}>
        <h1> ${user.name}</h1>
        <h1> ${user.phoneNumber}</h1>
        <body style = "background-color: ${user.backgroundColor}"
        <div style="background: #ffe7e8; border: 2px solid #e66465;">
            <h1> ${user.color}</h1>
       </div>
        </body>
         <p>${user.email}</p>
         <span style = "color: ${user.color}"></span>    
         <button type="button">edit</button> 
    </div>`
  
};



/**
 * Given a user object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param user  The user object to edit
 */
export const renderUserEditForm = function(user) {
    // TODO: Generate HTML elements to represent the hero edit form
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    return `
    <form>
        <input type="submit" value="Submit">
        <textarea rows="4" cols="50">
        First Name:<br>
        <input type="text" name = ${user.first}><br>
        </textarea>

        <textarea rows="4" cols="50">
        Last Name:<br>
        <input type="text" name = ${user.last}><br>
        </textarea>

        <textarea rows="4" cols="50">
        Email:<br>
        <input type="text" name = ${user.email}><br>
        </textarea>

        <textarea rows="4" cols="50">
        Phone Number:<br>
        <input type="text" name = ${user.phoneNumber}><br>
        </textarea>

        <button type="submit">save</button> 
        <button type="text">cancel</button> 
        <input type="submit" value="Submit">
        <input type="submit" value="Submit">
   </form> 
   `
};


/**
 * Given an array of hero objects, this function converts the data into HTML and
 *     loads it into the DOM.
 * @param user  An array of hero objects to load (see data.js)
 */
export const loadUsersIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the user using renderHeroCard()
    $root.addClass('container user is-dark');

    $root.append(renderHeroEditForm(heroes[0]))
};


/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadUsersIntoDOM(heroicData);
});