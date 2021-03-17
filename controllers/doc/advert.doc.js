/**
 * @api {get} /apiv1/adverts 1. List all adverts
 * @apiName GetAllAdverts
 * @apiGroup Adverts
 *
 * @apiDescription Get all the ads, and you can filter according to the arguments described
 *
 * @apiExample Example usage:
 * curl -i http://localhost/apiv1/adverts
 *
 * @apiExample Filter usage:
 * By name:
 * curl -i http://localhost/apiv1/adverts?name=ipho
 * By price:
 * curl -i http://localhost/apiv1/adverts?price=100-500
 * By sale (on sale:true or to buy:false):
 * curl -i http://localhost/apiv1/adverts?sale=false
 * By tag:
 * curl -i http://localhost/apiv1/adverts?tags=electronics,mobile
 * By username:
 * curl -i http://localhost/apiv1/adverts?username=user1
 * Sort by price:
 * curl -i http://localhost/apiv1/adverts?sort=price
 * Limit obtained fields:
 * curl -i http://localhost/apiv1/adverts?fields=name,price
 * Paginate:
 * curl -i http://localhost/apiv1/adverts?start=1&limit=4
 *
 * @apiSuccess {String} status Status response
 * @apiSuccess {Date} requestedAt Request date/time
 * @apiSuccess {Object} data Data response
 * @apiSuccess {Object[]} data.results Number of adverts
 * @apiSuccess {Object[]} data.adverts Adverts's list
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "status": "success",
 *      "requestedAt": "2020-09-10T10:55:52.067Z",
 *      "data": {
 *      "results": 8,
 *      "adverts": [
 *           {
 *               "sale": true,
 *               "tags": [
 *                   "lifestyle",
 *                   "motor"
 *               ],
 *               "_id": "5f59fc8f53bab60f7d995367",
 *               "name": "Bicicleta",
 *               "price": 230.15,
 *               "createdBy": {
 *                   "_id": "djde02334234920jwej",
 *                   "username": "user3",
 *                },
 *               "isFavBy": {},
 *               "state": "Available",
 *               "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
 *               "image": "/img/adverts/4234324343423/bici.jpg",
 *               "thumb": "/img/adverts/4234324343423/thumbnails/thumb_bici.jpg",
 *           }, ...
 *         ]
 *      }
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 404 Not Found
 *    {
 *      "status": "fail",
 *      "code": 404,
 *      "message": "Not Found"
 *    }
 */

/**
 * @api {get} /apiv1/adverts/:id 2. Find an advert
 * @apiName GetAdvert
 * @apiGroup Adverts
 *
 * @apiDescription Get one advert by id param
 *
 * @apiExample Example usage:
 * curl -i http://localhost/api/v1/adverts/5f59fc8f53bab60f7d995367
 *
 * @apiParam {id} id Advert id
 * @apiSuccess {String} status Status response
 * @apiSuccess {Date} requestedAt Request date/time
 * @apiSuccess {Object} data Data response
 * @apiSuccess {Object} data.advert Advert data
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "status": "success",
 *      "requestedAt": "2020-09-10T10:55:52.067Z",
 *      "results": 8,
 *      "data": {
 *          "advert": {
 *               "sale": true,
 *               "tags": [
 *                   "lifestyle",
 *                   "motor"
 *               ],
 *               "_id": "5f59fc8f53bab60f7d995367",
 *               "name": "Bicicleta",
 *               "price": 230.15,
 *               "createdBy": {
 *                   "_id": "djde02334234920jwej",
 *                   "username": "user3",
 *                },
 *               "isFavBy": {},
 *               "state": "Available",
 *               "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
 *               "image": "/img/adverts/4234324343423/bici.jpg",
 *               "thumb": "/img/adverts/4234324343423/thumbnails/thumb_bici.jpg",
 *           }
 *       }
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 404 Not Found
 *    {
 *      "status": "fail",
 *      "code": 404,
 *      "message": "Not Found"
 *    }
 */

/**
 * @api {post} /apiv1/adverts/ 3. Create an advert (requires auth token)
 * @apiName PostAdvert
 * @apiGroup Adverts
 * @apiDescription Create one advert, content in the body (form-data)
 *
 * @apiHeader (Header) {String} Authorization Format: "Bearer **user-token**"
 * @apiParam (Body) {file} image Advert file image (jpg/png)
 * @apiParam (Body) {String} name Advert name
 * @apiParam (Body) {Number} price Advert price
 * @apiParam (Body) {String} description Advert description
 * @apiParam (Body) {Boolean} sale Advert type (to sale:true, to buy: false)
 * @apiParam (Body) {String[]} tags Advert tags ('motor', 'fashion', 'electronics', ...)
 * @apiParamExample {json} Input
 *    {
 *      "image": "galaxytab.jpg",
 *      "name": "Tel 4 user1",
 *      "price": 100,
 *      "description": "Tablet 10 pulgadas en perfecto estado",
 *      "sale": "true",
 *      "tags": "work"
 *    }
 * @apiSuccess {String} status Status response
 * @apiSuccess {Date} requestedAt Request date/time
 * @apiSuccess {Object} data Data response
 * @apiSuccess {Object} data.advert Advert data created
 * @apiSuccessExample {json} Success
 *   {
 *      "status": "success",
 *      "requestedAt": "2020-09-10T10:55:52.067Z",
 *      "advert": {
 *           "sale": true,
 *           "image": "/img/adverts/6038bba6e41a860519d142b5/1614336286863_galaxytab.jpg",
 *           "tags": [
 *               "work"
 *           ],
 *           "state": "Available",
 *           "_id": "6038d11e7a90c90b105726d4",
 *           "name": "Tel 4 user1",
 *           "price": 100,
 *           "description": "Tablet 10 pulgadas en perfecto estado",
 *           "createdBy": "6038bba6e41a860519d142b5",
 *           "createdAt": "2021-02-26T10:44:46.873Z",
 *           "updatedAt": "2021-02-26T10:44:46.873Z",
 *           "__v": 0
 *       }
 *    }
 * @apiErrorExample {json} List error
 *    {
 *      "status": "fail",
 *      "code": 422,
 *      "message": "Advert validation failed: name: An advert must have a name"
 *    }
 */

