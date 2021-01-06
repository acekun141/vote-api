import express from 'express';
import passport from 'passport';
import EventController from './event.controller';
import { Router } from '../_interface';
import { Post, Patch, Delete } from './event.dto';
import { validation } from '../_middleware';

class EventRouter implements Router {
    public router = express.Router();
    public path = '/event';
    public controller = new EventController();

    constructor() {
        this.initializeController();
    }

    private initializeController() {
        this.router.get(this.path, passport.authenticate('jwt'), this.controller.getAll);
        this.router.get(`${this.path}/:id`, passport.authenticate('jwt'), this.controller.get);
        this.router.post(
            this.path,
            validation(Post),
            passport.authenticate('jwt'),
            this.controller.create);
        this.router.patch(
            `${this.path}/:id`,
            validation(Patch),
            passport.authenticate('jwt'),
            this.controller.edit);
        this.router.delete(
            `${this.path}/:id`,
            passport.authenticate('jwt'),
            this.controller.remove);
        this.router.post(
            `${this.path}/vote`,
            validation(Delete),
            passport.authenticate('jwt'),
            this.controller.vote
        )
    }
};

export default EventRouter;
