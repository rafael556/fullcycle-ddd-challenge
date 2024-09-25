import EventDispatcher from "../../@shared/event/event-dispatcher";
import ConsoleLogWhenCustomerCreated1Handler from "./handler/consolelog-when-customer-created-1.handler";
import ConsoleLogWhenCustomerCreated2Handler from "./handler/consolelog-when-customer-created-2.handler";

describe('Customer Domain Events', () => {
    it('should send events when a Customer is created', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new ConsoleLogWhenCustomerCreated1Handler();
        const eventHandler2 = new ConsoleLogWhenCustomerCreated2Handler();

        
    })
})