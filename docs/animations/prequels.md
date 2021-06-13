# Show Prequels

  Fetches all animations that are a prequels to an animation specfied via {id}
  
## URL:

  /animations/{id}/prequels

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
  { 
    data: [
      {
        id: 1,
        title: Animation1,
        synopsis: Show about main character,
        format: Television,
        release: 20/20/2020,
        episodes: 20,
        runtime: 20,
        reviews: 20,
        averageRating: 5,
        cover: {coverLink},
        trailer: {youtubeLink}
      }
    ]
  }
  ```
 
## Error Response:

  * **Code:** 404 NOT FOUND <br />
  **Content:** `{ error : "Animation doesn't exist" }`

## Sample Call:

  ```javascript
  $.ajax({
      url: "/animations/1/prequels",
      dataType: "json",
      type : "GET",
      success : function(r) {
      console.log(r);
      }
  });
