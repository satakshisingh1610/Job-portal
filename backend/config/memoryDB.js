// Simple in-memory database for testing without MongoDB
class MemoryDB {
  constructor() {
    this.users = [];
    this.jobs = [];
    this.applications = [];
    this.companies = [];
    this.nextId = 1;
  }

  // User methods
  async createUser(userData) {
    const user = {
      _id: this.nextId++,
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.push(user);
    return user;
  }

  async findUserByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  async findUserById(id) {
    return this.users.find(user => user._id == id);
  }

  // Job methods
  async createJob(jobData) {
    const job = {
      _id: this.nextId++,
      ...jobData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.jobs.push(job);
    return job;
  }

  async findJobs(filter = {}) {
    return this.jobs;
  }

  // Application methods
  async createApplication(appData) {
    const application = {
      _id: this.nextId++,
      ...appData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.applications.push(application);
    return application;
  }
}

export default new MemoryDB();