/**
 * @api {put} /apiv1/adverts/:id 4. Update an advert (requires auth token)
 * @apiName PutAdvert
 * @apiGroup Adverts
 *
 * @apiDescription Update one advert by id param
 *
 * @apiHeader (Header) {String} Authorization Format: "Bearer **user-token**"
 * @apiParam (Querystring) {String} id Advert unique ID
 * @apiParam (Body) {file} image Advert file image (jpg/png)
 * @apiParam (Body) {String} name Advert name
 * @apiParam (Body) {Number} price Advert price
 * @apiParam (Body) {String} description Advert description
 * @apiParam (Body) {Boolean} sale Advert type (to sale:true, to buy: false)
 * @apiParam (Body) {String[]} tags Advert tags ('motor', 'fashion', 'electronics', ...)
 * @apiParamExample {json} Input
 *    {
 *      "name": "Galaxy Tab 10.1",
 *      "price": 80,
 *      "tags": "['work','electronics']"
 *    }
 * @apiSuccess {String} status Status response
 * @apiSuccess {Date} requestedAt Request date/time
 * @apiSuccess {Object} data Data response
 * @apiSuccess {Object} data.advert Advert data updated
 * @apiSuccessExample {json} Success
 *    {
 *      "status": "success",
 *      "requestedAt": "2020-09-10T10:55:52.067Z",
 *      "advert": {
 *           "sale": true,
 *           "image": "/img/adverts/6038bba6e41a860519d142b5/1614336286863_galaxytab.jpg",
 *           "tags": [
 *               "work",
 *               "electronics"
 *           ],
 *           "state": "Available",
 *           "_id": "6038d11e7a90c90b105726d4",
 *           "name": "Galaxy Tab 10.1",
 *           "price": 80,
 *           "description": "Tablet 10 pulgadas en perfecto estado",
 *           "createdBy": "6038bba6e41a860519d142b5",
 *           "createdAt": "2021-02-26T10:44:46.873Z",
 *           "updatedAt": "2021-02-26T11:29:58.647Z",
 *           "__v": 0
 *       }
 *    }
 * @apiErrorExample {json} List error
 *    {
 *      "status": "fail",
 *      "code": 422,
 *      "message": "Advert validation failed: name: An advert must have a name"
 *    }
 */

/**
 * @api {delete} /apiv1/adverts/:id 5. Delete an advert (requires auth token)
 * @apiName DeleteAdvert
 * @apiGroup Adverts
 *
 * @apiHeader (Header) {String} Authorization Format: "Bearer **user-token**"
 * @apiDescription Delete one advert by id param
 *
 * @apiParam {id} id Advert id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 No Content
 * @apiErrorExample {json} Error 404
 *    HTTP/1.1 404 Not Found
 *    {
 *      "status": "fail",
 *      "code": 404,
 *      "message": "Cast to ObjectId failed for value \"5f5a1e9e30fd0ba17c4110cbe\" at path \"_id\" for model \"Advert\""
 *    }
 * @apiErrorExample {json} Error 401
 *    HTTP/1.1 401 Not Found
 *    {
 *      "status": "fail",
 *      "code": 401,
 *      "message": "Unauthorized Request!!"
 *    }
 */

/**
 * @api {get} /apiv1/adverts/tags/ 6. Find all exist tags
 * @apiName GetAllTags
 * @apiGroup Adverts
 *
 * @apiDescription Get all exist tags in th DB
 *
 * @apiExample Example usage:
 * curl -i http://localhost/apiv1/adverts/tags
 *
 * @apiSuccess {String} status Status response
 * @apiSuccess {Date} requestedAt Request date/time
 * @apiSuccess {Object} data Data response
 * @apiSuccess {String[]} data.tags Adverts tags list in DB
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "status": "success",
 *      "requestedAt": "2020-09-10T10:55:52.067Z",
 *      "data": {
 *      "tags": [
 *           "electronics",
 *           "fashion",
 *           "work",
 *           "sports"
 *            ...
 *        ]
 *      }
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 404 Not Found
 *    {
 *      "status": "fail",
 *      "code": 404,
 *      "message": "Not Found"
 *    }
 */
