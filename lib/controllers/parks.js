import { Router } from 'express';
import Park from '../models/Park';

export default Router()
  .post('/api/v1/parks', async (req, res) => {
    try {
      const park = await Park.insert(req.body);
      res.send(park);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/parks', async (req, res) => {
    try {
      const park = await Park.findAll();
      res.send(park);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('api/v1/parks/:id', async (req, res) => {
    try {
      const park = await Park.findById(req.params.id);
      res.send(park);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .put('/api/v1/parks/:id', async (req, res) => {
    try {
      const park = await Park.update(req.body, req.params.id);
      res.send(park);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .delete('/api/v1/parks/:id', async (req, res) => {
    try {
      const park = await Park.delete(req.params.id);
      res.send(park);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

