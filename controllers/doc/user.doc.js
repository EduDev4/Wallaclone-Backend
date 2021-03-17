/**
 * @api {post} /apiv1/users/auth 1. Authenticate
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
 * @api {post} /apiv1/users 2. Sign Up
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
 *             "user": {}
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
