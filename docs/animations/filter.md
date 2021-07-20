# Filter Animations

  Fetches all animations that satisfy URL parameters provided
  
## URL:

  /animations

## Methods:

  `GET`
  
## URL Params:

  **Required:**

  `season=[enum("summer", "autumn", "winter", "spring")]`
  `year=[integer]`
  `sort=[enum("reviews", "ratings", "title", "release")]`
  `order=[enum("ascending", "descending")]`

   **Optional:**
  `seasonType=["year"]`
  *year is where December is included in Autumn

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
        release: {
          specificty: "Date",
          Date: "20/20/2020",
        },
        episodes: 20,
        runtime: 20,
        reviews: 20,
        averageRating: 5,
        cover: {coverLink},
        trailer: {youtubeLink}
      },
      {
        id: 2,
        title: Animation2,
        synopsis: Show about main character,
        format: Television,
        release: {
          specificty: "Date",
          Date: "20/20/2020",
        },
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

  * **Code:** 400 NOT FOUND <br />
  **Content:** `{ error : "Invalid or incorrect URL parameters" }`


## Sample Call:

  ```javascript
  $.ajax({
      url: "/animations?season=\"summer\"&year=\"2020\"&sort=\"rating\"&order=\"ascending\"",
      dataType: "json",
      type : "GET",
      success : function(r) {
      console.log(r);
      }
  });
