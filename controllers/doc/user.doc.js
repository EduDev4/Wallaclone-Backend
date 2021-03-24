/**
 * @api {post} /apiv1/users/auth 01. Authenticate
 * @apiName Authenticate
 * @apiGroup Users
 *
 * @apiDescription Authenticate user in API. Content in body, return token and user info
 *
 * @apiParam (body) {String} username Username
 * @apiParam (body) {String} passwd User password
 *
 * @apiSuccess {String} status Status response
 * @apiSuccess {Date} requestedAt Request date/time
 * @apiSuccess {Object} data Data response
 * @apiSuccess {String} data.tokenJWT Token
 * @apiSuccess {String} data.username Username
 * @apiSuccess {String} data.userEmail User email
 * @apiSuccess {String} data._id User ID
 * @apiSuccessExample {json} Success
 *
 * HTTP/1.1 200 OK
 *    {
 *       "status": "success",
 *       "requestedAt": "2021-03-16T17:52:40.409Z",
 *          "data": {
 *             "tokenJWT": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDQwZmY4MTlmYThlOTEwODJjYjM0MmMiLCJpYXQiOjE2MTU5MTcxNjAsImV4cCI6MTYxNjA4OTk2MH0.ozOQSwPic_W6H9aXUm_1wQvi0fftM8syuNjW4Hc99uk",
 *             "username": "user1",
 *             "userEmail": "user1@exampl.com",
 *             "_id": "6040ff819fa8e91082cb342c"
 *          }
 *    }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "status": "fail",
 *      "code": 401,
 *      "message": "Invalid credentials!"
 *    }
 */

/**
 * @api {post} /apiv1/users 02. Sign Up
 * @apiName SignUp
 * @apiGroup Users
 *
 * @apiDescription Signup user in API. Content in body, user has to confirm with the email received.
 *
 * @apiParam (body) {String} username Username
 * @apiParam (body) {String} email User email
 * @apiParam (body) {String} passwd User password
 *
 * @apiSuccess {String} status Status response
 * @apiSuccess {Date} requestedAt Request date/time
 * @apiSuccess {Object} data Data response
 * @apiSuccess {Object} data.user User document
 * @apiSuccessExample {json} Success
 *
 * HTTP/1.1 200 OK
 *    {
 *       "status": "success",
 *       "requestedAt": "2021-03-16T17:52:40.409Z",
 *          "data": {
 *             "user": { "userDocument" }
 *          }
 *    }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 400 Bad request
 *    {
 *      "status": "fail",
 *      "code": 400,
 *      "message": "email or username already exits"
 *    }
 */

/* GET /confirm/:token, User Signup Confirm */
/**
 * @api {get} /apiv1/users/confirm/:token 03. Sign Up Confirmation
 * @apiName SignUp Confirmation
 * @apiGroup Users
 *
 * @apiDescription Confirm new User. User receive an email with validation link, if comming from there the user is activated.
 *
 * @apiParam (queryString) {String} token Token from email
 *
 * @apiSuccess {String} status Status response
 * @apiSuccess {Date} requestedAt Request date/time
 * @apiSuccess {Object} data Data response
 * @apiSuccess {String} data.message Successful message
 * @apiSuccessExample {json} Success
 *
 * HTTP/1.1 200 OK
 *    {
 *       "status": "success",
 *       "requestedAt": "2021-03-16T17:52:40.409Z",
 *          "data": {
 *             "message":  "User email confirmed"
 *          }
 *    }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "status": "fail",
 *      "code": 401,
 *      "message": "The token provided is not valid!"
 *    }
 */

/**
 * PUT /forgotPass
 */
/**
 * @api {put} /apiv1/users/forgotPass 04. Forgot pass
 * @apiName ForgotPass
 * @apiGroup Users
 *
 * @apiDescription User forgot pass. Check user email, and send to it a reset.
 *
 * @apiParam (body) {String} email User email
 *
 * @apiSuccess {String} status Status response
 * @apiSuccess {Date} requestedAt Request date/time
 * @apiSuccess {Object} data Data response
 * @apiSuccess {String} data.message Message to check your email
 * @apiSuccessExample {json} Success
 *
 * HTTP/1.1 200 OK
 *    {
 *       "status": "success",
 *       "requestedAt": "2021-03-16T17:52:40.409Z",
 *          "data": {
 *             "message": "Please check your email in order to reset the password!"
 *          }
 *    }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 422 Unprocessable Entity
 *    {
 *      "status": "fail",
 *      "code": 422,
 *      "message": "User email doesn't exist!"
 *    }
 */

/**
 * POST /forgotPass/confirmation
 */
