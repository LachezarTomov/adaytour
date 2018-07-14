## A Day Trip Application

Looking to get out of the city for a few hours? Here’s the definitive list of best day trips, featuring spa cities, seaside towns and adventures in the great countryside.
Just check for a quick day trip near your location.

The project allows following functionality:

Guest user part
- Register a new user
- Login & logout
- List all nice placed
- See place details

Loggedin user part - all of the obove functionality plus
- Edit the place indormation if it's added from the current logged in user
- Delete the whole published place if it's added from the current logged in user

Logged as administrator part
- List all users
- Delete a user
- Edit all added places
- Delete all added places

## Routing information

path='/' - Show the site's home page with listed added places
path='/logout' - Logout the current loggedin user
path='/register' - Register a new user
path='/login' - Log in a user
path='/placedetails/:id' - List details of the selected plase
path='/newplace' - Add a new place to visit
path="/newplace/:id" - Edit selected place
path="/users"  - List all users (Admin mode)

## Additional information

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

In the project directory, you can run:

### `npm install`
### `npm start`

