

export class BookingAPI {
  constructor(private request: any, private headers?: any) {}

  async createBooking(data: any) {
    return await this.request.post('/booking', { data });
  }

  async getBooking(id: number) {
    return await this.request.get(`/booking/${id}`);
  }

  async updateBooking(id: number, data: any) {
    return await this.request.put(`/booking/${id}`, {
      headers: this.headers,
      data
    });
  }

  async deleteBooking(id: number) {
    return await this.request.delete(`/booking/${id}`, {
      headers: this.headers
    });
  }
}