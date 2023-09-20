export class Event{
    constructor(data){
        this.name = data.name 
        this.description = data.description 
        this.coverImg = data.coverImg
        this.location = data.location 
        this.capacity = data.capacity -= data.ticketCount
        this.startDate = new Date(data.startDate).toLocaleDateString()
        this.type = data.type 
        this.isCanceled = data.isCanceled
        this.creatorId = data.creatorId
        this.id = data.id
        this.createdAt = data.createdAt
        this.updatedAt = data.updatedAt
        this.creator = data.creator
        this.ticketCount = data.ticketCount
    }
}