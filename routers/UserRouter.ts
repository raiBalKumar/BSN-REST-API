import { Router, Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserRouter {
    constructor(private userService: UserService) {

    }
    router(): Router {
        let router = Router();
        router.get('/profile', this.getProfile); //send profile info
        router.get('/dashboard', this.dashboard); //send dashboard info
        router.get('/teams', this.teamsList); //send all teams list
        router.get('/team/:id', this.teamDetails); //send team detail 
        router.get('/tournaments', this.tournamentsList); //send all tournaments list
        router.get('/tournament/:id', this.tournamentDetail); //send tournament details

        router.get('/', this.get)
        router.post('/', this.post);
        router.patch('/', this.patch);

        return router;
    }

    getProfile = (req: Request, res: Response) => {

    }
    dashboard = (req: Request, res: Response) => {
        if (req.user) {
            console.log("req.user ", req.user);
            if (req.user.status === "organizer") {
                

            } else if (req.user.status === "manager") {

            } else if (req.user.status === "player"){

            }
        } 
    }
    teamsList = (req: Request, res: Response) => {

    }
    teamDetails = (req: Request, res: Response) => {

    }
    tournamentsList = (req: Request, res: Response) => {

    }
    tournamentDetail = (req: Request, res: Response) => {

    }

    get = (req: Request, res: Response) => {
        // console.log(req.user)
        if (req.user) {
            return this.userService.getProfile(req.user.id)
                .then(data => res.json(data[0]))
                .catch(err => res.status(500).json(err));
        } else {
            return -1;
        }
    }

    post = (req: Request, res: Response) => {
        const body: Models.BasicUserInforamtion = req.body;

        return this.userService.createNewInformation(body)
            .then(data => res.json(data))
            .catch(err => res.status(500).json(err));
    }

    patch = (req: Request, res: Response) => {
        console.log(req.body);
        if (req.user) {
            return this.userService.editProfile(req.user.id, req.body)
                .then(data => res.json(data))
                .catch(err => res.status(500).json(err));
        } else {
            return -1;
        }
    }
}