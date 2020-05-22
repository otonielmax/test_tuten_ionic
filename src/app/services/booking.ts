import { BookingClient } from './booking-client';
import { BookingLocation } from './booking-location';

export interface Booking {
    bookingId: number;    
    bookingTime: number;
    bookingPrice: number;    
    locationId: BookingLocation;
    tutenUserClient: BookingClient;
}
