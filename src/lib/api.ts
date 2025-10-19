const API_URLS = {
  auth: 'https://functions.poehali.dev/5a7e1b65-9d84-4af4-8aef-46cce101118e',
  dogs: 'https://functions.poehali.dev/248f0c32-575c-4187-aeaa-0c0c3d3cfdb8',
  litters: 'https://functions.poehali.dev/3cea0987-159b-4db3-9208-d034b7e59043',
  gallery: 'https://functions.poehali.dev/cb543ec3-4f34-481e-be34-11aaa65fe68d',
  messages: 'https://functions.poehali.dev/a0a7c0b7-511a-4b3f-aded-f47d31418940'
};

export const api = {
  async login(username: string, password: string) {
    const response = await fetch(API_URLS.auth, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login', username, password })
    });
    return response.json();
  },

  async getDogs() {
    const response = await fetch(API_URLS.dogs);
    return response.json();
  },

  async createDog(data: any, userRole: string) {
    const response = await fetch(API_URLS.dogs, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Role': userRole
      },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  async updateDog(data: any, userRole: string) {
    const response = await fetch(API_URLS.dogs, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Role': userRole
      },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  async deleteDog(id: number, userRole: string) {
    const response = await fetch(`${API_URLS.dogs}?id=${id}`, {
      method: 'DELETE',
      headers: { 'X-User-Role': userRole }
    });
    return response.json();
  },

  async getLitters() {
    const response = await fetch(API_URLS.litters);
    return response.json();
  },

  async createLitter(data: any, userRole: string) {
    const response = await fetch(API_URLS.litters, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Role': userRole
      },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  async updateLitter(data: any, userRole: string) {
    const response = await fetch(API_URLS.litters, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Role': userRole
      },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  async deleteLitter(id: number, userRole: string) {
    const response = await fetch(`${API_URLS.litters}?id=${id}`, {
      method: 'DELETE',
      headers: { 'X-User-Role': userRole }
    });
    return response.json();
  },

  async getGallery() {
    const response = await fetch(API_URLS.gallery);
    return response.json();
  },

  async addPhoto(data: any, userRole: string) {
    const response = await fetch(API_URLS.gallery, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Role': userRole
      },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  async deletePhoto(id: number, userRole: string) {
    const response = await fetch(`${API_URLS.gallery}?id=${id}`, {
      method: 'DELETE',
      headers: { 'X-User-Role': userRole }
    });
    return response.json();
  },

  async sendMessage(data: any) {
    const response = await fetch(API_URLS.messages, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  async getMessages(userRole: string) {
    const response = await fetch(API_URLS.messages, {
      headers: { 'X-User-Role': userRole }
    });
    return response.json();
  }
};
