/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication operations
 * /api/v1/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login a user
 *     description: Login a user by email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *             example:
 *               email: user@example.com
 *               password: yourpassword
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT for the authenticated user.
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
*     tags: [Auth]
 *     summary: Register a user
 *     description: LoRegister a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name.
 *               email:
 *                 type: string
 *                 description: The user's email.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *             example:
 *               name: user
 *               email: user@example.com
 *               password: yourpassword
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT for the authenticated user.
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /validate-email/{token}:
 *   get:
 *     tags: [Auth]
 *     summary: Validate email address
 *     description: Validate a user's email address using a token.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: The validation token.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful validation
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized - invalid token
 */
