# Show Alternatives

  Fetches cover associated with animation specfied via {id}
  
## URL:

  /animations/{id}/cover

## Methods:

  `GET`
  
## URL Params:

  None

## Data Params:

  None

## Success Response:

  * **Code:** 200 <br />
  **Content:** 
  ```
  image/webp file
  ```
 
## Error Response:

  * **Code:** 404 NOT FOUND <br />
  **Content:** `{ error : "Animation doesn't exist" }`

## Sample Call:

  ```javascript
  $.ajax({
      url: "/animations/1/cover",
      type : "GET",
  });
  ```

## Notes:

  This will likely be moved to a separate service in the future as static files grow in size