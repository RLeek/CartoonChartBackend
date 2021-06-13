# Show all related

  Fetches all animations that are related to an animation specfied via {id}
  
## URL:

  /animations/{id}/relations

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
    data: {
      sequels: {
        data: [ 
          {
            id: 2,
            title: Animation2,
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
      },
      prequels: {
        data: [
          {
            id: 3,
            title: Animation3,
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
      },
      other: {
        data: [
          {
            id: 4,
            title: Animation4,
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
      },
      alternatives: {
        data: [
          {
            id: 5,
            title: Animation5,
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
    }
  }
  ```
 
## Error Response:

  * **Code:** 404 NOT FOUND <br />
  **Content:** `{ error : "Animation doesn't exist" }`

## Sample Call:

  ```javascript
  $.ajax({
      url: "/animations/1/relations",
      dataType: "json",
      type : "GET",
      success : function(r) {
      console.log(r);
      }
  });