/**
 * @api {post} /apiv1/users/forgotPass/confirmation 05. Confirm pass change
 * @apiName ConfirmPassChange
 * @apiGroup Users
 *
 * @apiDescription User reset new pass.
 *
 * @apiParam (body) {String} passwd New password
 * @apiParam (body) {String} hash Hash generate in forgot pass
 *
 * @apiSuccess {String} status Status response
 * @apiSuccess {Date} requestedAt Request date/time
 * @apiSuccess {Object} data Data response
 * @apiSuccess {String} data.message Successful message password reset
 * @apiSuccessExample {json} Success
 *
 * HTTP/1.1 200 OK
 *    {
 *       "status": "success",
 *       "requestedAt": "2021-03-16T17:52:40.409Z",
 *          "data": {
 *             "message": "Password has been resseted"
 *          }
 *    }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 422 Unprocessable Entity
 *    {
 *      "status": "fail",
 *      "code": 422,
 *      "message": "Invalid hash!"
 *    }
 */

/**
 * DELETE /   (Delete user)
 */
/**
 * @api {delete} /apiv1/users 06. Delete the user (requires auth token)
 * @apiName DeleteUser
 * @apiGroup Users
 *
 * @apiDescription User delete from API. Delete user and all his adverts.
 *
 * @apiHeader (Header) {String} Authorization Format: "Bearer **user-token**"
 *
 * @apiSuccess {String} status Status response
 * @apiSuccess {Object} data Data response
 * @apiSuccessExample {json} Success
 *
 * HTTP/1.1 204 OK
 *    {
 *       "status": "success",
 *       "data": null
 *    }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 404 Not Found
 *    {
 *      "status": "fail",
 *      "code": 404,
 *      "message": "User not found!"
 *    }
 */

/**
 * PATCH /editUser/:username
 */
/**
 * @api {patch} /apiv1/users/editUser/:username 07. Update user data (requires auth token)
 * @apiName EditUser
 * @apiGroup Users
 *
 * @apiDescription User update his data
 *
 * @apiParam (body) {String} newUsername New user name
 * @apiParam (body) {String} newUserEmail New user email
 * @apiParam (body) {String} newPasswd New password
 * @apiParam (queryString) {String} username User current name
 *
 * @apiSuccess {String} status Status response
 * @apiSuccess {Date} requestedAt Request date/time
 * @apiSuccess {Object} data Data response
 * @apiSuccess {String} data.username New User name
 * @apiSuccess {String} data.userEmail New User email
 * @apiSuccessExample {json} Success
 *
 * HTTP/1.1 200 OK
 *    {
 *       "status": "success",
 *       "requestedAt": "2021-03-16T17:52:40.409Z",
 *          "data": {
 *             "username": "Thor",
 *             "userEmail": "thormod@new.com"
 *          }
 *    }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 422 Unprocessable Entity
 *    {
 *      "status": "fail",
 *      "code": 422,
 *      "message": "This email is already in use"
 *    }
 */

/**
 * POST /favs/:adId   (Set or Unset favorite)
 */
/**
 * @api {post} /apiv1/users/favs/:adId 08. Set or Unset advert favorite (requires auth token)
 * @apiName SetUnsetFav
 * @apiGroup Users
 *
 * @apiDescription User set or unset fav on advert
 *
 * @apiParam (queryString) {String} adId Advert id
 *
 * @apiSuccess {String} status Status response
 * @apiSuccess {Date} requestedAt Request date/time
 * @apiSuccess {Object} data Data response
 * @apiSuccess {Object} data.advert Advert with fav modified
 * @apiSuccess {Object} data.message Result message
 * @apiSuccessExample {json} Success
 *
 * HTTP/1.1 200 OK
 *    {
 *       "status": "success",
 *       "requestedAt": "2021-03-16T17:52:40.409Z",
 *          "data": {
 *             "advert": {...},
 *             "message": "Fav created!"
 *          }
 *    }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 404 Not Found
 *    {
 *      "status": "fail",
 *      "code": 404,
 *      "message": "Not found"
 *    }
 */

/**
 * GET /favs   (Get all user favorites)
 */
/**
 * @api {get} /apiv1/users/favs 09. List adverts favorites from user (requires auth token)
 * @apiName GetUserFavs
 * @apiGroup Users
 *
 * @apiDescription Get all favorite ads from user
 *
 * @apiSuccess {String} status Status response
 * @apiSuccess {Date} requestedAt Request date/time
 * @apiSuccess {Object} data Data response
 * @apiSuccess {Number} data.results Number of favorite adverts
 * @apiSuccess {Object[]} data.adverts Adverts's list
 * @apiSuccessExample {json} Success
 *
 * HTTP/1.1 200 OK
 *    {
 *       "status": "success",
 *       "requestedAt": "2021-03-16T17:52:40.409Z",
 *          "data": {
 *             "results": 4,
 *             "adverts": [{...}, ...]
 *          }
 *    }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 404 Not Found
 *    {
 *      "status": "fail",
 *      "code": 404,
 *      "message": "Not found"
 *    }
 */

/**
 * POST /reservation/:adId  (Set or Unset advert reserved)
 */
