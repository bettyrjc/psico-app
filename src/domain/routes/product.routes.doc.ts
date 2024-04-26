/**
 * @swagger
 * tags:
 *    name: Products
 *    description: Operations about products
 * /api/v1/products:
 *   post:
 *     tags: [Products]
 *     summary: create a product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *              name: terapia
 *              price: 100
 *              category: 60f4b3b3b3b3b3b3b3b3b3b3
 *              description: terapia de casual
 *     responses:
 *       200:
 *         description: Successful creation
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger

 * /api/v1/products/:id:
 *   put:
 *     tags: [Products]
 *     summary: update a product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *              name: terapia
 *              price: 100
 *              category: 60f4b3b3b3b3b3b3b3b3b3b3
 *              description: terapia de casual
 *     responses:
 *       200:
 *         description: Successful update
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     tags: [Products]
 *     summary: list all products
 *     responses:
 *       200:
 *         description: Successful request
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized - invalid token
 */

/**
 * @swagger
 * /api/v1/products/:id:
 *   get:
 *     tags: [Products]
 *     summary: list a product
 *     responses:
 *       200:
 *         description: Successful request
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized - invalid token
 */