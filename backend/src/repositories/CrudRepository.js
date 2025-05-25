// src/repositories/CrudRepository.js
class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return this.model.create(data);
  }

  async findById(id) {
    return this.model.findById(id);
  }

  async findAll(filter = {}, options = {}) {
    return this.model.find(filter, null, options);
  }

  async updateById(id, update, options = { new: true }) {
    return this.model.findByIdAndUpdate(id, update, options);
  }

  async deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }
}

module.exports = CrudRepository;
