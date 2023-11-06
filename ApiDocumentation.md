### User Management

- `POST /users`
  - Description: Creates a new user.
  - Body: { username, password, email, firstName, lastName }
  
- `GET /users/{userId}`
  - Description: Retrieves information about a specific user.
  
- `PUT /users/{userId}`
  - Description: Updates information for a specific user.
  - Body: { username, email, firstName, lastName, isActive }
  
- `DELETE /users/{userId}`
  - Description: Deletes a specific user.
  
- `POST /users/login`
  - Description: Logs in a user.
  - Body: { username, password }
  
### User Role Management

- `GET /users/{userId}/roles`
  - Description: Retrieves a list of roles assigned to a user.
  
- `POST /users/{userId}/roles`
  - Description: Assigns a new role to a user.
  - Body: { roleName }
  
- `DELETE /users/{userId}/roles/{roleId}`
  - Description: Removes a role from a user.

### Payment Information

- `GET /users/{userId}/payments`
  - Description: Retrieves the payment information for a user.
  
- `POST /users/{userId}/payments`
  - Description: Adds new payment information for a user.
  - Body: { cardType, lastFourDigits, expiryDate, paymentMethodName, isDefault }
  
- `PUT /payments/{paymentId}`
  - Description: Updates payment information.
  - Body: { cardType, lastFourDigits, expiryDate, paymentMethodName, isDefault }
  
- `DELETE /payments/{paymentId}`
  - Description: Removes payment information.

### Address Management

- `GET /users/{userId}/addresses`
  - Description: Retrieves the addresses associated with a user.
  
- `POST /users/{userId}/addresses`
  - Description: Adds a new address for a user.
  - Body: { addressLine1, addressLine2, city, state, postalCode, country, addressType, isDefault }
  
- `PUT /addresses/{addressId}`
  - Description: Updates an address.
  - Body: { addressLine1, addressLine2, city, state, postalCode, country, addressType, isDefault }
  
- `DELETE /addresses/{addressId}`
  - Description: Removes an address.

### Wish List Management

- `GET /users/{userId}/wishlist`
  - Description: Retrieves the wish list for a user.
  
- `POST /users/{userId}/wishlist`
  - Description: Adds a product to the wish list.
  - Body: { productId, addedDate }
  
- `DELETE /wishlist/{wishlistId}`
  - Description: Removes a product from the wish list.
