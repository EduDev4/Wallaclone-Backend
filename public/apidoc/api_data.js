define({ "api": [
  {
    "type": "delete",
    "url": "/apiv1/adverts/:id",
    "title": "5. Delete an advert (requires auth token)",
    "name": "DeleteAdvert",
    "group": "Adverts",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Format: &quot;Bearer <strong>user-token</strong>&quot;</p>"
          }
        ]
      }
    },
    "description": "<p>Delete one advert by id param</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>Advert id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error 404",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"fail\",\n  \"code\": 404,\n  \"message\": \"Cast to ObjectId failed for value \\\"5f5a1e9e30fd0ba17c4110cbe\\\" at path \\\"_id\\\" for model \\\"Advert\\\"\"\n}",
          "type": "json"
        },
        {
          "title": "Error 401",
          "content": "HTTP/1.1 401 Not Found\n{\n  \"status\": \"fail\",\n  \"code\": 401,\n  \"message\": \"Unauthorized Request!!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./controllers/doc/advert.doc.js",
    "groupTitle": "Adverts"
  },
  {
    "type": "get",
    "url": "/apiv1/adverts/:id",
    "title": "2. Find an advert",
    "name": "GetAdvert",
    "group": "Adverts",
    "description": "<p>Get one advert by id param</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost/api/v1/adverts/5f59fc8f53bab60f7d995367",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>Advert id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status response</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "requestedAt",
            "description": "<p>Request date/time</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Data response</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.advert",
            "description": "<p>Advert data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"requestedAt\": \"2020-09-10T10:55:52.067Z\",\n  \"results\": 8,\n  \"data\": {\n      \"advert\": {\n           \"sale\": true,\n           \"tags\": [\n               \"lifestyle\",\n               \"motor\"\n           ],\n           \"_id\": \"5f59fc8f53bab60f7d995367\",\n           \"name\": \"Bicicleta\",\n           \"price\": 230.15,\n           \"createdBy\": {\n               \"_id\": \"djde02334234920jwej\",\n               \"username\": \"user3\",\n            },\n           \"isFavBy\": {},\n           \"state\": \"Available\",\n           \"description\": \"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\",\n           \"image\": \"/img/adverts/4234324343423/bici.jpg\",\n           \"thumb\": \"/img/adverts/4234324343423/thumbnails/thumb_bici.jpg\",\n       }\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"fail\",\n  \"code\": 404,\n  \"message\": \"Not Found\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./controllers/doc/advert.doc.js",
    "groupTitle": "Adverts"
  },
  {
    "type": "get",
    "url": "/apiv1/adverts",
    "title": "1. List all adverts",
    "name": "GetAllAdverts",
    "group": "Adverts",
    "description": "<p>Get all the ads, and you can filter according to the arguments described</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost/apiv1/adverts",
        "type": "json"
      },
      {
        "title": "Filter usage:",
        "content": "By name:\ncurl -i http://localhost/apiv1/adverts?name=ipho\nBy price:\ncurl -i http://localhost/apiv1/adverts?price=100-500\nBy sale (on sale:true or to buy:false):\ncurl -i http://localhost/apiv1/adverts?sale=false\nBy tag:\ncurl -i http://localhost/apiv1/adverts?tags=electronics,mobile\nBy username:\ncurl -i http://localhost/apiv1/adverts?username=user1\nSort by price:\ncurl -i http://localhost/apiv1/adverts?sort=price\nLimit obtained fields:\ncurl -i http://localhost/apiv1/adverts?fields=name,price\nPaginate:\ncurl -i http://localhost/apiv1/adverts?start=1&limit=4",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status response</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "requestedAt",
            "description": "<p>Request date/time</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Data response</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.results",
            "description": "<p>Number of adverts</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data.adverts",
            "description": "<p>Adverts's list</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"requestedAt\": \"2020-09-10T10:55:52.067Z\",\n  \"data\": {\n  \"results\": 8,\n  \"adverts\": [\n       {\n           \"sale\": true,\n           \"tags\": [\n               \"lifestyle\",\n               \"motor\"\n           ],\n           \"_id\": \"5f59fc8f53bab60f7d995367\",\n           \"name\": \"Bicicleta\",\n           \"price\": 230.15,\n           \"createdBy\": {\n               \"_id\": \"djde02334234920jwej\",\n               \"username\": \"user3\",\n            },\n           \"isFavBy\": {},\n           \"state\": \"Available\",\n           \"description\": \"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\",\n           \"image\": \"/img/adverts/4234324343423/bici.jpg\",\n           \"thumb\": \"/img/adverts/4234324343423/thumbnails/thumb_bici.jpg\",\n       }, ...\n     ]\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"fail\",\n  \"code\": 404,\n  \"message\": \"Not Found\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./controllers/doc/advert.doc.js",
    "groupTitle": "Adverts"
  },
  {
    "type": "get",
    "url": "/apiv1/adverts/tags/",
    "title": "6. Find all exist tags",
    "name": "GetAllTags",
    "group": "Adverts",
    "description": "<p>Get all exist tags in th DB</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost/apiv1/adverts/tags",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status response</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "requestedAt",
            "description": "<p>Request date/time</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Data response</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "data.tags",
            "description": "<p>Adverts tags list in DB</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\",\n  \"requestedAt\": \"2020-09-10T10:55:52.067Z\",\n  \"data\": {\n  \"tags\": [\n       \"electronics\",\n       \"fashion\",\n       \"work\",\n       \"sports\"\n        ...\n    ]\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"status\": \"fail\",\n  \"code\": 404,\n  \"message\": \"Not Found\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./controllers/doc/advert.doc.js",
    "groupTitle": "Adverts"
  },
  {
    "type": "post",
    "url": "/apiv1/adverts/",
    "title": "3. Create an advert (requires auth token)",
    "name": "PostAdvert",
    "group": "Adverts",
    "description": "<p>Create one advert, content in the body (form-data)</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Format: &quot;Bearer <strong>user-token</strong>&quot;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "file",
            "optional": false,
            "field": "image",
            "description": "<p>Advert file image (jpg/png)</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Advert name</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Advert price</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Advert description</p>"
          },
          {
            "group": "Body",
            "type": "Boolean",
            "optional": false,
            "field": "sale",
            "description": "<p>Advert type (to sale:true, to buy: false)</p>"
          },
          {
            "group": "Body",
            "type": "String[]",
            "optional": false,
            "field": "tags",
            "description": "<p>Advert tags ('motor', 'fashion', 'electronics', ...)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"image\": \"galaxytab.jpg\",\n  \"name\": \"Tel 4 user1\",\n  \"price\": 100,\n  \"description\": \"Tablet 10 pulgadas en perfecto estado\",\n  \"sale\": \"true\",\n  \"tags\": \"work\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status response</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "requestedAt",
            "description": "<p>Request date/time</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Data response</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.advert",
            "description": "<p>Advert data created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "{\n   \"status\": \"success\",\n   \"requestedAt\": \"2020-09-10T10:55:52.067Z\",\n   \"advert\": {\n        \"sale\": true,\n        \"image\": \"/img/adverts/6038bba6e41a860519d142b5/1614336286863_galaxytab.jpg\",\n        \"tags\": [\n            \"work\"\n        ],\n        \"state\": \"Available\",\n        \"_id\": \"6038d11e7a90c90b105726d4\",\n        \"name\": \"Tel 4 user1\",\n        \"price\": 100,\n        \"description\": \"Tablet 10 pulgadas en perfecto estado\",\n        \"createdBy\": \"6038bba6e41a860519d142b5\",\n        \"createdAt\": \"2021-02-26T10:44:46.873Z\",\n        \"updatedAt\": \"2021-02-26T10:44:46.873Z\",\n        \"__v\": 0\n    }\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "{\n  \"status\": \"fail\",\n  \"code\": 422,\n  \"message\": \"Advert validation failed: name: An advert must have a name\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./controllers/doc/advert.doc.js",
    "groupTitle": "Adverts"
  },
  {
    "type": "put",
    "url": "/apiv1/adverts/:id",
    "title": "4. Update an advert (requires auth token)",
    "name": "PutAdvert",
    "group": "Adverts",
    "description": "<p>Update one advert by id param</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Format: &quot;Bearer <strong>user-token</strong>&quot;</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Querystring": [
          {
            "group": "Querystring",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Advert unique ID</p>"
          }
        ],
        "Body": [
          {
            "group": "Body",
            "type": "file",
            "optional": false,
            "field": "image",
            "description": "<p>Advert file image (jpg/png)</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Advert name</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Advert price</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Advert description</p>"
          },
          {
            "group": "Body",
            "type": "Boolean",
            "optional": false,
            "field": "sale",
            "description": "<p>Advert type (to sale:true, to buy: false)</p>"
          },
          {
            "group": "Body",
            "type": "String[]",
            "optional": false,
            "field": "tags",
            "description": "<p>Advert tags ('motor', 'fashion', 'electronics', ...)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"name\": \"Galaxy Tab 10.1\",\n  \"price\": 80,\n  \"tags\": \"['work','electronics']\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status response</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "requestedAt",
            "description": "<p>Request date/time</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Data response</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.advert",
            "description": "<p>Advert data updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "{\n  \"status\": \"success\",\n  \"requestedAt\": \"2020-09-10T10:55:52.067Z\",\n  \"advert\": {\n       \"sale\": true,\n       \"image\": \"/img/adverts/6038bba6e41a860519d142b5/1614336286863_galaxytab.jpg\",\n       \"tags\": [\n           \"work\",\n           \"electronics\"\n       ],\n       \"state\": \"Available\",\n       \"_id\": \"6038d11e7a90c90b105726d4\",\n       \"name\": \"Galaxy Tab 10.1\",\n       \"price\": 80,\n       \"description\": \"Tablet 10 pulgadas en perfecto estado\",\n       \"createdBy\": \"6038bba6e41a860519d142b5\",\n       \"createdAt\": \"2021-02-26T10:44:46.873Z\",\n       \"updatedAt\": \"2021-02-26T11:29:58.647Z\",\n       \"__v\": 0\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "{\n  \"status\": \"fail\",\n  \"code\": 422,\n  \"message\": \"Advert validation failed: name: An advert must have a name\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./controllers/doc/advert.doc.js",
    "groupTitle": "Adverts"
  },
  {
    "type": "post",
    "url": "/apiv1/users/auth",
    "title": "1. Authenticate",
    "name": "Authenticate",
    "group": "Users",
    "description": "<p>Authenticate user in API. Content in body, return token and user info</p>",
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "passwd",
            "description": "<p>User password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status response</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "requestedAt",
            "description": "<p>Request date/time</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Data response</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.tokenJWT",
            "description": "<p>Token</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.username",
            "description": "<p>Username</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.userEmail",
            "description": "<p>User email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data._id",
            "description": "<p>User ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "\nHTTP/1.1 200 OK\n   {\n      \"status\": \"success\",\n      \"requestedAt\": \"2021-03-16T17:52:40.409Z\",\n         \"data\": {\n            \"tokenJWT\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDQwZmY4MTlmYThlOTEwODJjYjM0MmMiLCJpYXQiOjE2MTU5MTcxNjAsImV4cCI6MTYxNjA4OTk2MH0.ozOQSwPic_W6H9aXUm_1wQvi0fftM8syuNjW4Hc99uk\",\n            \"username\": \"user1\",\n            \"userEmail\": \"user1@exampl.com\",\n            \"_id\": \"6040ff819fa8e91082cb342c\"\n         }\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"status\": \"fail\",\n  \"code\": 401,\n  \"message\": \"Invalid credentials!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./controllers/doc/user.doc.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/apiv1/users",
    "title": "2. Sign Up",
    "name": "SignUp",
    "group": "Users",
    "description": "<p>Signup user in API. Content in body, user has to confirm with the email received.</p>",
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "passwd",
            "description": "<p>User password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status response</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "requestedAt",
            "description": "<p>Request date/time</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Data response</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data.user",
            "description": "<p>User document</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "\nHTTP/1.1 200 OK\n   {\n      \"status\": \"success\",\n      \"requestedAt\": \"2021-03-16T17:52:40.409Z\",\n         \"data\": {\n            \"user\": {}\n         }\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 400 Bad request\n{\n  \"status\": \"fail\",\n  \"code\": 400,\n  \"message\": \"email or username already exits\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./controllers/doc/user.doc.js",
    "groupTitle": "Users"
  }
] });
