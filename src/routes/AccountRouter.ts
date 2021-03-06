import { Router, Request, Response, NextFunction } from 'express';

import { User } from '../models/userModel'

class AccountRouter {
  router: Router

  /**
   * Initialize the AccountRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }
/**
 * @swagger
 * definitions:
 *   NewUser:
 *     type: object
 *     required:
 *       - username
 *       - password
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *   User:
 *     allOf:
 *       - $ref: '#/definitions/NewUser'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */
  /**
 * @swagger
 * tags:
 *   name: Account
 *   description: Account management and login
 */

  /**
  * @swagger
  * /accounts/login:
  *   post:
  *     description: Login to the application
  *     tags:
  *      - Account
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: email
  *         description: email to use for login.
  *         in: formData
  *         required: true
  *         type: string
  *       - name: password
  *         description: User's password.
  *         in: formData
  *         required: true
  *         type: string
  *     responses:
  *       200:
  *         description: login
  */
  public login(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
      var headers = {};
      // IE8 does not allow domains to be specified, just the *
      // headers["Access-Control-Allow-Origin"] = req.headers.origin;
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
      headers["Access-Control-Allow-Credentials"] = false;
      headers["Access-Control-Max-Age"] = '86400'; // 24 hours
      headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
      res.status(200).send(headers);
      return

    };
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({ email, password }, { password: 0 })

      .then(function (aUser: any) {


        if (!aUser) {
          return res.send({ status: false })
        }

        aUser.status = "true";

        res.send(aUser);
      }).catch(function (error: any) {
        res.sendStatus(400);
      })

  }


  /**
 * GET one hero by id
 */
  /**
     * @swagger
     * /:
     *   get:
     *     description: Returns the homepage
     *     responses:
     *       200:
     *         description: hello world
     */
  public signUp(req: Request, res: Response, next: NextFunction) {
    let query = parseInt(req.params.id);
    let email = req.body.email;
    let password = req.body.password;
    let hero = true //Heroes.find(hero => hero.id === query);
    if (!(email && password)) {
      return res.send({ status: false })
    }

    var newUser = new User({ email: email, password: password });

    newUser.save().then(function (aUser) {

      console.log("user created");
      res.status(200).send({ message: 'Success' });

    }).catch(function (err: any) {

      console.error(err);
      res.status(500)
        .send({
          message: 'error creating this user.'
        });
    });

  }

  public getProfile(req: Request, res: Response, next: NextFunction) {
    let query = parseInt(req.params.userId);
    let hero = true //Heroes.find(hero => hero.id === query);
    if (hero) {
      res.status(200)
        .send({
          avatar: 'Success',
          firstName: "Mohamed",
          lastName: "Habashy",
          email: "mohamed.habshey10@gmail.com",
          phone: "+201125184775"
        });
    }
    else {
      res.status(404)
        .send({
          message: 'Not found with the given id.',
          status: res.status
        });
    }
  }


  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.post('/login', this.login);
    this.router.post('/signUp', this.signUp);
  }

}

// Create the AccountRouter, and export its configured Express.Router
const accountRoutes = new AccountRouter();


export default accountRoutes.router;