define({ "api": [
  {
    "type": "post",
    "url": "/apiv1/adverts/",
    "title": "3.Create an advert (requires auth token)",
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
        "Querystring": [
          {
            "group": "Querystring",
            "type": "String",
            "optional": false,
            "field": "lang",
            "description": "<p>Response language: default 'en' ['en', 'es']</p>"
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
    "filename": "./controllers/advertController.js",
    "groupTitle": "Adverts"
  },
  {
    "type": "put",
    "url": "/apiv1/adverts/:id",
    "title": "4.Update an advert (requires auth token)",
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
          },
          {
            "group": "Querystring",
            "type": "String",
            "optional": false,
            "field": "lang",
            "description": "<p>Response language: default 'en' ['en', 'es']</p>"
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
    "filename": "./controllers/advertController.js",
    "groupTitle": "Adverts"
  }
] });
