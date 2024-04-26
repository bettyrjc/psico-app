/**
 * @swagger
 * tags:
 *    name: Categories
 *    description: Operations about categories
 * /api/v1/categories:
 *   post:
 *     tags: [Categories]
 *     summary: create a category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *               available:
 *                 type: boolean
 *             example:
 *               name: terapia
 *               role: psicologo
 *               available: true
 *     responses:
 *       200:
 *         description: Successful categories creation
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     tags: [Categories]
 *     summary: list all categories
 *     responses:
 *       200:
 *         description: Successful request
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized - invalid token
 */
