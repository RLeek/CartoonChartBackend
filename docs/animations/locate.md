# Show Animation

  Fetches information regarding one animation specified via {id}
  
## URL:

  /animations/{id}

## Methods:

  `GET`
  
## URL Params:

   **Optional:**
  `include=["relations"]`

## Data Params:

  None

## Success Response:

  When no optional URL parameters are used:
  * **Code:** 200 <br />
  **Content:** 
  ```
  { 
    data: {
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
  }
  ```

  When `include=["relations"]` is added to URL parameters:
  * **Code:** 200 <br />
  **Content:** 
  ```
  { 
    data: {
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

  * **Code:** 400 NOT FOUND <br />
  **Content:** `{ error : "Invalid or incorrect URL parameters" }`


## Sample Call:

  ```javascript
  $.ajax({
      url: "/animations/1?include=\"relations\"",
      dataType: "json",
      type : "GET",
      success : function(r) {
      console.log(r);
      }
  });
