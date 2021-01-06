import { Request, Response, NextFunction } from 'express';
import { v4 } from 'uuid';
import EventModel from './event.model';
import EventService from './event.service';

class EventController {
    public eventModel = EventModel;
    public eventService = new EventService();

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const events = await this.eventModel.find().select({ name: 1, id: 1, point: 1, _id: 0 });
            res.json({ events });
        } catch(error) {
            next(error);
        }
    }

    public get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const event = await this.eventService.getEvent({ id });
            return res.json({ event });
        } catch (error) {
            next(error);
        }
    }

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { eventName } = req.body;
            const id = v4();
            await this.eventService.createEvent({ eventName, id });
            res.sendStatus(201);
        } catch (error) {
            next(error);
        }
    }

    public edit = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const { eventName } = req.body;
            await this.eventService.editEvent({ eventName, id });
            res.json({ message: 'Successful' });
        } catch (error) {
            next(error);
        }
    }

    public remove = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await this.eventService.deleteEvent({ id });
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }

    public vote = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.body;
            await this.eventService.voteEvent({ id });
            res.json({ message: 'successful' });
        } catch (error) {
            next(error);
        }
    }
}

export default EventController;
