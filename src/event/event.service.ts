import EventModel from './event.model';

interface IPayload {
    eventName: string;
    id: string;
}

class EventService {
    public eventModel = EventModel;

    public getEvent = async (payload: Pick<IPayload, 'id'>) => {
        const event = await this.eventModel.findOne({ id: payload.id }).select({
            name: 1,
            id: 1,
            point: 1,
            _id: 0
        });
        return event;
    }

    public createEvent = async (payload: IPayload) => {
        await this.eventModel.create({ name: payload.eventName, id: payload.id });
        return true;
    }

    public editEvent = async (payload: IPayload) => {
        const event = await this.eventModel.updateOne({ id: payload.id }, { name: payload.eventName });
        return true;
    }

    public deleteEvent = async (payload: Pick<IPayload, 'id'>) => {
        const eventDeleted = await this.eventModel.deleteOne({ id: payload.id });
        return eventDeleted;
    }

    public voteEvent = async (payload: Pick<IPayload, 'id'>) => {
        await this.eventModel.findOneAndUpdate({ id: payload.id }, {$inc : { point: 1 }});
        return true;
    }
}

export default EventService;