/**
 * @api {post} /apiv1/users/reservation/:adId 10. Set or Unset advert reserved (requires auth token)
 * @apiName SetUnsetReserved
 * @apiGroup Users
 *
 * @apiDescription User set or unset advert reserved
 *
 * @apiParam (queryString) {String} adId Advert id
 *
 * @apiSuccess {String} status Status response
 * @apiSuccess {Date} requestedAt Request date/time
 * @apiSuccess {Object} data Data response
 * @apiSuccess {String} data.adStatus New advert state
 * @apiSuccess {String} data.message Result message
 * @apiSuccessExample {json} Success
 *
 * HTTP/1.1 200 OK
 *    {
 *       "status": "success",
 *       "requestedAt": "2021-03-16T17:52:40.409Z",
 *          "data": {
 *             "adStatus": "Reserved",
 *             "message": "Advert reserved!"
 *          }
 *    }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "status": "fail",
 *      "code": 401,
 *      "message": "Unauthorized Request!!"
 *    }
 */

/**
 * GET /reserved   (Get all user reserved ones)
 */

/**
 * @api {get} /apiv1/users/reserved 11. List adverts reserved from user (requires auth token)
 * @apiName GetUserReserved
 * @apiGroup Users
 *
 * @apiDescription Get all reserved ads from user
 *
 * @apiSuccess {String} status Status response
 * @apiSuccess {Date} requestedAt Request date/time
 * @apiSuccess {Object} data Data response
 * @apiSuccess {Number} data.results Number of reserved adverts
 * @apiSuccess {Object[]} data.adverts Adverts's list
 * @apiSuccessExample {json} Success
 *
 * HTTP/1.1 200 OK
 *    {
 *       "status": "success",
 *       "requestedAt": "2021-03-16T17:52:40.409Z",
 *          "data": {
 *             "results": 2,
 *             "adverts": [{...}, ...]
 *          }
 *    }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 404 Not Found
 *    {
 *      "status": "fail",
 *      "code": 404,
 *      "message": "Not found"
 *    }
 */

/**
 * POST /sold/:adId  (Set or Unset advert sold)
 */
/**
 * @api {post} /apiv1/users/sold/:adId 12. Set or Unset advert sold (requires auth token)
 * @apiName SetUnsetSold
 * @apiGroup Users
 *
 * @apiDescription User set or unset advert sold
 *
 * @apiParam (queryString) {String} adId Advert id
 *
 * @apiSuccess {String} status Status response
 * @apiSuccess {Date} requestedAt Request date/time
 * @apiSuccess {Object} data Data response
 * @apiSuccess {String} data.adStatus New advert state
 * @apiSuccess {String} data.message Result message
 * @apiSuccessExample {json} Success
 *
 * HTTP/1.1 200 OK
 *    {
 *       "status": "success",
 *       "requestedAt": "2021-03-16T17:52:40.409Z",
 *          "data": {
 *             "adStatus": "Sold",
 *             "message": "Advert sold!"
 *          }
 *    }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 404 Not Found
 *    {
 *      "status": "fail",
 *      "code": 404,
 *      "message": "Advert not found!"
 *    }
 */

/**
 * GET /sold   (Get all user reserved ones)
 */

/**
 * @api {get} /apiv1/users/sold 13. List adverts sold from user (requires auth token)
 * @apiName GetUserSold
 * @apiGroup Users
 *
 * @apiDescription Get all sold ads from user
 *
 * @apiSuccess {String} status Status response
 * @apiSuccess {Date} requestedAt Request date/time
 * @apiSuccess {Object} data Data response
 * @apiSuccess {Number} data.results Number of sold adverts
 * @apiSuccess {Object[]} data.adverts Adverts's list
 * @apiSuccessExample {json} Success
 *
 * HTTP/1.1 200 OK
 *    {
 *       "status": "success",
 *       "requestedAt": "2021-03-16T17:52:40.409Z",
 *          "data": {
 *             "results": 3,
 *             "adverts": [{...}, ...]
 *          }
 *    }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 404 Not Found
 *    {
 *      "status": "fail",
 *      "code": 404,
 *      "message": "Not found"
 *    }
 */

/**
 * GET /:id (Get username from userId)
 */
/**
 * @api {get} /apiv1/users/:id 14. Get username from user ID (requires auth token)
 * @apiName GetUserNameFromId
 * @apiGroup Users
 *
 * @apiDescription Get username from user id param
 *
 * @apiParam (queryString) {String} id User id
 *
 * @apiSuccess {String} status Status response
 * @apiSuccess {Date} requestedAt Request date/time
 * @apiSuccess {Object} data Data response
 * @apiSuccess {String} data.username User name
 * @apiSuccessExample {json} Success
 *
 * HTTP/1.1 200 OK
 *    {
 *       "status": "success",
 *       "requestedAt": "2021-03-16T17:52:40.409Z",
 *          "data": {
 *             "username": "thor"
 *          }
 *    }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 404 Not Found
 *    {
 *      "status": "fail",
 *      "code": 404,
 *      "message": "Not found"
 *    }
 */
