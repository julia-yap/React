Tasks
Build a "Food Order" web app
* use the starting project attached to the lecture
* add components for displaying products, the cart(in a modal) and a checkout form(also in a modal)
* fetch the (dummy) meals data from the backend & show it on the screen (GET/meals)
* allow users to add & remove products to/from the cart
* send cart data along with user data (full name, email, street, postal code, city) to the backend (POST/orders)
* handle loading & error states

Website functions and components
Header
    log img, website title, cart with item count
Cart (modal)
    header your cart
    rows of items 
        name, qtt, price, add or subtract item counts
    total price
    close
    go to checkout
Checkout (modal)
    total amount
    full name input
    email addr input
    street input
    postal code input
    city input
    close and usbmit order buttons
meals menu (3 columns per row)
    image, name, price, desc, add to cart

Plan
Step1. Add the Header component
Step2. Add the Meals component
Step3. Create Cart context