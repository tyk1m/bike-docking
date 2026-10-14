import { apiRequest } from './api';

export function getBikes() {
  return apiRequest('/bikes');
}

export function getStations() {
  return apiRequest('/stations');
}

export function getRentals() {
  return apiRequest('/rentals');
}

export function startRental(bikeId) {
  return apiRequest('/rentals', { method: 'POST', body: JSON.stringify({ bikeId }) });
}

export function returnRental(rentalId) {
  return apiRequest('/rentals/return', { method: 'POST', body: JSON.stringify({ rentalId }) });
}
