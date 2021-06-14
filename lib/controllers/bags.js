import { Router } from 'express';
import Bag from '../models/Bag';

export default Router()
  .post('/api/v1/bags', async (req, res) => {
    try {
      const bag = await Bag.insert(req.body);
      res.send(bag);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/bags', async (req, res) => {
    try {
      const bag = await Bag.findAll();
      res.send(bag);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('api/v1/bags/:id', async (req, res) => {
    try {
      const bag = await Bag.findById(req.params.id);
      res.send(bag);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .put('/api/v1/bags/:id', async (req, res) => {
    try {
      const bag = await Bag.update(req.body, req.params.id);
      res.send(bag);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .delete('/api/v1/bags/:id', async (req, res) => {
    try {
      const bag = await Bag.delete(req.params.id);
      res.send(bag);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
